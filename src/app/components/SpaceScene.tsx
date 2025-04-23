"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Define types for Planet props
interface PlanetProps {
  position: [number, number, number];
  size: number;
  color: number | string;
  speed: number;
  texture?: THREE.Texture | null;
}

// Planet component
const Planet = ({ position, size, color, speed, texture = null }: PlanetProps) => {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    // Rotate the planet on its own axis
    mesh.current.rotation.y += speed;
    // Optional orbit behavior around the scene center
    const time = Date.now() * 0.001;
    mesh.current.position.x = position[0] + Math.sin(time * speed) * 2;
    mesh.current.position.z = position[2] + Math.cos(time * speed) * 2;
  });

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      {texture ? (
        <meshStandardMaterial map={texture} />
      ) : (
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.5} />
      )}
    </mesh>
  );
};

// Animated space dust particles component
const SpaceDust = () => {
  const particles = useRef<THREE.Points>(null!);
  const count = 2000;

  // Calculate particle positions and colors only once
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

      // Random colors for each particle
      colorArray[i * 3] = Math.random();
      colorArray[i * 3 + 1] = Math.random();
      colorArray[i * 3 + 2] = Math.random();
    }

    return [posArray, colorArray];
  }, [count]);

  useFrame(() => {
    particles.current.rotation.y += 0.0005;
  });

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial size={0.1} vertexColors transparent opacity={0.8} />
    </points>
  );
};

// Main SpaceScene component that composes all of the pieces together
const SpaceScene = () => {
  return (
    <Canvas style={{ height: '100vh', width: '100vw', background: 'black' }}>
      {/* Basic lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Camera controls */}
      <OrbitControls />

      {/* Background stars */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />

      {/* Add one or more planets */}
      <Planet position={[0, 0, 0]} size={3} color="blue" speed={0.005} />
      <Planet position={[10, 0, -20]} size={2} color="#ff8800" speed={0.01} />

      {/* Space dust particles */}
      <SpaceDust />
    </Canvas>
  );
};

export default SpaceScene;
