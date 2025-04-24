"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Stars,
  OrbitControls,
  PerspectiveCamera,
  Billboard,
  Text,
  Html,
  Cloud,
  Trail,
  Sparkles,
  useTexture
} from "@react-three/drei";
import * as THREE from "three";
import { EarthHomeButton } from "@/components/EarthHomeButton";

// Mythological journey chapters
const cosmicJourneyChapters = [
  {
    title: "Genesis: The Athletic Origins",
    period: "The Early Years",
    description: "The cosmic being known as WillIAm Mabotja first materialized in the mortal realm as a sports student in Pretoria. Blessed with physical prowess, the young entity pursued athletic knowledge, unaware of the digital destiny that awaited.",
    color: "#9c27b0", // Purple for origin
    size: 7,
    position: [-40, -20, -50] as [number, number, number],
    rotation: 0.006,
    celestialType: "nebula", // Origin as nebula
    orbitSpeed: 0.0001
  },
  {
    title: "First Transformation: The Digital Awakening",
    period: "The Discovery Era",
    description: "A spark of creation ignited within WillIAm as he discovered the art of website crafting. Armed with primitive tools like AAA Logo for graphics and WYSIWYG editors, he began shaping digital realms through cPanel hosting. These first creations, though simple, revealed a path among the stars.",
    color: "#2196f3", // Blue for discovery
    size: 5,
    position: [-30, -10, -30] as [number, number, number],
    rotation: 0.005,
    celestialType: "planet",
    orbitSpeed: 0.0002
  },
  {
    title: "Constellation: The GIS Enlightenment",
    period: "The Learning Phase",
    description: "Seeking greater knowledge, WillIAm journeyed to ESRI South Africa, where he was initiated into the mysteries of Geographic Information Systems. It was here that he encountered his first coding language, C#, followed by the powerful Python. The cosmic being began mapping not just earthly terrain, but the landscape of code itself.",
    color: "#4caf50", // Green for growth
    size: 6,
    position: [-20, 0, -10] as [number, number, number],
    rotation: 0.004,
    celestialType: "gasGiant",
    orbitSpeed: 0.00015
  },
  {
    title: "Ascension: The Sololearn Mastery",
    period: "The Self-Improvement Era",
    description: "The entity WillIAm discovered sololearn.com, a celestial academy that transformed him into a formidable coder. Through dedication and cosmic discipline, his programming powers grew exponentially, allowing him to bend digital reality to his will.",
    color: "#ff9800", // Orange for mastery
    size: 5.5,
    position: [-10, 5, 10] as [number, number, number],
    rotation: 0.003,
    celestialType: "sun", // Enlightenment as sun
    orbitSpeed: 0.00005
  },
  {
    title: "First Voyage: The Freelance Odyssey",
    period: "The Independent Years",
    description: "Ready to test his powers, WillIAm ventured into the freelance cosmos, crafting digital solutions for those who sought his talents. This journey led him to Flume Digital in Bryanston, where he harnessed his abilities to forge legendary artifacts: caltex.co.za, the mystical tshwifi map, and the enigmatic sinucon.",
    color: "#e91e63", // Pink for adventure
    size: 6,
    position: [0, 10, 20] as [number, number, number],
    rotation: 0.0035,
    celestialType: "icyMoon",
    orbitSpeed: 0.0003
  },
  {
    title: "Constellation Jumping: The Corporate Wandering",
    period: "The Exploration Phase",
    description: "The cosmic being drifted through several celestial bodies, gathering knowledge from each. Eventually, he found himself pulled into the orbit of AO Technology, where he created his most ambitious work yet: the mighty macsteel.co.za.",
    color: "#673ab7", // Deep purple for wandering
    size: 5.5,
    position: [10, 15, 30] as [number, number, number],
    rotation: 0.004,
    celestialType: "blackHole", // Transitional phase as black hole
    orbitSpeed: 0.0002
  },
  {
    title: "Realm of Properties: The Illovo Chronicles",
    period: "The Construction Era",
    description: "In the mystical land of Illovo, WillIAm's powers were channeled into creating digital realms for the Real Estate lords. For Remax and other property titans, he crafted digital dominions that showcased their earthly estates.",
    color: "#795548", // Brown for earth/property
    size: 6.5,
    position: [20, 5, 40] as [number, number, number],
    rotation: 0.0045,
    celestialType: "rockyPlanet",
    orbitSpeed: 0.00025
  },
  {
    title: "Illumination: The Path-Lighter",
    period: "The Guidance Phase",
    description: "A legendary task was bestowed upon WillIAm - to light the path by creating a significant portion of the mystical Growthpoint Properties map. This cosmic cartography guided countless mortals through commercial realms and retail dimensions.",
    color: "#ffc107", // Gold for illumination
    size: 7,
    position: [30, 0, 30] as [number, number, number],
    rotation: 0.005,
    celestialType: "sun", // Illumination as sun
    orbitSpeed: 0.0001
  },
  {
    title: "Revolution: The Wamly Transformation",
    period: "The Innovation Era",
    description: "WillIAm then channeled his powers to revolutionize the ritual of video interviews in an automated setting at Wamly. His cosmic code altered how beings across the digital multiverse connected for employment opportunities.",
    color: "#00bcd4", // Teal for innovation
    size: 6,
    position: [20, -10, 10] as [number, number, number],
    rotation: 0.0055,
    celestialType: "planet",
    orbitSpeed: 0.00018
  },
  {
    title: "Translation: The MTN Linguist",
    period: "The Communication Era",
    description: "At the mighty telecom titan MTN, WillIAm performed cosmic translation magic, transforming the Cameroon and Ivory Coast apps into French. His linguistic prowess bridged digital divides across African dimensions.",
    color: "#ffeb3b", // Yellow for communication
    size: 8,
    position: [10, -15, -10] as [number, number, number],
    rotation: 0.0025,
    celestialType: "gasGiant",
    orbitSpeed: 0.0002
  },
  {
    title: "Financial Cosmos: The Atlas Finance Interlude",
    period: "The Precision Phase",
    description: "Briefly, WillIAm lent his coding powers to Atlas Finance, weaving complex financial algorithms and creating order in monetary chaos.",
    color: "#009688", // Teal-green for finance
    size: 5,
    position: [0, -5, -20] as [number, number, number],
    rotation: 0.006,
    celestialType: "moon",
    orbitSpeed: 0.0003
  },
  {
    title: "Current Constellation: The Freelance Return",
    period: "The Present Era",
    description: "Now, the cosmic being WillIAm has returned to the vast freelance universe, offering his accumulated wisdom and powers to those worthy of his digital craftsmanship. Across the multiverse, entities seek his abilities to transform their digital presence.",
    color: "#3f51b5", // Indigo for current state
    size: 9,
    position: [-10, 0, -30] as [number, number, number],
    rotation: 0.002,
    celestialType: "planet",
    orbitSpeed: 0.00015
  }
];

