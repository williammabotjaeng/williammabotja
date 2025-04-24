"use client";

import React, { useRef, useMemo } from "react";
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
import { EarthHomeButton } from "@/components/EarthHomeButton";

// SVG asset path
const williamSVGPath = "/william.svg";

// Achievement data
const achievements = [
  {
    title: "SoloLearn Champion",
    description: "Ranked #7 All-time in South Africa, Top 350 Globally",
    color: "#4caf50",
    size: 3.5,
    position: [-5, 0, 5] as [number, number, number],
    rotation: 0.005,
    moons: [
      { size: 0.4, distance: 5, speed: 0.02, color: "#a5d6a7" },
      { size: 0.3, distance: 4, speed: 0.03, color: "#81c784" }
    ]
  },
  {
    title: "Microsoft Certified",
    description: "5 Azure Certifications Including Data Scientist Associate",
    color: "#2196f3",
    size: 2.8,
    position: [8, 0, -7] as [number, number, number],
    rotation: 0.007,
    moons: [
      { size: 0.5, distance: 4, speed: 0.025, color: "#90caf9" },
      { size: 0.4, distance: 5, speed: 0.015, color: "#64b5f6" },
      { size: 0.3, distance: 6, speed: 0.03, color: "#42a5f5" },
      { size: 0.2, distance: 3.5, speed: 0.04, color: "#2196f3" },
      { size: 0.15, distance: 3, speed: 0.05, color: "#1e88e5" }
    ]
  },
  {
    title: "Hackathon Winner",
    description: "Devpost Hackathon - ClickUp API Integration",
    color: "#ff9800",
    size: 2.5,
    position: [-10, 0, -12] as [number, number, number],
    rotation: 0.006,
    moons: [
      { size: 0.3, distance: 4, speed: 0.04, color: "#ffcc80" }
    ]
  },
  {
    title: "WPWiredIn",
    description: "Published WordPress Plugin",
    color: "#9c27b0",
    size: 2,
    position: [12, 0, 10] as [number, number, number],
    rotation: 0.008,
    moons: [
      { size: 0.4, distance: 3, speed: 0.03, color: "#ce93d8" },
      { size: 0.2, distance: 4, speed: 0.05, color: "#ba68c8" }
    ]
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

// Moon Component
const Moon = ({ parentRef, size, distance, speed, color, offset = 0 }: {
  parentRef: React.RefObject<THREE.Mesh>;
  size: number;
  distance: number;
  speed: number;
  color: string;
  offset?: number;
}) => {
  const moonRef = useRef<THREE.Mesh>(null!);
  
  useFrame(() => {
    if (parentRef.current) {
      const time = Date.now() * 0.001 + offset;
      
      // Calculate position relative to the parent planet
      const x = Math.sin(time * speed) * distance;
      const z = Math.cos(time * speed) * distance;
      
      // Apply planet's position
      moonRef.current.position.x = parentRef.current.position.x + x;
      moonRef.current.position.y = parentRef.current.position.y;
      moonRef.current.position.z = parentRef.current.position.z + z;
      
      // Rotate moon
      moonRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={moonRef}>
      <sphereGeometry args={[size, 24, 24]} />
      <meshStandardMaterial color={color} roughness={0.8} metalness={0.2} />
    </mesh>
  );
};

// Planet Component with Moons
const Planet = ({
  position,
  size,
  color,
  speed,
  moons = [],
  label,
  description
}: {
  position: [number, number, number];
  size: number;
  color: string;
  speed: number;
  moons: Array<{ size: number; distance: number; speed: number; color: string }>;
  label: string;
  description: string;
}) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = React.useState(false);

  useFrame(() => {
    // Rotate on its own axis
    mesh.current.rotation.y += speed;
    
    // Optional orbital movement
    const time = Date.now() * 0.001;
    mesh.current.position.x = position[0] + Math.sin(time * speed * 0.2) * 2;
    mesh.current.position.z = position[2] + Math.cos(time * speed * 0.2) * 2;
  });

  return (
    <>
      <mesh 
        ref={mesh} 
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.5}
          metalness={0.5}
          emissive={hovered ? color : "#000000"}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
        
        {/* Planet ring for visual effect */}
        {size > 2.5 && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[size * 1.3, size * 1.6, 64]} />
            <meshBasicMaterial 
              color={color} 
              opacity={0.3} 
              transparent 
              side={THREE.DoubleSide} 
            />
          </mesh>
        )}
        
        {/* Rendering info panel when planet is hovered */}
        {hovered && (
          <Html position={[0, size + 2, 0]} center>
            <div style={{
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: 'white',
              padding: '10px',
              borderRadius: '5px',
              width: '200px',
              textAlign: 'center',
              fontFamily: 'Arial',
              border: `1px solid ${color}`
            }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>
                {label}
              </div>
              <div style={{ fontSize: '12px' }}>
                {description}
              </div>
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
          {label}
        </Text>
      </Billboard>
      
      {/* Render moons */}
      {moons.map((moon: any, index: number) => (
        <Moon
          key={index}
          parentRef={mesh}
          size={moon.size}
          distance={moon.distance}
          speed={moon.speed}
          color={moon.color}
          offset={index * Math.PI / moons.length} // Offset to distribute moons
        />
      ))}
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

// Central Sun Component
const CentralSun = () => {
  const sunRef = useRef<THREE.Mesh>(null!);
  
  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002;
      sunRef.current.rotation.z += 0.001;
    }
  });
  
  return (
    <mesh ref={sunRef} position={[0, 0, 0]}>
      <sphereGeometry args={[5, 64, 64]} />
      <meshStandardMaterial
        color="#ffdd00"
        emissive="#ff9500"
        emissiveIntensity={1}
        toneMapped={false}
      />
      <pointLight color="#ffee88" intensity={2} distance={100} decay={2} />
      <Html center>
        <div style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: '16px',
          whiteSpace: 'nowrap',
          textShadow: '0 0 10px rgba(255,255,0,0.8)',
          padding: '10px'
        }}>
          WILLIAM MABOTJA
        </div>
      </Html>
    </mesh>
  );
};

