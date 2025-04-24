"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  Stars,
  OrbitControls,
  PerspectiveCamera,
  Billboard,
  Text,
  Html,
} from "@react-three/drei";
import * as THREE from "three";

// SVG asset path
const williamSVGPath = "/william.svg";

// Microsoft certification data
const certifications = [
  {
    title: "Azure Data Scientist Associate",
    date: "December 2023",
    description: "Developing Microsoft Azure Data Solutions",
    color: "#2196f3",
    size: 4,
    position: [0, 0, 0],
    rotation: 0.005,
    asteroids: 20,
    asteroidColor: "#64b5f6",
    beltRadius: 8,
    beltWidth: 3
  },
  {
    title: "Azure AI Engineer Associate",
    date: "November 2023",
    description: "Developing Microsoft Azure AI Solutions",
    color: "#9c27b0",
    size: 3.2,
    position: [-15, 0, -12],
    rotation: 0.007,
    asteroids: 16,
    asteroidColor: "#ce93d8",
    beltRadius: 6,
    beltWidth: 2.5
  },
  {
    title: "Azure Administrator Associate",
    date: "March 2024",
    description: "Developing Microsoft Azure Data Solutions",
    color: "#ff5722",
    size: 3.5,
    position: [18, 0, 5],
    rotation: 0.004,
    asteroids: 18,
    asteroidColor: "#ff8a65",
    beltRadius: 7,
    beltWidth: 2.8
  },
  {
    title: "Azure Developer Associate",
    date: "March 2022",
    description: "Developing Microsoft Azure Solutions",
    color: "#4caf50",
    size: 3,
    position: [10, 0, -18],
    rotation: 0.006,
    asteroids: 15,
    asteroidColor: "#81c784",
    beltRadius: 5.5,
    beltWidth: 2.2
  },
  {
    title: "Azure AI Fundamentals",
    date: "September 2023",
    description: "Azure AI Fundamentals",
    color: "#ffc107",
    size: 2.5,
    position: [-12, 0, 15],
    rotation: 0.008,
    asteroids: 12,
    asteroidColor: "#ffd54f",
    beltRadius: 5,
    beltWidth: 2
  }
];

// EtchedSVG Component
const EtchedSVG = () => {
  const texture = useLoader(THREE.TextureLoader, williamSVGPath);

  const aspect = useMemo(() => {
    if (texture && texture.image) {
      return texture.image.width / texture.image.height;
    }
    return 1;
  }, [texture]);

  const planeHeight = 40;
  const planeWidth = planeHeight * aspect;

  return (
    <mesh position={[-35, -5, -35]}>
      <planeGeometry args={[planeWidth, planeHeight]} />
      <meshBasicMaterial map={texture} transparent opacity={0.4} />
    </mesh>
  );
};

// Asteroid Component
const Asteroid = ({ parentRef, parentSize, beltRadius, beltWidth, color, index, total }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  // Create unique asteroid geometry
  const [geometry] = useState(() => {
    // Create random asteroid shape using icosahedron
    const geo = new THREE.IcosahedronGeometry(
      0.2 + Math.random() * 0.3, // Random size between 0.2 and 0.5
      0
    );
    
    // Distort vertices for irregular shape
    const positions = geo.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const z = positions.getZ(i);
      
      // Random displacement
      positions.setX(i, x * (0.8 + Math.random() * 0.4));
      positions.setY(i, y * (0.8 + Math.random() * 0.4));
      positions.setZ(i, z * (0.8 + Math.random() * 0.4));
    }
    
    return geo;
  });
  
  // Distribute asteroids in the belt with different speeds
  const speed = 0.1 + Math.random() * 0.2; // Random speed
  const offset = index * (2 * Math.PI / total); // Distribute around circle
  const radiusVariation = Math.random() * beltWidth - beltWidth/2; // Random variation within belt width
  
  // Slightly tilt the orbit for visual interest
  const tiltX = Math.random() * 0.3;
  const tiltZ = Math.random() * 0.3;
  
  // Rotation speed for asteroid itself
  const rotSpeed = {
    x: Math.random() * 0.05,
    y: Math.random() * 0.05,
    z: Math.random() * 0.05
  };
  
  useFrame(() => {
    if (parentRef.current) {
      const time = Date.now() * 0.001;
      
      // Position in elliptical orbit with tilt
      const angle = offset + time * speed;
      const radius = beltRadius + radiusVariation;
      
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      
      // Apply tilt to the orbit
      const tiltedX = x;
      const tiltedY = x * tiltX + z * tiltZ;
      const tiltedZ = z;
      
      // Set position relative to parent planet
      meshRef.current.position.x = parentRef.current.position.x + tiltedX;
      meshRef.current.position.y = parentRef.current.position.y + tiltedY;
      meshRef.current.position.z = parentRef.current.position.z + tiltedZ;
      
      // Rotate asteroid on its own axes
      meshRef.current.rotation.x += rotSpeed.x;
      meshRef.current.rotation.y += rotSpeed.y;
      meshRef.current.rotation.z += rotSpeed.z;
    }
  });

  // Create slightly varied color for each asteroid
  const asteroidColor = useMemo(() => {
    const baseColor = new THREE.Color(color);
    return baseColor.offsetHSL(0, 0, (Math.random() - 0.5) * 0.3);
  }, [color]);

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial 
        color={asteroidColor} 
        roughness={0.9} 
        metalness={0.2} 
      />
    </mesh>
  );
};