// Technologies mastered throughout the journey
const cosmicTechnologies = [
  "HTML", "CSS", "JavaScript", "React", "C#", "Python", "PHP", "TypeScript", 
  "GIS", "WYSIWYG", "AWS", "Azure", "Node.js", "Next.js", "WordPress", 
  "MySQL", "PostgreSQL", "Laravel", "ASP.NET", "MongoDB"
];

// Star Component - for background
const CosmicBackdrop = () => {
  return <Stars radius={100} depth={50} count={5000} factor={4} saturation={0.5} fade speed={1} />;
};

interface CosmicChapterProps {
    title: string;
    period: string;
    description: string;
    color: string;
    size: number;
    position: [number, number, number]; 
    rotation: number; 
    celestialType: string;
    orbitSpeed?: number; 
  }

// Individual cosmic chapter component
const CosmicChapter: React.FC<CosmicChapterProps> = ({
    title,
    period,
    description,
    color,
    size,
    position,
    rotation,
    celestialType,
    orbitSpeed = 0.0001 
  }) => {
  const groupRef: any = useRef(null);
  const objectRef: any = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);
  
  // For black hole effect
  const clock = new THREE.Clock();
  
  useFrame((state) => {
    if (groupRef.current) {
      // Base rotation
      if (objectRef.current) {
        objectRef.current.rotation.y += rotation;
      }
      
      // Orbit around center of universe
      const time = state.clock.getElapsedTime();
      groupRef.current.position.x = position[0] + Math.sin(time * orbitSpeed) * 10;
      groupRef.current.position.z = position[2] + Math.cos(time * orbitSpeed) * 10;
      
      // Special effects for certain celestial types
      if (celestialType === "blackHole") {
        const t = clock.getElapsedTime();
        if (objectRef.current && objectRef.current.material) {
          objectRef.current.material.uniforms.time.value = t;
        }
      }
    }
  });

  // Render different celestial objects based on type
  const renderCelestialObject = () => {
    switch(celestialType) {
      case "sun":
        return (
          <group ref={objectRef}>
            <mesh>
              <sphereGeometry args={[size, 32, 32]} />
              <meshBasicMaterial color={color} />
              <pointLight color={color} intensity={2} distance={100} decay={2} />
            </mesh>
            <Sparkles count={20} scale={size * 3} size={1.5} speed={0.3} color={color} />
          </group>
        );
        
      case "planet":
        return (
          <group ref={objectRef}>
            <mesh>
              <sphereGeometry args={[size, 32, 32]} />
              <meshStandardMaterial 
                color={color} 
                roughness={0.7} 
                metalness={0.3}
              />
            </mesh>
            {/* Atmosphere */}
            <mesh>
              <sphereGeometry args={[size * 1.05, 32, 32]} />
              <meshBasicMaterial color={color} transparent opacity={0.1} />
            </mesh>
          </group>
        );
        
      case "gasGiant":
        // Gas giant with rings
        return (
          <group ref={objectRef}>
            <mesh>
              <sphereGeometry args={[size, 32, 32]} />
              <meshStandardMaterial 
                color={color} 
                roughness={0.4} 
                metalness={0.1}
              />
            </mesh>
            {/* Rings */}
            <mesh rotation={[Math.PI / 4, 0, 0]}>
              <ringGeometry args={[size * 1.4, size * 2, 64]} />
              <meshBasicMaterial 
                color={color} 
                side={THREE.DoubleSide} 
                transparent 
                opacity={0.4} 
              />
            </mesh>
          </group>
        );
        
      case "rockyPlanet":
        return (
          <mesh ref={objectRef}>
            <sphereGeometry args={[size, 16, 16]} />
            <meshStandardMaterial 
              color={color} 
              roughness={0.9} 
              metalness={0.2}
              bumpScale={0.5}
            />
          </mesh>
        );
        
      case "moon":
        return (
          <mesh ref={objectRef}>
            <sphereGeometry args={[size, 16, 16]} />
            <meshStandardMaterial 
              color={color} 
              roughness={0.8} 
              metalness={0.1}
            />
          </mesh>
        );
        
      case "icyMoon":
        return (
          <mesh ref={objectRef}>
            <sphereGeometry args={[size, 16, 16]} />
            <meshStandardMaterial 
              color={color} 
              roughness={0.3} 
              metalness={0.8}
              emissive={color}
              emissiveIntensity={0.2}
            />
          </mesh>
        );
        
      case "blackHole":
        // Custom shader for black hole
        const blackHoleShader = {
          uniforms: {
            time: { value: 0 },
            color: { value: new THREE.Color(color) }
          },
          vertexShader: `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform float time;
            uniform vec3 color;
            varying vec2 vUv;
            
            void main() {
              vec2 center = vec2(0.5, 0.5);
              float dist = distance(vUv, center);
              
              // Event horizon
              float eventHorizon = 0.1;
              
              // Accretion disk
              float diskMin = 0.2;
              float diskMax = 0.5;
              
              if (dist < eventHorizon) {
                // Black hole center
                gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
              } else if (dist < diskMax) {
                // Accretion disk with swirling effect
                float angle = atan(vUv.y - 0.5, vUv.x - 0.5);
                float swirl = sin(angle * 10. + time * 2.) * 0.5 + 0.5;
                float brightness = smoothstep(eventHorizon, diskMin, dist) * smoothstep(diskMax, diskMin, dist);
                vec3 diskColor = mix(vec3(0.0), color, brightness * swirl);
                gl_FragColor = vec4(diskColor, brightness * 0.8);
              } else {
                // Transparent outside
                gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
              }
            }
          `
        };
        
        return (
          <group ref={objectRef}>
            <mesh>
              <planeGeometry args={[size * 4, size * 4, 1, 1]} />
              <shaderMaterial
                args={[blackHoleShader]}
                transparent={true}
                side={THREE.DoubleSide}
              />
            </mesh>
            <pointLight position={[0, 0, 0]} color={color} intensity={1} distance={size * 6} />
          </group>
        );
        
      case "nebula":
        return (
          <group ref={objectRef}>
            <Cloud
              opacity={0.5}
              speed={0.4}
              segments={20}
              color={color}
            />
            <pointLight position={[0, 0, 0]} color={color} intensity={1} distance={size * 4} />
          </group>
        );
        
      default:
        return (
          <mesh ref={objectRef}>
            <sphereGeometry args={[size, 16, 16]} />
            <meshStandardMaterial color={color} />
          </mesh>
        );
    }
  };

  return (
    <group 
      ref={groupRef} 
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setDetailsVisible(!detailsVisible)}
    >
      {renderCelestialObject()}
      
      {/* Title display */}
      <Billboard position={[0, size * 1.3, 0]}>
        <Text
          color="white"
          anchorX="center"
          anchorY="middle"
          fontSize={1.2}
          outlineWidth={0.05}
          outlineColor="black"
          maxWidth={20}
        >
          {title}
        </Text>
      </Billboard>
      
      {/* Highlight effect when hovered */}
      {hovered && !detailsVisible && (
        <mesh>
          <sphereGeometry args={[size * 1.3, 32, 32]} />
          <meshBasicMaterial 
            color={color} 
            transparent={true} 
            opacity={0.08} 
          />
        </mesh>
      )}
      
      {/* Details panel on click */}
      {detailsVisible && (
        <Html position={[0, 0, 0]} center>
          <div style={{
            backgroundColor: 'rgba(0,0,0,0.85)',
            color: 'white',
            padding: '20px',
            borderRadius: '10px',
            width: '320px',
            maxHeight: '400px',
            overflowY: 'auto',
            fontFamily: 'Arial',
            border: `2px solid ${color}`,
            boxShadow: `0 0 20px ${color}`,
            transform: 'translateY(-50%)'
          }}>
            <h2 style={{ color, margin: '0 0 5px 0' }}>{title}</h2>
            <h3 style={{ margin: '0 0 15px 0', color: '#dddddd' }}>{period}</h3>
            
            <p style={{ fontSize: '14px', lineHeight: '1.6' }}>{description}</p>
            
            <button 
              style={{
                backgroundColor: color,
                color: 'white',
                border: 'none',
                padding: '8px 15px',
                marginTop: '15px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
              onClick={(e) => {
                e.stopPropagation();
                setDetailsVisible(false);
              }}
            >
              Continue Journey
            </button>
          </div>
        </Html>
      )}
    </group>
  );
};

