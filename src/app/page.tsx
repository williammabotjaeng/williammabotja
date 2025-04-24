"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import SpaceScene from "@/components/SpaceScene";
import SpaceNavigation from "@/components/SpaceNavigation";
import { SoundProvider, SoundToggle, useSound } from "@/components/SoundManager";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { router } from "next/navigation";

// Fixed Scroll Indicator – now conditionally rendered based on the landing section’s visibility.
const ScrollIndicator = () => {
  const { playSound } = useSound();
  
  const handleMouseEnter = () => {
    playSound("hover");
  };
  
  return (
    <motion.div 
      className="fixed bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white z-30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      onMouseEnter={handleMouseEnter}
    >
      <motion.div
        className="w-8 h-14 border-2 border-white border-opacity-60 rounded-full mb-2 flex justify-center p-1"
        whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.9)" }}
      >
        <motion.div
          className="w-1.5 h-3 bg-white bg-opacity-80 rounded-full"
          animate={{ 
            y: [0, 24, 0],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2, 
            ease: "easeInOut" 
          }}
        />
      </motion.div>
      <motion.p
        className="text-sm font-light tracking-wider"
        animate={{ opacity: [0.6, 0.9, 0.6] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        Scroll to explore
      </motion.p>
    </motion.div>
  );
};

const StarField = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 100 }).map((_, i) => {
        const size = Math.random() * 2 + 1;
        const animationDuration = Math.random() * 4 + 3;
        return (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: size,
              height: size,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: animationDuration,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5,
            }}
          />
        );
      })}
    </div>
  );
};

// ProfileHeader now uses relative positioning so it appears only inside the "home" block.
const ProfileHeader = () => {
  
  const router = useRouter();

  return (
    <motion.div
      className="relative mt-10 ml-10 md:ml-16 z-20 max-w-md"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <motion.div 
        className="relative"
        whileHover={{ scale: 1.02 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-400 bg-clip-text text-transparent"
        >
          WillIAm Mabotja
        </motion.h1>
        <motion.div 
          className="h-1 w-24 bg-blue-500 mt-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: "5rem" }}
          transition={{ duration: 1, delay: 1 }}
        />
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="mt-6 text-gray-300 text-sm md:text-base lg:text-lg max-w-sm"
      >
        Explore my cosmic CV – navigate through the orbital menu to discover my Achievements,
        Certifications, Experience, Skills, Projects, and Achievements.
      </motion.p>
      
      <motion.div
        className="flex mt-8 space-x-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.button
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white text-sm font-medium flex items-center transition-all duration-300"
          whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push("/certifications")}
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" />
            <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
          </svg>
          Certifications
        </motion.button>
        <motion.button
          className="px-5 py-2 bg-transparent border border-white border-opacity-30 hover:border-opacity-100 rounded-full text-white text-sm font-medium flex items-center transition-all duration-300"
          whileHover={{ scale: 1.05, opacity: 1 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push("/achievements")}
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clipRule="evenodd" />
          </svg>
          Achievements
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

const HomePage = () => {
  const router = useRouter();
  const [isHomeVisible, setIsHomeVisible] = useState(true);

  // Use Intersection Observer to track if #home is in view.
  useEffect(() => {
    const homeElement = document.getElementById("home");
    if (!homeElement) return;
    const observer = new IntersectionObserver(
      (entries) => {
        setIsHomeVisible(entries[0].isIntersecting);
      },
      { threshold: 0.5 }
    );
    observer.observe(homeElement);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = "auto";
    document.body.style.backgroundColor = "black";
    return () => {
      document.body.style.overflow = "";
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <SoundProvider>
      <div className="font-sans text-white bg-black min-h-screen overflow-x-hidden relative">
        {/* Fixed Overlays */}
        <StarField />
        <SpaceScene />
        <SpaceNavigation />
        
        {/* Render the Scroll Indicator only if the home section is in view */}
        {isHomeVisible && <ScrollIndicator />}
        
        <main className="relative z-10">
          {/* Home Content */}
          <div id="home" className="h-screen flex flex-col justify-center">
            <ProfileHeader />
          </div>
          
          {/* About Content */}
          <div id="about" className="min-h-screen flex items-center justify-center">
            <motion.div
              className="w-full max-w-4xl px-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <About />
            </motion.div>
          </div>
          
          {/* Experience Content */}
          <div id="experience" className="min-h-screen flex items-center justify-center">
            <motion.div
              className="w-full max-w-4xl px-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Experience />
            </motion.div>
          </div>
          
          {/* Additional Content Blocks */}
          <div id="skills" className="min-h-screen flex items-center justify-center">
          <motion.div
              className="w-full max-w-4xl px-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Skills />
            </motion.div>
          </div>
          <div id="projects" className="min-h-screen flex items-center justify-center">
            <motion.div
              className="w-full max-w-4xl px-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Projects />
            </motion.div>
          </div>
          <div id="contact" className="min-h-screen flex items-center justify-center">
            <motion.div
              className="w-full max-w-4xl px-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Contact />
            </motion.div>
          </div>
        </main>
      </div>
    </SoundProvider>
  );
};

export default HomePage;
