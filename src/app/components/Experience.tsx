"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// Stat data
const statData = [
  { label: "Companies", value: "10" },
  { label: "Positions", value: "10" },
  { label: "Years Experience", value: "9+" }
];

// Define positions for three stats, arranged in an arc opening upward.
const arcPositions = [
  { x: -80, y: 20 },  // left stat  
  { x: 0, y: -30 },   // center stat (higher)  
  { x: 80, y: 20 }    // right stat  
];

const Experience = () => {
  const router = useRouter();

  const handleSeeMore = () => {
    router.push("/experience-details");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-start justify-center p-8"
      style={{ background: "rgba(0, 0, 0, 0.5)" }}  // Transparent dark overlay
    >
      {/* Header & Overview */}
      <motion.div
        className="w-full max-w-4xl mb-8 text-left pr-32"
        initial={{ opacity: 0, scale: 0.95, x: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-white">Experience Overview</h2>
        <p className="mt-2 text-lg text-gray-200">
          I've collaborated with 10 companies and held 10 diverse roles over 9+ years of experience.
        </p>
      </motion.div>

      {/* Stats arranged on an Arc */}
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
            className="absolute flex flex-col items-center justify-center p-4 bg-white bg-opacity-20 rounded-full backdrop-blur-sm"
            style={{ left: "50%", top: "50%" }}
          >
            {/* Stat Value Appears Softly */}
            <motion.div
              className="text-5xl font-bold text-white"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {stat.value}
            </motion.div>
            {/* Stat Label Appears Softly */}
            <motion.div
              className="mt-2 uppercase tracking-wide text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {stat.label}
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