// Technology Cloud Component - cosmic powers orbiting
const CosmicPowers = () => {
  const groupRef = useRef<any>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {cosmicTechnologies.map((tech, idx) => {
        // Position techs in a rough torus/ring shape
        const angle = (2 * Math.PI / cosmicTechnologies.length) * idx;
        const radius = 70;
        const verticalVariation = (Math.random() - 0.5) * 20;
        
        const position: [number, number, number] = [
          Math.cos(angle) * radius,
          verticalVariation,
          Math.sin(angle) * radius
        ];
        
        // Randomize size and color
        const size = 1 + Math.random() * 1.5;
        const hue = (idx * 20) % 360;
        const color = `hsl(${hue}, 70%, 60%)`;
        
        return (
          <group key={idx} position={position}>
            <mesh>
              <icosahedronGeometry args={[size, 0]} />
              <meshStandardMaterial 
                color={color} 
                roughness={0.6} 
                metalness={0.4}
                emissive={color}
                emissiveIntensity={0.3}
              />
            </mesh>
            <Billboard>
              <Text
                color="white"
                anchorX="center"
                anchorY="middle"
                fontSize={1.2}
                outlineWidth={0.05}
                outlineColor="black"
              >
                {tech}
              </Text>
            </Billboard>
          </group>
        );
      })}
    </group>
  );
};