// AsteroidBelt Component to manage all asteroids for a certification
const AsteroidBelt = ({ parentRef, parentSize, count, radius, width, color }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Asteroid 
          key={index}
          parentRef={parentRef}
          parentSize={parentSize}
          beltRadius={radius}
          beltWidth={width}
          color={color}
          index={index}
          total={count}
        />
      ))}
    </>
  );
};

// Certification Planet Component
const CertificationPlanet = ({
  position,
  size,
  color,
  speed,
  title,
  date,
  description,
  asteroids,
  asteroidColor,
  beltRadius,
  beltWidth
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const [certificateVisible, setCertificateVisible] = useState(false);

  // Create Microsoft logo texture
  const msLogoTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    
    // Draw Microsoft logo
    if (ctx) {
      // Background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 128, 128);
      
      // Red square
      ctx.fillStyle = '#f25022';
      ctx.fillRect(30, 30, 30, 30);
      
      // Green square
      ctx.fillStyle = '#7fba00';
      ctx.fillRect(68, 30, 30, 30);
      
      // Blue square
      ctx.fillStyle = '#00a4ef';
      ctx.fillRect(30, 68, 30, 30);
      
      // Yellow square
      ctx.fillStyle = '#ffb900';
      ctx.fillRect(68, 68, 30, 30);
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  useFrame(() => {
    // Rotate on its own axis
    meshRef.current.rotation.y += speed;
    
    // Optional orbital movement
    const time = Date.now() * 0.001;
    meshRef.current.position.x = position[0] + Math.sin(time * speed * 0.2) * 2;
    meshRef.current.position.z = position[2] + Math.cos(time * speed * 0.2) * 2;
  });

  return (
    <>
      <mesh 
        ref={meshRef} 
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setCertificateVisible(!certificateVisible)}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          map={msLogoTexture}
          color={color}
          roughness={0.5}
          metalness={0.7}
          emissive={hovered ? color : "#000000"}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
        
        {/* Certificate visualization on click */}
        {certificateVisible && (
          <Html position={[0, size + 2, 0]} center>
            <div style={{
              backgroundColor: 'rgba(0,0,0,0.85)',
              color: 'white',
              padding: '20px',
              borderRadius: '10px',
              width: '300px',
              textAlign: 'center',
              fontFamily: 'Arial',
              border: `2px solid ${color}`,
              boxShadow: `0 0 20px ${color}`
            }}>
              <div style={{ 
                backgroundColor: '#ffffff', 
                padding: '15px', 
                borderRadius: '8px',
                marginBottom: '15px'
              }}>
                <svg width="80" height="80" viewBox="0 0 100 100">
                  <rect x="10" y="10" width="35" height="35" fill="#f25022" />
                  <rect x="55" y="10" width="35" height="35" fill="#7fba00" />
                  <rect x="10" y="55" width="35" height="35" fill="#00a4ef" />
                  <rect x="55" y="55" width="35" height="35" fill="#ffb900" />
                </svg>
              </div>
              <h2 style={{ 
                margin: '0 0 5px 0',
                color: color,
                fontWeight: 'bold'
              }}>
                Microsoft Certified
              </h2>
              <h3 style={{ 
                margin: '0 0 15px 0',
                color: '#ffffff'
              }}>
                {title}
              </h3>
              <p style={{ 
                fontSize: '14px',
                margin: '5px 0',
                color: '#bbbbbb'
              }}>
                {description}
              </p>
              <p style={{ 
                fontSize: '12px',
                marginTop: '15px',
                fontStyle: 'italic',
                color: '#999999'
              }}>
                Achieved: {date}
              </p>
              <button 
                style={{
                  backgroundColor: color,
                  color: 'white',
                  border: 'none',
                  padding: '8px 15px',
                  marginTop: '15px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
                onClick={() => setCertificateVisible(false)}
              >
                Close
              </button>
            </div>
          </Html>
        )}
      </mesh>
      
      {/* Planet label */}
      <Billboard position={[position[0], position[1] + size + 0.8, position[2]]}>
        <Text
          color="white"
          anchorX="center"
          anchorY="middle"
          fontSize={0.7}
          outlineWidth={0.05}
          outlineColor="black"
        >
          {title}
        </Text>
      </Billboard>
      
      {/* Asteroid belt */}
      <AsteroidBelt 
        parentRef={meshRef}
        parentSize={size}
        count={asteroids}
        radius={beltRadius}
        width={beltWidth}
        color={asteroidColor}
      />
    </>
  );
};

// SpaceDust Component
const SpaceDust = () => {
  const particles = useRef<THREE.Points>(null!);
  const count = 3000;

  const [positions, colors] = useMemo(() => {
    const posArray = new Float32Array(count * 3);
    const colorArray = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const distance = Math.random() * 60 + 15;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      posArray[i * 3] = distance * Math.sin(phi) * Math.cos(theta);
      posArray[i * 3 + 1] = distance * Math.sin(phi) * Math.sin(theta);
      posArray[i * 3 + 2] = distance * Math.cos(phi);

      // Create bluish-white space dust
      const r = 0.5 + Math.random() * 0.5;
      const g = 0.5 + Math.random() * 0.5;
      const b = 0.7 + Math.random() * 0.3;
      
      colorArray[i * 3] = r;
      colorArray[i * 3 + 1] = g;
      colorArray[i * 3 + 2] = b;
    }
    return [posArray, colorArray];
  }, [count]);

  useFrame(() => {
    particles.current.rotation.y += 0.0003;
  });

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.15} 
        vertexColors 
        transparent 
        opacity={0.8} 
        sizeAttenuation
      />
    </points>
  );
};