// InfoPanel Component for descriptions
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
        <h2 style={{ margin: '0 0 10px 0', color: '#4fc3f7' }}>William's Achievement Universe</h2>
        <p style={{ fontSize: '14px', margin: '5px 0' }}>
          Explore my accomplishments by hovering over each planet. The size and number of moons 
          represent the significance and components of each achievement.
        </p>
        <p style={{ fontSize: '12px', fontStyle: 'italic', marginTop: '10px' }}>
          Interact with the scene: Drag to rotate, scroll to zoom
        </p>
      </div>
    </Html>
  );
};

// Main AchievementsUniverse Component
const AchievementsUniverse = () => {
  return (
    <Canvas style={{ height: "100vh", width: "100vw", background: "black" }}>

      <EarthHomeButton />
      {/* Etched SVG */}
      <EtchedSVG />
      
      {/* Camera setup */}
      <PerspectiveCamera makeDefault position={[0, 10, 25]} />
      
      {/* Basic lighting */}
      <ambientLight intensity={0.2} />
      
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
      
      {/* Central sun */}
      <CentralSun />
      
      {/* Achievement planets with moons */}
      {achievements.map((achievement, index) => (
        <Planet
          key={index}
          position={achievement.position}
          size={achievement.size}
          color={achievement.color}
          speed={achievement.rotation}
          moons={achievement.moons}
          label={achievement.title}
          description={achievement.description}
        />
      ))}
      
      {/* Space dust particles */}
      <SpaceDust />
      
      {/* Info Panel */}
      <InfoPanel />
    </Canvas>
  );
};

export default AchievementsUniverse;