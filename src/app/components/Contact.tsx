"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Contact = () => {
  // Define proper TypeScript type for form inputs
  interface FormState {
    name: string;
    email: string;
    subject: string;
    message: string;
  }

  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [transmissionState, setTransmissionState] = useState("standby"); // standby, transmitting, received, error
  const [animationComplete, setAnimationComplete] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Radio static sound effect reference
  useEffect(() => {
    audioRef.current = new Audio();
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Initialize animation sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Form handling
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form fields
    if (!formState.name || !formState.email || !formState.subject || !formState.message) {
      alert("Please fill in all fields");
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formState.email)) {
      alert("Please enter a valid email address");
      return;
    }
    
    // Start transmission animation
    setTransmissionState("transmitting");
    
    try {
      // Here you would typically send the form data to your backend
      // Example:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formState),
      // });
      
      // if (!response.ok) throw new Error('Failed to send message');
      
      // If successful, show success message
      setTimeout(() => {
        setTransmissionState("received");
      }, 4000);
      
      // Reset form after successful "transmission"
      setTimeout(() => {
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setTransmissionState("standby");
      }, 8000);
    } catch (error) {
      // Handle error state
      console.error("Transmission error:", error);
      setTransmissionState("error");
      
      // Reset to standby after error
      setTimeout(() => {
        setTransmissionState("standby");
      }, 5000);
    }
  };

  // Visual/audio feedback elements
  const RadioWaves = () => {
    return (
      <div className="absolute left-1/4 bottom-0 transform -translate-x-1/2">
        {[1, 2, 3, 4].map((wave) => (
          <motion.div
            key={wave}
            className="absolute bottom-0 left-0 right-0 h-40 border-2 border-blue-400 rounded-full opacity-20"
            initial={{ width: 20, height: 20, opacity: 0.8 }}
            animate={{ 
              width: wave * 200, 
              height: wave * 200, 
              opacity: 0 
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              delay: wave * 0.8,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    );
  };

  const TransmissionVisualizer = () => {
    const bars = 20;
    
    return (
      <div className="flex items-end h-12 gap-1 mx-auto">
        {Array.from({ length: bars }).map((_, index) => {
          // Different animation patterns based on transmission state
          const animationHeight = 
            transmissionState === "standby" ? 
              [Math.random() * 20 + 5, Math.random() * 15 + 5] : 
            transmissionState === "transmitting" ? 
              [Math.random() * 100 + 20, Math.random() * 80 + 40] : 
            transmissionState === "received" ? 
              [100, 20, 100] : [5, 5];
          
          return (
            <motion.div
              key={index}
              className="w-1 bg-green-400"
              initial={{ height: 5 }}
              animate={{ height: animationHeight }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
                repeatType: "reverse",
                delay: index * 0.05,
              }}
            />
          );
        })}
      </div>
    );
  };

  // Loading animation
  if (!animationComplete) {
    return (
      <div className="relative w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
        <div className="text-green-400 font-mono text-2xl mb-6">INITIALIZING COMMS</div>
        <motion.div 
          className="w-32 h-32 rounded-full border-4 border-green-500 border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <div className="mt-6 text-green-400 font-mono">
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Establishing Secure Channel...
          </motion.span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      {/* Star background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Radio wave animation */}
      {transmissionState === "transmitting" && <RadioWaves />}
      
      <div className="container mx-auto flex flex-col min-h-screen z-10 relative">
        {/* Mission header */}
        <motion.div 
          className="py-3 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-3xl font-bold tracking-widest text-blue-400">MISSION CONTROL</h1>
          <div className="text-sm font-mono text-gray-400 mt-1">SECURE TRANSMISSION RELAY</div>
          
          {/* Mission timer */}
          <div className="flex justify-center mt-2">
            <Clock />
          </div>
        </motion.div>

        {/* Main content - moved form to the left */}
        <div className="flex-1 flex flex-col px-4">
          {/* Contact form - positioned far left */}
          <motion.div 
            className="w-full max-w-md ml-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="border-2 border-gray-700 bg-black bg-opacity-60 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-mono text-green-400">COMPOSE TRANSMISSION</h2>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mx-1"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mx-1"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 mx-1"></div>
                </div>
              </div>
              
              <AnimatePresence mode="wait">
                {transmissionState === "received" ? (
                  <motion.div
                    className="flex flex-col items-center justify-center h-48"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key="received"
                  >
                    <div className="text-green-500 text-5xl mb-2">✓</div>
                    <h3 className="text-xl text-white mb-1">Transmission Received</h3>
                    <p className="text-gray-400 text-center text-sm">
                      Message transmitted to Mission Control.
                      <br />A response will be sent shortly.
                    </p>
                    <div className="mt-4 font-mono text-xs text-blue-400">
                      TRANSMISSION ID: {Math.random().toString(36).substring(2, 12).toUpperCase()}
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key="form"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="name" className="block text-xs text-gray-400 font-mono mb-1">CALLSIGN (NAME)</label>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          value={formState.name}
                          onChange={handleInputChange}
                          className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-1 text-white font-mono focus:border-blue-500 focus:outline-none text-sm"
                          required
                          disabled={transmissionState === "transmitting"}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs text-gray-400 font-mono mb-1">COMM LINK (EMAIL)</label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={formState.email}
                          onChange={handleInputChange}
                          className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-1 text-white font-mono focus:border-blue-500 focus:outline-none text-sm"
                          required
                          disabled={transmissionState === "transmitting"}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-xs text-gray-400 font-mono mb-1">TRANSMISSION SUBJECT</label>
                      <input
                        id="subject"
                        type="text"
                        name="subject"
                        value={formState.subject}
                        onChange={handleInputChange}
                        className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-1 text-white font-mono focus:border-blue-500 focus:outline-none text-sm"
                        required
                        disabled={transmissionState === "transmitting"}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-xs text-gray-400 font-mono mb-1">MESSAGE CONTENTS</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-1 text-white font-mono focus:border-blue-500 focus:outline-none resize-none text-sm"
                        required
                        disabled={transmissionState === "transmitting"}
                      />
                    </div>
                    
                    <div className="flex justify-between items-center pt-2">
                      <div className="text-xs text-gray-400 font-mono">
                        {transmissionState === "transmitting" ? "TRANSMISSION IN PROGRESS..." : "READY TO TRANSMIT"}
                      </div>
                      <motion.button
                        type="submit"
                        className={`px-4 py-2 rounded flex items-center space-x-2 text-sm ${
                          transmissionState === "transmitting" 
                            ? "bg-blue-900 text-blue-200" 
                            : "bg-blue-600 hover:bg-blue-500 text-white"
                        }`}
                        disabled={transmissionState === "transmitting"}
                        whileHover={transmissionState !== "transmitting" ? { scale: 1.05 } : {}}
                        whileTap={transmissionState !== "transmitting" ? { scale: 0.95 } : {}}
                      >
                        {transmissionState === "transmitting" ? (
                          <>
                            <div className="w-4 h-4 border-2 border-blue-300 border-t-transparent rounded-full animate-spin"></div>
                            <span>TRANSMITTING</span>
                          </>
                        ) : (
                          <>
                            <span>TRANSMIT MESSAGE</span>
                            <span>→</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
            
            {/* Communication status indicators - moved below form */}
            <div className="mt-4 border-2 border-gray-700 bg-black bg-opacity-60 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-400 font-mono mb-1">COMM STATUS</div>
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      transmissionState === "standby" ? "bg-yellow-500" :
                      transmissionState === "transmitting" ? "bg-blue-500 animate-pulse" :
                      transmissionState === "received" ? "bg-green-500" : "bg-red-500"
                    }`}></div>
                    <span className="text-white font-mono text-xs uppercase">
                      {transmissionState === "standby" ? "Ready" :
                      transmissionState === "transmitting" ? "Transmitting" :
                      transmissionState === "received" ? "Received" : "Error"}
                    </span>
                  </div>
                </div>
                
                <div>
                  <div className="text-xs text-gray-400 font-mono mb-1">SIGNAL</div>
                  <div className="h-2 w-24 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-green-500" 
                      initial={{ width: "70%" }}
                      animate={{ width: ["70%", "90%", "75%", "85%"] }}
                      transition={{ duration: 5, repeat: Infinity }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="text-xs text-gray-400 font-mono mb-1">FREQUENCY</div>
                  <div className="text-white font-mono text-xs">145.800 MHz</div>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="text-xs text-gray-400 font-mono mb-1">TRANSMISSION SPECTRUM</div>
                <TransmissionVisualizer />
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Footer with mission stats */}
        <motion.div 
          className="py-3 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <div className="grid grid-cols-3 gap-4 text-center font-mono text-xs text-gray-500 border-t border-gray-800 pt-3">
            <div>MISSION DAY: 845</div>
            <div>LOCATION: LEO</div>
            <div>COMM WINDOW: OPEN</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Mission clock component
const Clock = () => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // MET - Mission Elapsed Time (fictional)
  const missionStartDate = new Date('2023-01-01T00:00:00');
  const elapsedMS = time.getTime() - missionStartDate.getTime();
  const elapsedDays = Math.floor(elapsedMS / (1000 * 60 * 60 * 24));
  const elapsedHours = Math.floor((elapsedMS % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const elapsedMinutes = Math.floor((elapsedMS % (1000 * 60 * 60)) / (1000 * 60));
  const elapsedSeconds = Math.floor((elapsedMS % (1000 * 60)) / 1000);
  
  return (
    <div className="flex space-x-6 text-sm font-mono">
      <div>
        <div className="text-gray-500">UTC</div>
        <div className="text-white">{time.toISOString().substring(11, 19)}</div>
      </div>
      <div>
        <div className="text-gray-500">MET</div>
        <div className="text-white">
          {elapsedDays}:{String(elapsedHours).padStart(2, '0')}:
          {String(elapsedMinutes).padStart(2, '0')}:{String(elapsedSeconds).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};

export default Contact;