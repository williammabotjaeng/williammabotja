"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import WilliamOne from "@/assets/william-1.jpg";  
import WilliamTwo from "@/assets/william-2.jpg";
import WilliamThree from "@/assets/william-3.jpg";

const images = [WilliamOne, WilliamTwo, WilliamThree];

const imageVariants = {
  initial: { opacity: 0, scale: 1 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, scale: 2, rotate: 45, transition: { duration: 0.5 } },
};

const StardustImageSlider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-update slide every 3 seconds.
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-transparent overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentImageIndex}
          src={images[currentImageIndex].src}
          alt={`Slide ${currentImageIndex + 1}`}
          className="absolute w-full h-full object-cover"
          variants={imageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        />
      </AnimatePresence>

      <div className="absolute bottom-6 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentImageIndex ? "bg-white" : "bg-gray-500"
            }`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default StardustImageSlider;
