"use client";

import React from "react";
import { motion } from "framer-motion";
import SpaceScene from "@/components/SpaceScene";
import SpaceNavigation from "@/components/SpaceNavigation";
import { SoundProvider, SoundToggle, useSound } from "@/components/SoundManager";
import { useRouter } from "next/navigation";

const ScrollIndicator = () => {
  const { playSound } = useSound();
  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white z-30">
      <motion.div
        className="w-8 h-12 border-2 border-white rounded-full mb-2 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.div
          className="w-1 h-3 bg-white rounded-full"
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      </motion.div>
      <motion.p
        className="text-sm font-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        Scroll to explore
      </motion.p>
    </div>
  );
};

const HomePage = () => {
  const router = useRouter();
  return (
    <SoundProvider>
      <div className="font-sans text-white bg-black min-h-screen overflow-x-hidden">
        {/* 3D Space Background */}
        <SpaceScene />

        {/* Navigation */}
        <SpaceNavigation />

        {/* Sound toggle button */}
        <SoundToggle />

        {/* Scroll indicator */}
        <ScrollIndicator />

        {/* Main content */}
        <main className="relative z-10">
          {/* Your landing page interactive content goes here */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-white text-5xl md:text-7xl font-bold drop-shadow-lg text-center"
          >
            WillIAm Mabotja
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-4 text-gray-300 text-lg md:text-2xl max-w-xl mx-auto text-center"
          >
            Explore my cosmic CV – click on a planet to discover Education,
            Certifications, Experience, Skills, Gallery, and Achievements.
          </motion.p>
        </main>
      </div>
    </SoundProvider>
  );
};

export default HomePage;
