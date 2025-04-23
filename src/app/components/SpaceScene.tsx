"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  Stars,
  OrbitControls,
  PerspectiveCamera,
  Billboard,
  Text,
} from "@react-three/drei";
import * as THREE from "three";

// Use the public URL for your SVG asset.
const williamSVGPath = "/william.svg";

// -------------------------------
// EtchedSVG Component
// -------------------------------
// Loads the SVG asset as a texture and maps it onto a plane.
// The plane's dimensions are computed to preserve the image's aspect ratio.
// The mesh is positioned at [-30, -10, -30], moving it downward.
const EtchedSVG = () => {
  const texture = useLoader(THREE.TextureLoader, williamSVGPath);

  // Compute aspect ratio when the texture is loaded.
  const aspect = useMemo(() => {
    if (texture && texture.image) {
      return texture.image.width / texture.image.height;
    }
    return 1;
  }, [texture]);

  // Define desired "height" of the plane.
  const planeHeight = 40;
  const planeWidth = planeHeight * aspect;

  return (
    <mesh position={[-30, -10, -30]}>
      <planeGeometry args={[planeWidth, planeHeight]} />
      <meshBasicMaterial map={texture} transparent opacity={0.4} />
    </mesh>
  );
};

// -------------------------------
// Planet Component
// -------------------------------
interface PlanetProps {
  position: [number, number, number];
  size: number;
  color: number | string;
  speed: number;
  texture?: THREE.Texture | null;
  label?: string;
}
const Planet = ({
  position,
  size,
  color,
  speed,
  texture = null,
  label,
}: PlanetProps) => {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    // Rotate on its own axis.
    mesh.current.rotation.y += speed;
    // Optional orbital offset around the specified position.
    const time = Date.now() * 0.001;
    mesh.current.position.x = position[0] + Math.sin(time * speed) * 2;
    mesh.current.position.z = position[2] + Math.cos(time * speed) * 2;
  });

  return (
    <>
      <mesh ref={mesh} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        {texture ? (
          <meshStandardMaterial map={texture} />
        ) : (
          <meshStandardMaterial
            color={color}
            roughness={0.5}
            metalness={0.5}
          />
        )}
      </mesh>
      {label && (
        <Billboard position={[position[0], position[1] + size + 0.5, position[2]]}>
          <Text
            font="/SpaceFont.ttf" // Path to your custom space font.
            color="white"
            anchorX="center"
            anchorY="middle"
            fontSize={0.5}
          >
            {label}
          </Text>
        </Billboard>
      )}
    </>
  );
};

// -------------------------------
// SpaceDust Component (unchanged)
// -------------------------------
const SpaceDust = () => {
  const particles = useRef<THREE.Points>(null!);
  const count = 2000;

  const [positions, colors] = useMemo(() => {
    const posArray = new Float32Array(count * 3);
    const colorArray = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const distance = Math.random() * 50 + 10;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      posArray[i * 3] = distance * Math.sin(phi) * Math.cos(theta);
      posArray[i * 3 + 1] = distance * Math.sin(phi) * Math.sin(theta);
      posArray[i * 3 + 2] = distance * Math.cos(phi);

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

// -------------------------------
// Main SpaceScene Component
// -------------------------------
const SpaceScene = () => {
  return (
    <Canvas style={{ height: "100vh", width: "100vw", background: "black" }}>
      {/* Insert the etched SVG on the far left, moved down */}
      <EtchedSVG />

      {/* Default perspective camera */}
      <PerspectiveCamera makeDefault position={[0, 5, 15]} />

      {/* Basic lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Camera controls */}
      <OrbitControls />

      {/* Background stars */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />

      {/* Planet components with optional labels */}
      <Planet
        position={[0, 0, 0]}
        size={3}
        color="blue"
        speed={0.005}
        label="William Mabotja"
      />
      <Planet
        position={[10, 0, -20]}
        size={2}
        color="#ff8800"
        speed={0.01}
        label="FullStack Developer"
      />

      {/* Space dust particles */}
      <SpaceDust />
    </Canvas>
  );
};

export default SpaceScene;
