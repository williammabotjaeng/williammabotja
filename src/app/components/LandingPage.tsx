"use client";

import React from "react";
import { motion } from "framer-motion";
import SpaceScene from "@/components/SpaceScene";
import { useSound } from "@/components/SoundManager"; // Ensure this hook is set up as a client component
import Link from "next/link";

const LandingPage: React.FC = () => {
  const { playSound } = useSound();

  // Handler for button clicks to play a click sound
  const handleButtonClick = (action: string) => {
    playSound("click");
    console.log(`Action triggered: ${action}`);
    // Add navigation or additional functionality as needed
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* 3D animated space background */}
      <SpaceScene />

      {/* Main overlay content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-20 px-4">
        <motion.h1
          className="text-4xl md:text-7xl font-extrabold text-white drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          WillIAmMabotja.xyz
        </motion.h1>

        <motion.p
          className="mt-4 text-lg md:text-2xl text-gray-300 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Welcome to my digital frontier. I’m a Software Developer building
          innovative solutions with a cosmic twist.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col md:flex-row gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <button
            onClick={() => handleButtonClick("portfolio")}
            className="px-8 py-3 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition"
          >
            View Portfolio
          </button>
          <button
            onClick={() => handleButtonClick("contact")}
            className="px-8 py-3 bg-green-600 rounded-full text-white hover:bg-green-700 transition"
          >
            Contact Me
          </button>
        </motion.div>
      </div>
    </main>
  );
};

export default LandingPage;