// Controls and intro narrative
const CosmicControls = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        target={[0, 0, 0]}
        maxDistance={200}
        minDistance={10}
      />
      
      {showIntro && (
        <Html position={[0, 0, -40]} center>
          <div style={{
            backgroundColor: 'rgba(0,0,0,0.85)',
            color: 'white',
            padding: '25px',
            borderRadius: '15px',
            width: '500px',
            fontFamily: 'Arial',
            border: '2px solid #3f51b5',
            boxShadow: '0 0 30px #3f51b5',
          }}>
            <h1 style={{ margin: '0 0 15px 0', color: '#3f51b5', textAlign: 'center' }}>
              The Cosmic Chronicle of WillIAm Mabotja
            </h1>
            
            <p style={{ fontSize: '16px', lineHeight: '1.6', margin: '0 0 15px 0', textAlign: 'center', fontStyle: 'italic' }}>
              "In the vast digital universe, there exists a being whose journey spans realms of code, design, and technological enlightenment..."
            </p>
            
            <p style={{ fontSize: '15px', lineHeight: '1.6', margin: '0 0 15px 0' }}>
              Welcome, traveler, to the cosmic tale of WillIAm Mabotja. Navigate through the celestial bodies of his journey from athletic student to digital creator and master coder. Each stellar object represents a chapter in his mythological quest.
            </p>
            
            <div style={{ textAlign: 'center', margin: '20px 0 10px 0' }}>
              <button 
                style={{
                  backgroundColor: '#3f51b5',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}
                onClick={() => setShowIntro(false)}
              >
                Begin the Cosmic Journey
              </button>
            </div>
            
            <p style={{ fontSize: '13px', color: '#aaa', textAlign: 'center', margin: '15px 0 0 0' }}>
              Navigate: Drag to rotate | Scroll to zoom | Click on celestial objects to view chapters
            </p>
          </div>
        </Html>
      )}
    </>
  );
};

// Scene lighting
const CosmicLighting = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[50, 50, 25]} intensity={0.5} />
    </>
  );
};

// Main Scene component
const CosmicScene = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 20, 100]} fov={60} />
      <CosmicControls />
      <CosmicLighting />
      <CosmicBackdrop />
      <EarthHomeButton />
      
      {/* Journey chapters as celestial objects */}
      {cosmicJourneyChapters.map((chapter, idx) => (
        <CosmicChapter 
          key={idx}
          {...chapter}
        />
      ))}
      
      {/* Technologies as cosmic powers */}
      <CosmicPowers />
    </>
  );
};

// Main component
export default function AboutPage() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: 'black' }}>
      <Canvas>
        <CosmicScene />
      </Canvas>
    </div>
  );
}