"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Initial loading animation
    const timer = setTimeout(() => {
      setInitialLoadComplete(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Sample projects data
  const projectsData = [
    {
      id: 1,
      title: "TaskyCodes",
      category: "Productivity Tool",
      description: "A CLI utility that creates ClickUp tasks directly from the command line, with an attached code file related to the task.",
      technologies: ["axios", "oclif", "Node.js", "TypeScript", "fs"],
      status: "Deployed",
      inspiration: "Inspired by the need to perform operations directly in CLI without shifting focus. Got the idea from working on projects for long hours, sometimes when you're focused and locked into your CLI you don't want to move away.",
      whatWeBuilt: [
        "Used oclif to create a CLI tool based on a boilerplate for rapid development.",
        "Integrated axios for API calls, setting up requests with the necessary headers and body.",
        "Created a system that allows task creation with code files attached"
      ],
      challenges: [
        "Setting up an SSL environment for TLSSocket calls, which posed issues when working under HTTP."
      ],
      accomplishments: [
        "Successfully created a tool that allows task creation with single-line notes, with future plans for richer text input.",
        "Won the ClickUp.com prize in the DeveloperWeek 2022 Hackathon"
      ],
      insights: [
        "Found the ClickUp API easy to use and plan to create more applications integrated with it in the future."
      ],
      nextSteps: [
        "Rewrite the code for better user-configurable values and enhance robustness for production."
      ]
    },
    {
      id: 2,
      title: "PromptMenu",
      category: "Digital Menu Platform",
      description: "An AI-powered platform for restaurants that creates interactive, multimedia-rich digital menus.",
      technologies: ["Next.js", "Azure AI", "React", "MongoDB", "TypeScript", "Material UI", "Tailwind CSS", "Azure Functions", "Azure Cognitive Services"],
      status: "Live",
      inspiration: "Inspired by the Four Seasons restaurant concept and BestEverFoodReviewShow, combining practical ordering and engaging content like preparation videos, chef introductions, and customer reviews.",
      whatWeBuilt: [
        "Developed using Next.js and TypeScript for a modular, responsive interface.",
        "Leveraged Azure Cognitive Services for receipt processing and image analysis.",
        "Created a system for menu image analysis to identify ingredients and provide nutritional information.",
        "Built an interactive Q&A assistant that can answer customer questions about menu items.",
        "Implemented digital menu management with QR code access and multilingual support."
      ],
      challenges: [
        "Limited time to deploy a fully functioning MVP."
      ],
      accomplishments: [
        "Developed core functionalities for user registration and login.",
        "Created a demo version with preview for three core functionalities at promptmenu.xyz"
      ],
      insights: [
        "Azure services are easy to utilize and cost-effective."
      ],
      nextSteps: [
        "Continue expanding functionalities and potentially transition into a full product."
      ]
    },
    {
      id: 3,
      title: "Imperium",
      category: "Blockchain",
      description: "A platform that empowers members with voting rights to fund projects within the cryptocurrency ecosystem.",
      technologies: ["Flask", "Python", "Bitcoinlib", "Solidity"],
      status: "Developing",
      inspiration: "Combining DeFi and DAO concepts to create a democratic investment platform where every member has an equal say in the decision-making process.",
      whatWeBuilt: [
        "Developed with Flask and Python, focusing on voting and funding mechanisms.",
        "Created a DAO model where voting power is determined by contribution amount.",
        "Built a system for projects to present proposals to the community for funding."
      ],
      challenges: [
        "Encountered hosting issues with smart contracts when deployed on Heroku."
      ],
      accomplishments: [
        "Enabled account creation and wallet assignment functionality.",
        "Successfully implemented voting functionality on the platform.",
        "Selected into the BTC Startup lab incubator project after entering Bitcoin Olympics Hackathon."
      ],
      insights: [
        "Learned about Bitcoin's potential to decentralize power and change the world."
      ],
      nextSteps: [
        "Further development to enhance user experience and features."
      ]
    },
    {
      id: 4,
      title: "Multi Roles Vendor",
      category: "WordPress Plugin",
      description: "A User Role assignment plugin for WooCommerce Multivendor Sites that automates vendor role assignment during registration.",
      technologies: ["WordPress", "WooCommerce", "PHP"],
      status: "Released",
      inspiration: "Simplifying user role management for multivendor marketplaces.",
      whatWeBuilt: [
        "Created a plugin that automatically assigns vendor roles upon user registration.",
        "Added support for multiple marketplace platforms including WCMP, WCFM, and Dokan."
      ],
      challenges: [
        "Ensuring compatibility with multiple marketplace plugins."
      ],
      accomplishments: [
        "Successfully released version 1.1.0 with full support for major marketplace platforms."
      ],
      insights: [
        "Discovered the need for streamlined user role management in ecommerce platforms."
      ],
      nextSteps: [
        "Update for compatibility with newer WordPress versions and expand feature set."
      ]
    },
    {
      id: 5,
      title: "Morabaraba Duel",
      category: "Game Development",
      description: "A modern version of Morabaraba, allowing users to play this classic game with new features.",
      technologies: ["JavaScript", "Wix Velo", "Wix Data API", "Wix Members"],
      status: "Live",
      inspiration: "Bringing a traditional game from childhood to the present day with modern features.",
      whatWeBuilt: [
        "Developed using Wix Velo with Rich UI features.",
        "Integrated Wix Data API and Wix Members for game functionality."
      ],
      challenges: [
        "Dealing with JavaScript restrictions during development required improvisation."
      ],
      accomplishments: [
        "Built an engaging game that resonates with users familiar with Morabaraba.",
        "Successfully entered into Wix DevCon Hackathon 2022."
      ],
      insights: [
        "Learned about the flexibility and versatility of Wix Velo in game development."
      ],
      nextSteps: [
        "Improve the game and potentially create an exciting mobile version."
      ]
    }
  ];

  const handleProjectSelect = (project: any) => {
    setSelectedProject(project);
    // Add a small delay to allow for transition effects
    setTimeout(() => setShowDetails(true), 300);
  };

  const handleBackToGrid = () => {
    setShowDetails(false);
    setTimeout(() => setSelectedProject(null), 500);
  };

  // Background effects: animated grid and particles
  const GridBackground = () => {
    return (
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-2">
          {Array.from({ length: 144 }).map((_, i) => (
            <motion.div
              key={i}
              className="bg-blue-500"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                delay: i % 7 * 0.2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  const FlyingParticles = () => {
    const particles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 10,
    }));

    return (
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-blue-400"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.6,
            }}
            animate={{
              x: [0, Math.random() * 300 - 150],
              y: [0, Math.random() * 300 - 150],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );
  };

  // Initial loading animation
  if (!initialLoadComplete) {
    return (
      <div className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
        <GridBackground />
        <FlyingParticles />
        <motion.div
          className="text-blue-400 text-2xl font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          INITIALIZING PROJECT DATABASE...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      <GridBackground />
      <FlyingParticles />
      
      {/* Main content container */}
      <div className="w-full max-w-6xl p-8 z-10 relative">
        {/* Header with holographic effect */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-blue-400 text-4xl font-bold tracking-wider inline-block relative">
            PROJECT NEXUS
            <div className="absolute inset-0 bg-blue-500 blur-sm opacity-30"></div>
          </h1>
          <div className="text-gray-400 text-sm mt-2 font-mono">// COMMAND INTERFACE ACTIVE</div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!selectedProject ? (
            /* Projects Grid */
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {projectsData.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="border-2 border-blue-500 bg-black bg-opacity-60 rounded-lg overflow-hidden cursor-pointer hover:border-blue-300 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => handleProjectSelect(project)}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="p-5 relative">
                    {/* Status indicator */}
                    <div className="absolute top-3 right-3 flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        project.status === "Operational" ? "bg-green-500" :
                        project.status === "Deployed" ? "bg-green-400" :
                        project.status === "In Development" ? "bg-yellow-500" :
                        project.status === "Beta Testing" ? "bg-purple-500" : "bg-blue-500"
                      }`}></div>
                      <span className="text-xs text-gray-400 font-mono">{project.status}</span>
                    </div>
                    
                    {/* Category label */}
                    <div className="mb-3 text-xs text-blue-400 font-mono">{project.category}</div>
                    
                    {/* Project title */}
                    <h2 className="text-white text-xl font-bold mb-4">{project.title}</h2>
                    
                    {/* Technologies list */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-blue-900 bg-opacity-40 text-blue-300 text-xs rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* Interactive elements */}
                    <div className="mt-6 pt-4 border-t border-blue-800 flex justify-between items-center">
                      <div className="text-blue-400 text-sm">Access Details</div>
                      <div className="flex space-x-2">
                        {[1, 2, 3].map((dot) => (
                          <motion.div
                            key={dot}
                            className="w-2 h-2 bg-blue-500 rounded-full"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{
                              duration: 1.5,
                              delay: dot * 0.2,
                              repeat: Infinity,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Project Details View */
            <motion.div
              className="bg-black bg-opacity-80 border-2 border-blue-600 rounded-lg p-6 max-w-3xl mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-blue-400 text-sm font-mono mb-2">{selectedProject.category}</div>
                  <h2 className="text-white text-3xl font-bold">{selectedProject.title}</h2>
                </div>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${
                    selectedProject.status === "Operational" ? "bg-green-500" :
                    selectedProject.status === "Deployed" ? "bg-green-400" :
                    selectedProject.status === "In Development" ? "bg-yellow-500" :
                    selectedProject.status === "Beta Testing" ? "bg-purple-500" : "bg-blue-500"
                  }`}></div>
                  <span className="text-sm text-gray-300 font-mono">{selectedProject.status}</span>
                </div>
              </div>

              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="mb-6">
                      <div className="text-gray-200 leading-relaxed">
                        {selectedProject.description}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-blue-400 text-sm font-mono mb-3">TECHNOLOGIES</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech: any, i: any) => (
                          <motion.span
                            key={i}
                            className="px-3 py-1 bg-blue-900 bg-opacity-40 text-blue-300 rounded"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="border border-blue-800 rounded p-3">
                        <div className="text-blue-400 text-xs font-mono mb-1">PROJECT ID</div>
                        <div className="text-white font-mono">PRJCT-{selectedProject.id.toString().padStart(4, '0')}</div>
                      </div>
                      <div className="border border-blue-800 rounded p-3">
                        <div className="text-blue-400 text-xs font-mono mb-1">STATUS CODE</div>
                        <div className="text-white font-mono">
                          {selectedProject.status === "Operational" ? "GREEN" :
                          selectedProject.status === "Deployed" ? "BLUE" :
                          selectedProject.status === "In Development" ? "AMBER" :
                          selectedProject.status === "Beta Testing" ? "PURPLE" : "WHITE"}
                        </div>
                      </div>
                    </div>

                    {/* Interactive terminal-like section */}
                    <div className="bg-black bg-opacity-80 border border-blue-900 rounded p-3 font-mono text-sm text-green-400 mb-6">
                      <div>{">"} Accessing project data...</div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                      >
                        {">"} All systems nominal
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.3 }}
                      >
                        {">"} Ready for deployment
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-between pt-4 border-t border-blue-800">
                <motion.button
                  className="px-4 py-2 bg-blue-900 bg-opacity-40 text-blue-300 rounded flex items-center hover:bg-blue-800 transition-colors"
                  onClick={handleBackToGrid}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="mr-2">◀</span> Return to Grid
                </motion.button>
                <motion.button
                  className="px-4 py-2 bg-blue-600 bg-opacity-60 text-white rounded flex items-center hover:bg-blue-500 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Launch Project <span className="ml-2">▶</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Projects;