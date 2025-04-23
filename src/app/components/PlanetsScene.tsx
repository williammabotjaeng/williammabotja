"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export interface PlanetProps {
  position: [number, number, number];
  size: number;
  color: string | number;
  speed: number;
  label: string;
  onClick?: () => void;
  texture?: THREE.Texture | null;
}

const Planet = ({
  position,
  size,
  color,
  speed,
  label,
  onClick,
  texture = null,
}: PlanetProps) => {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    // Self-rotation and an orbital effect around the scene center
    mesh.current.rotation.y += speed;
    const time = Date.now() * 0.001;
    mesh.current.position.x = position[0] + Math.sin(time * speed) * 2;
    mesh.current.position.z = position[2] + Math.cos(time * speed) * 2;
  });

  return (
    <mesh ref={mesh} position={position} onClick={onClick} castShadow>
      <sphereGeometry args={[size, 32, 32]} />
      {texture ? (
        <meshStandardMaterial map={texture} />
      ) : (
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.5} />
      )}
    </mesh>
  );
};

const SpaceDust = () => {
  const particles = useRef<THREE.Points>(null!);
  const count = 2000;

  const [positions, colors] = useMemo(() => {
    const posArray = new Float32Array(count * 3);
    const colorArray = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Random position inside a spherical volume
      const distance = Math.random() * 50 + 10;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      posArray[i * 3] = distance * Math.sin(phi) * Math.cos(theta);
      posArray[i * 3 + 1] = distance * Math.sin(phi) * Math.sin(theta);
      posArray[i * 3 + 2] = distance * Math.cos(phi);
      // Random colors
      colorArray[i * 3] = Math.random();
      colorArray[i * 3 + 1] = Math.random();
      colorArray[i * 3 + 2] = Math.random();
    }
    return [posArray, colorArray];
  }, [count]);

  useFrame(() => {
    if (particles.current) {
      particles.current.rotation.y += 0.0005;
    }
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
      <pointsMaterial size={0.1} vertexColors transparent opacity={0.8} />
    </points>
  );
};

interface PlanetsSceneProps {
  onPlanetClick?: (planet: string) => void;
}

const PlanetsScene: React.FC<PlanetsSceneProps> = ({ onPlanetClick }) => {
  return (
    <Canvas style={{ height: "100vh", width: "100vw", background: "black" }}>
      {/* Basic lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <OrbitControls />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      {/* Render the planets */}
      <Planet
        position={[0, 0, 0]}
        size={3}
        color="#3498db"
        speed={0.005}
        label="Education"
        onClick={() => onPlanetClick && onPlanetClick("Education")}
      />
      <Planet
        position={[10, 0, -20]}
        size={2.5}
        color="#e67e22"
        speed={0.01}
        label="Certifications"
        onClick={() => onPlanetClick && onPlanetClick("Certifications")}
      />
      <Planet
        position={[-15, 0, -10]}
        size={3.2}
        color="#2ecc71"
        speed={0.008}
        label="Experience"
        onClick={() => onPlanetClick && onPlanetClick("Experience")}
      />
      <Planet
        position={[20, 0, 5]}
        size={2.5}
        color="#9b59b6"
        speed={0.007}
        label="Skills"
        onClick={() => onPlanetClick && onPlanetClick("Skills")}
      />
      <Planet
        position={[-10, 0, 15]}
        size={2.5}
        color="#e91e63"
        speed={0.009}
        label="Gallery"
        onClick={() => onPlanetClick && onPlanetClick("Gallery")}
      />
      <Planet
        position={[5, 0, 20]}
        size={2}
        color="#f1c40f"
        speed={0.006}
        label="Achievements"
        onClick={() => onPlanetClick && onPlanetClick("Achievements")}
      />
      {/* Space dust */}
      <SpaceDust />
    </Canvas>
  );
};

export default PlanetsScene;