// InfoPanel Component
const InfoPanel = () => {
  return (
    <Html position={[-20, 12, 0]} transform>
      <div style={{
        backgroundColor: 'rgba(0,0,0,0.7)',
        color: 'white',
        padding: '15px',
        borderRadius: '10px',
        width: '300px',
        border: '1px solid #336699'
      }}>
        <h2 style={{ margin: '0 0 10px 0', color: '#4fc3f7' }}>William's Certification Universe</h2>
        <p style={{ fontSize: '14px', margin: '5px 0' }}>
          Each planet represents a Microsoft certification, surrounded by asteroid belts instead
          of moons. Click on any certification planet to view details.
        </p>
        <p style={{ fontSize: '12px', fontStyle: 'italic', marginTop: '10px' }}>
          Interact with the scene: Drag to rotate, scroll to zoom
        </p>
      </div>
    </Html>
  );
};

// Central Microsoft Logo
const MicrosoftLogo = () => {
  const groupRef = useRef<THREE.Group>(null!);
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });
  
  return (
    <group ref={groupRef} position={[0, 15, 0]}>
      <Billboard>
        <mesh position={[-1.75, 0, 0]}>
          <boxGeometry args={[1.5, 1.5, 0.2]} />
          <meshStandardMaterial color="#f25022" emissive="#f25022" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0.25, 0, 0]}>
          <boxGeometry args={[1.5, 1.5, 0.2]} />
          <meshStandardMaterial color="#7fba00" emissive="#7fba00" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[-1.75, -2, 0]}>
          <boxGeometry args={[1.5, 1.5, 0.2]} />
          <meshStandardMaterial color="#00a4ef" emissive="#00a4ef" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0.25, -2, 0]}>
          <boxGeometry args={[1.5, 1.5, 0.2]} />
          <meshStandardMaterial color="#ffb900" emissive="#ffb900" emissiveIntensity={0.5} />
        </mesh>
      </Billboard>
      <Billboard position={[0, -4, 0]}>
        <Text
          color="white"
          anchorX="center"
          anchorY="middle"
          fontSize={1.2}
          outlineWidth={0.05}
          outlineColor="black"
        >
          MICROSOFT CERTIFIED
        </Text>
      </Billboard>
      <Billboard position={[0, -5.5, 0]}>
        <Text
          color="#4fc3f7"
          anchorX="center"
          anchorY="middle"
          fontSize={0.8}
          outlineWidth={0.05}
          outlineColor="black"
        >
          WILLIAM MABOTJA
        </Text>
      </Billboard>
    </group>
  );
};

// Main CertificationsUniverse Component
const CertificationsUniverse = () => {
  return (
    <Canvas style={{ height: "100vh", width: "100vw", background: "black" }}>
      {/* Etched SVG */}
      <EtchedSVG />
      
      {/* Camera setup */}
      <PerspectiveCamera makeDefault position={[0, 10, 30]} />
      
      {/* Basic lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 20, 10]} intensity={0.8} />
      
      {/* Microsoft logo with lighting */}
      <pointLight position={[0, 15, 5]} color="#ffffff" intensity={1} distance={20} />
      <MicrosoftLogo />
      
      {/* Camera controls */}
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={10}
        maxDistance={100}
      />
      
      {/* Background stars */}
      <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade />
      
      {/* Certification planets with asteroid belts */}
      {certifications.map((cert, index) => (
        <CertificationPlanet
          key={index}
          position={cert.position}
          size={cert.size}
          color={cert.color}
          speed={cert.rotation}
          title={cert.title}
          date={cert.date}
          description={cert.description}
          asteroids={cert.asteroids}
          asteroidColor={cert.asteroidColor}
          beltRadius={cert.beltRadius}
          beltWidth={cert.beltWidth}
        />
      ))}
      
      {/* Space dust particles */}
      <SpaceDust />
      
      {/* Info Panel */}
      <InfoPanel />
    </Canvas>
  );
};

export default CertificationsUniverse;