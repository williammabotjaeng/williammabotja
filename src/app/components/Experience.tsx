"use client";

import React, { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// ---------------------------
// Three.js Powered Rotating Ring Background
// ---------------------------
const RotatingRing = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta;
    meshRef.current.rotation.y += delta * 0.5;
  });
  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[1, 0.15, 16, 100]} />
      <meshBasicMaterial color="white" opacity={0.3} transparent />
    </mesh>
  );
};

const StatBackground = () => (
  <div className="absolute inset-0 pointer-events-none" style={{ zIndex: -1 }}>
    <Canvas
      frameloop="always"
      gl={{ alpha: true }}
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.5} />
      <RotatingRing />
    </Canvas>
  </div>
);

// ---------------------------
// Stat Data & Positions
// ---------------------------
const statData = [
  { label: "Companies", value: "10" },
  { label: "Positions", value: "10" },
  { label: "Years Experience", value: "9+" }
];

// Adjusted arc positions to increase spacing between stats
const arcPositions = [
  { x: -150, y: 20 },  // left stat  
  { x: -20, y: -30 },  // middle stat
  { x: 110, y: 20 }    // right stat  
];

// ---------------------------
// Main Experience Component
// ---------------------------
const Experience = () => {
  const router = useRouter();

  const handleSeeMore = () => {
    router.push("/experience-details");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-start justify-center p-8"
      style={{
        background: "transparent",
        fontFamily: "'SpaceFont', sans-serif", // Ensure your custom space font is loaded via CSS or placed in public folder
      }}
    >
      {/* Header & Overview */}
      <motion.div
        className="w-full max-w-4xl mb-8 text-left pr-32"
        initial={{ opacity: 0, scale: 0.95, x: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-white">Experience Overview</h2>
        <p className="mt-2 text-lg text-white">
          I've collaborated with 10 companies and held 10 diverse roles over 9+ years of experience.
        </p>
      </motion.div>

      {/* Stats arranged in an arc */}
      <div className="relative w-full max-w-4xl h-64 pr-32">
        {statData.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: arcPositions[index].x, y: arcPositions[index].y }}
            animate={{ opacity: 1, x: arcPositions[index].x, y: arcPositions[index].y }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              duration: 1.5,
            }}
            // Adjust left to "40%" so everything moves further left
            className="absolute flex flex-col items-center justify-center p-4 bg-transparent bg-opacity-20 rounded-full backdrop-blur-sm"
            style={{ left: "40%", top: "50%", transform: "translate(-50%, -50%)" }}
          >
            {/* Animated Three.js background */}
            <StatBackground />
            {/* Stat value */}
            <motion.div
              className="relative text-5xl font-bold text-white"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {stat.value}
            </motion.div>
            {/* Stat label using a plain <span> for custom space font styling */}
            <motion.div
              className="relative mt-2 uppercase tracking-wide text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span style={{ fontFamily: "'SpaceFont', sans-serif", fontSize: "0.5rem" }}>
                {stat.label}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* See More Button */}
      <motion.button
        onClick={handleSeeMore}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-10 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-semibold transition-colors"
      >
        See More
      </motion.button>
    </div>
  );
};

export default Experience;
