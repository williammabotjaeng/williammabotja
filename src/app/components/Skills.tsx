import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Skills = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const containerRef = useRef(null);
  
  // Trigger the finale after the main animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 36000); // Total animation duration for all skills
    return () => clearTimeout(timer);
  }, []);
  
  // Skills data
  const skillsData = [
    { label: "Web Expertise", value: "React, Next.js, Tailwind CSS" },
    { label: "3D Visualization", value: "Three.js, Babylon.js" },
    { label: "Backend Mastery", value: "Node.js, Python, Express" },
    { label: "AI & Machine Learning", value: "TensorFlow, PyTorch, Scikit-Learn" },
    { label: "Cloud & Azure", value: "Azure, Azure DevOps, ARM" },
    { label: "Algorithms", value: "Data Structures, Graphs, DP" },
  ];

  // Star field background
  const StarField = () => {
    const stars = Array.from({ length: 300 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2,
      opacity: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.15 + 0.05
    }));
    
    return (
      <div className="absolute inset-0 overflow-hidden">
        {stars.map(star => (
          <motion.div
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity
            }}
            animate={{
              y: ["0%", "100%"],
            }}
            transition={{
              duration: 20 / star.speed,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* Star field background */}
      <StarField />
      
      {/* Cosmic glow effect */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-blue-500 opacity-10 blur-3xl" />
      
      {/* Main animated sequence */}
      {!animationComplete && (
        <div 
          ref={containerRef}
          className="relative w-full max-w-4xl h-full p-3"
          style={{ 
            perspective: "1000px",
            transformStyle: "preserve-3d"
          }}
        >
          {/* Credits content */}
          <div className="w-full h-full flex flex-col items-center justify-center">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="text-white text-5xl font-bold mb-16 tracking-wider"
            >
              TECHNICAL SKILLS
            </motion.h1>
            
            {/* Skills list with staggered animation */}
            <div className="relative h-96 w-full overflow-hidden">
              {skillsData.map((skill, index) => (
                <motion.div
                  key={index}
                  className="absolute w-full text-center"
                  initial={{ 
                    y: "100vh", 
                    opacity: 0,
                    rotateX: 15,
                    scale: 1.2
                  }}
                  animate={{ 
                    y: "-100vh", 
                    opacity: [0, 1, 1, 0],
                    rotateX: 15,
                    scale: [1.2, 1, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 12,
                    delay: index * 4,
                    ease: "linear",
                    times: [0, 0.1, 0.9, 1]
                  }}
                  style={{
                    transformOrigin: "center bottom",
                    transformStyle: "preserve-3d"
                  }}
                >
                  <div className="mb-1 text-blue-400 uppercase tracking-widest text-sm font-light">{skill.label}</div>
                  <div className="text-white text-2xl font-bold mb-8">{skill.value}</div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Perspective vanishing point effect */}
          <motion.div 
            className="absolute inset-0 opacity-50"
            style={{
              background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.8) 70%, black 100%)",
              transformStyle: "preserve-3d",
              transform: "rotateX(25deg)"
            }}
          />
          
          {/* Monolith-inspired element */}
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-40 bg-white"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 80, opacity: 0.3 }}
            transition={{ delay: 28, duration: 2 }}
          />
          
          {/* The void - dark overlay that appears at the end */}
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 30, duration: 3 }}
          />
        </div>
      )}
      
      {/* Final skills display that appears after animation - LEFT ALIGNED WITH REDUCED WIDTH */}
      <AnimatePresence>
        {animationComplete && (
          <motion.div 
            className="absolute left-0 top-0 w-full h-full flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <motion.div 
              className="pl-8 md:pl-16 w-full max-w-xs"
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {/* <motion.h1
                initial={{ opacity: 0, y : -20}}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-white text-3xl font-bold mb-8 tracking-wider"
              >
                TECHNICAL SKILLS
              </motion.h1> */}
              
              <motion.div className="flex flex-col space-y-4">
                {skillsData.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.15 }}
                    className="bg-black bg-opacity-40 backdrop-blur-sm p-4 rounded border-l-2 border-blue-400"
                  >
                    <div className="text-blue-400 uppercase tracking-widest text-xs font-light">{skill.label}</div>
                    <div className="text-white text-sm font-bold mt-1">{skill.value}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Skills;