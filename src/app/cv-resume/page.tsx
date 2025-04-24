"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import {
  Stars,
  OrbitControls,
  PerspectiveCamera,
  Billboard,
  Text,
  Html,
  Sky,
  Cloud,
  Trail,
  Sparkles,
  useTexture
} from "@react-three/drei";
import * as THREE from "three";
import { useRouter } from "next/navigation";

// Earth Home Button Component
const EarthHomeButton = () => {
  const router = useRouter();
  const earthRef: any = useRef(null);
  const [hovered, setHovered] = useState(false);
  
  // Load earth texture
  const earthTexture = useTexture("/earth-texture.jpeg");
  
  // Rotate the earth
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.003;
    }
  });
  
  return (
    <Html position={[-80, 45, 0]} center>
      <div style={{
        position: 'relative',
        width: '70px',
        height: '70px',
        cursor: 'pointer',
        transform: hovered ? 'scale(1.1)' : 'scale(1)',
        transition: 'transform 0.3s ease',
      }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => router.push("/")}
      >
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        >
          <Canvas>
            <ambientLight intensity={0.8} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <mesh ref={earthRef}>
              <sphereGeometry args={[1.5, 32, 32]} />
              <meshStandardMaterial 
                map={earthTexture} 
                roughness={0.7} 
                metalness={0.3}
              />
              {/* Atmosphere glow */}
              {hovered && (
                <mesh>
                  <sphereGeometry args={[1.6, 32, 32]} />
                  <meshBasicMaterial color="##60a5fa" transparent opacity={0.2} />
                </mesh>
              )}
            </mesh>
          </Canvas>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '-25px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            fontSize: '14px',
            whiteSpace: 'nowrap',
            fontWeight: 'bold',
            textShadow: '0 0 5px black',
          }}
        >
          Home
        </div>
      </div>
    </Html>
  );
};

// Professional experience data from CV
const experiences = [
  {
    company: "Atlas Finance",
    location: "Rosebank",
    role: "C# Developer",
    period: "September 2024 - Present",
    description: "Working as a C# Developer on the Atlas Finance Automation process to integrate MoEngage API with internal Atlas Finance systems.",
    technologies: ["C#", ".NET Framework", "Visual Studio", "Github", "Azure DevOps", "Atlas DB", "PostgreSQL", "Git", "Quartz.NET"],
    color: "#1976d2",
    size: 8,
    position: [0, 0, -40] as [number, number, number],
    rotation: 0.004,
    celestialType: "planet", // Latest job is a blue planet
    orbitSpeed: 0.0001
  },
  {
    company: "iOCO AppDev (EOH)",
    location: "Midrand",
    role: "React Native Developer",
    period: "April 2023 - August 2024",
    description: "Working as a React Developer for iOCO AppDev on the main client project, MyMTN NextGen Mobile App and the internal application MTN Experience Manager.",
    technologies: ["React.js", "React Native", "Typescript", "Github", "Azure Portal", "Azure DevOps", "Azure AI Services", "Azure AI Custom Vision", "Azure OpenAI Service/GenAI", "Next.js", "TailwindCSS"],
    color: "#ffc107",
    size: 12,
    position: [35, 10, 20] as [number, number, number],
    rotation: 0.003,
    celestialType: "sun", // Key experience is a sun
    orbitSpeed: 0.00005
  },
  {
    company: "Wamly",
    location: "Rivonia, Gauteng",
    role: "React Developer",
    period: "May 2022 - December 2022",
    description: "Working on the Wamly Product, implementing Customer Onboarding, Customer Management, and features into the main Product.",
    technologies: ["React.js", "Javascript", "Material UI", "Java", "Spring Boot MVC", "Python", "AWS", "AWS Python Lambda Scripting", "Node.js"],
    color: "#9c27b0",
    size: 7,
    position: [-20, 5, 25] as [number, number, number],
    rotation: 0.006,
    celestialType: "gasGiant", // Gas giant planet
    orbitSpeed: 0.0002
  },
  {
    company: "Digitlab",
    location: "Umhlanga, KZN",
    role: "Freelance Developer",
    period: "March 2022 - May 2022",
    description: "Working on Client Projects, implementing Solutions for Clients, Working on Growthpoint Properties, Working with WooCommerce.",
    technologies: ["PHP", "Javascript", "Wordpress", "SQL", "Flutter", "React Native", "MySQL", "Laravel", "LeafletJS"],
    color: "#4caf50",
    size: 5,
    position: [-15, -8, -20] as [number, number, number],
    rotation: 0.005,
    celestialType: "rockyPlanet", // Small rocky planet
    orbitSpeed: 0.0003
  },
  {
    company: "Empire Partner Foundation",
    location: "Illovo, JHB",
    role: "Tech Lead",
    period: "November 2021 - February 2021",
    description: "Working on Client Projects, Working on In-House Projects, Planning Development Team Activities, Training Juniors and Interns, Writing Proposals & Quotations for Clients.",
    technologies: ["PHP", "Javascript", "Fat Free Framework", "Cordova", "React.js", "Flutter", "React Native", "Typescript", "Python", "ASP.NET MVC", "C#", "Django", "Google Cloud Platform"],
    color: "#ff5722",
    size: 6.5,
    position: [20, -15, -25] as [number, number, number],
    rotation: 0.0035,
    celestialType: "blackHole", // Leadership role as a black hole
    orbitSpeed: 0.00015
  },
  {
    company: "AO Tech Group",
    location: "Centurion, Pretoria",
    role: "Software Engineer",
    period: "June 2021 - August 2021",
    description: "Working on Client Projects using React, Ionic, Wordpress and WooCommerce. Working on an Online Shoe marketplace, Working on Geo Directories.",
    technologies: ["Ionic Framework", "React.js", "PHP", "Wordpress", "Typescript", "C#", "ASP.NET Core"],
    color: "#673ab7",
    size: 4.5,
    position: [-25, 8, 0] as [number, number, number],
    rotation: 0.0045,
    celestialType: "moon", // Small moon
    orbitSpeed: 0.0004
  },
  {
    company: "Mobify Tracker",
    location: "Midrand, Gauteng",
    role: "Software Developer",
    period: "March 2021 - April 2021",
    description: "Training on Various Technologies, Working on the Product including Payments, Customer Management, and Client onboarding.",
    technologies: ["PHP", "Google Cloud Platform", "PostgreSQL", "C#", "Umbraco"],
    color: "#2196f3",
    size: 3.5,
    position: [15, -5, 30] as [number, number, number],
    rotation: 0.005,
    celestialType: "asteroid", // Small asteroid
    orbitSpeed: 0.0006
  },
  {
    company: "Flash Forward Productions",
    location: "Sandton, JHB",
    role: "PHP Developer",
    period: "February 2021 - February 2021",
    description: "Working on an online platform using Laravel and PHP in a team of 3 developers and 1 Database Administrator/Application Manager.",
    technologies: ["PHP", "Laravel", "Bootstrap", "Vue.js", "SQL", "Docker", "AWS"],
    color: "#795548",
    size: 3,
    position: [-5, 20, -15] as [number, number, number],
    rotation: 0.007,
    celestialType: "comet", // Brief role as comet
    orbitSpeed: 0.001
  },
  {
    company: "Flume Marketing & PR",
    location: "Bryanston, JHB",
    role: "Web Developer",
    period: "August 2020 - October 2020",
    description: "Working on Web Applications for new and existing clients. Creating stitch.coza online Store using Shopify, Working on Client onboarding for Flume.",
    technologies: ["C# .NET", "React.js", "React Native", "PHP", "Wordpress", "Azure DevOps", "ASP.NET Core", "Laravel", "Shopify", "Scss"],
    color: "#e91e63",
    size: 5,
    position: [10, 10, 30] as [number, number, number],
    rotation: 0.004,
    celestialType: "icyMoon", // Icy moon
    orbitSpeed: 0.0003
  },
  {
    company: "Self-Employed",
    location: "Johannesburg",
    role: "Freelance Web Developer",
    period: "March 2015 - September 2018",
    description: "Creating websites for small businesses and individuals using Wordpress and other CMS platforms. Working on Booking and Payment solutions for clients. Won Afristay.com award for client website.",
    technologies: ["PHP", "Wordpress", "jQuery", "Joomla", "C#", "Umbraco", "React Native", "Ionic Framework", "WPF", "ASP.NET MVC", "WinForms"],
    color: "#009688",
    size: 9,
    position: [-30, -10, -30] as [number, number, number],
    rotation: 0.0025,
    celestialType: "nebula", // Early career as nebula
    orbitSpeed: 0.00008
  }
];

// Certifications as special celestial objects
const certifications = [
  {
    name: "Microsoft Azure Developer Associate",
    date: "March 2022",
    description: "Developing Microsoft Azure Solutions",
    color: "#00a1f1",
    size: 3,
    position: [50, 5, -15] as [number, number, number],
    celestialType: "star",
    brightness: 2
  },
  {
    name: "Microsoft Azure AI Fundamentals",
    date: "September 2023",
    description: "Azure AI Fundamentals",
    color: "#00a1f1",
    size: 2.5,
    position: [45, 10, -20] as [number, number, number],
    celestialType: "star",
    brightness: 1.5
  },
  {
    name: "Microsoft Azure AI Engineer Associate",
    date: "November 2023",
    description: "Developing Microsoft Azure AI Solutions",
    color: "#00a1f1",
    size: 3.2,
    position: [55, 8, -10] as [number, number, number],
    celestialType: "star",
    brightness: 2.2
  },
  {
    name: "Microsoft Azure Data Scientist Associate",
    date: "December 2023",
    description: "Developing Microsoft Azure Data Solutions",
    color: "#00a1f1",
    size: 3.5,
    position: [60, 3, -5] as [number, number, number],
    celestialType: "star",
    brightness: 2.5
  },
  {
    name: "Microsoft Azure Administrator Associate",
    date: "March 2024",
    description: "Developing Microsoft Azure Data Solutions",
    color: "#00a1f1",
    size: 3,
    position: [48, 0, -18] as [number, number, number],
    celestialType: "star",
    brightness: 2
  }
];

// Education as wormholes
const education = [
  {
    institution: "Mmametlhake Secondary",
    location: "Mmametlhake",
    degree: "N. Matric",
    period: "January 2003 - November 2005",
    subjects: ["Physical Science", "Maths", "Biology", "English", "Afrikaans", "Setswana"],
    achievements: "Provincial Colors (Track & Field)",
    color: "#795548",
    size: 5,
    position: [-40, -20, -60] as [number, number, number],
    celestialType: "wormhole"
  },
  {
    institution: "Esri South Africa",
    location: "Midrand",
    degree: "N. Dip in GIS",
    period: "February 2019 - November 2019",
    description: "National Diploma in Geographic Information Sciences, with a focus on Esri ArcGIS Suite & Microsoft SQL Server",
    color: "#9c27b0",
    size: 6,
    position: [-50, -15, -40] as [number, number, number],
    celestialType: "wormhole"
  }
];

// Skills array
const skills = [
  "HTML", "Javascript", "CSS", "SASS", "Wordpress", ".Net", "Umbraco", "ASP.NET core",
  "PHP", "Python", "Django", "Machine Learning", "AWS", "Azure", "Node.js", "React.js", 
  "Vue.js", "Java", "SprintBoot", "GenAI", "Github", "Bitbucket", "Flask", "Kubernetes",
  "Docker", "Ruby", "MongoDB", "GraphQL", "GPT3", "GPT4", "PyTorch", "Next.js"
];

// Star Component - for background
const BackgroundStars = () => {
  return <Stars radius={100} depth={50} count={5000} factor={4} saturation={0.5} fade speed={1} />;
};

interface CelestialObjectProps {
  position: [number, number, number];
  size: number;
  color: string;
  rotation?: number;
  company?: string;
  location?: string;
  role?: string;
  period?: string;
  description?: string;
  technologies?: string[];
  celestialType: 'sun' | 'planet' | 'gasGiant' | 'rockyPlanet' | 'moon' | 'icyMoon' | 'asteroid' | 'comet' | 'nebula' | 'blackHole' | 'star' | 'wormhole' | string;
  orbitSpeed?: number;
  brightness?: number;
  name?: string;
  date?: string;
  institution?: string;
  degree?: string;
  subjects?: string[];
  achievements?: string;
}

// CelestialObject Component - to render different celestial objects
const CelestialObject: React.FC<CelestialObjectProps> = ({
  position,
  size,
  color,
  rotation,
  company,
  location,
  role,
  period,
  description,
  technologies,
  celestialType,
  orbitSpeed = 0.0001,
  brightness = 1,
  name
}) => {
  const groupRef = useRef<any>(null);
  const objectRef = useRef<any>(null);
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
      
      if (celestialType === "comet" && objectRef.current) {
        // Slight wobble for comets
        objectRef.current.rotation.z = Math.sin(time * 2) * 0.1;
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
        
      case "asteroid":
        return (
          <mesh ref={objectRef}>
            <dodecahedronGeometry args={[size, 0]} />
            <meshStandardMaterial 
              color={color} 
              roughness={1} 
              metalness={0.5}
            />
          </mesh>
        );
        
      case "comet":
        return (
          <group ref={objectRef}>
            <mesh>
              <icosahedronGeometry args={[size, 0]} />
              <meshStandardMaterial 
                color={color} 
                roughness={0.6} 
                metalness={0.4}
              />
            </mesh>
            <Trail
              width={2}
              length={8}
              color={new THREE.Color(color)}
              attenuation={(width) => width}
            >
              <mesh>
                <sphereGeometry args={[0.1, 8, 8]} />
                <meshBasicMaterial color={color} />
              </mesh>
            </Trail>
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
        
      case "star":
        return (
          <group ref={objectRef}>
            <mesh>
              <sphereGeometry args={[size, 16, 16]} />
              <meshBasicMaterial color={color} />
            </mesh>
            <pointLight color={color} intensity={brightness} distance={size * 20} />
            <Sparkles count={10} scale={size * 3} size={0.7} speed={0.2} color={color} />
          </group>
        );
        
      case "wormhole":
        // Custom shader for wormhole
        const wormholeShader = {
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
              
              // Wormhole effect
              float tunnel = smoothstep(0.0, 0.5, dist);
              float ring = smoothstep(0.4, 0.5, dist) * smoothstep(0.6, 0.5, dist);
              
              // Swirling effect
              float angle = atan(vUv.y - 0.5, vUv.x - 0.5);
              float swirl = sin(angle * 8.0 - dist * 20.0 + time * 2.0) * 0.5 + 0.5;
              
              vec3 tunnelColor = mix(vec3(0.0, 0.0, 0.0), color, tunnel * swirl);
              vec3 ringColor = mix(tunnelColor, color, ring);
              
              gl_FragColor = vec4(ringColor, tunnel * 0.8);
            }
          `
        };
        
        return (
          <group ref={objectRef}>
            <mesh rotation={[0, 0, 0]}>
              <planeGeometry args={[size * 4, size * 4, 1, 1]} />
              <shaderMaterial
                args={[wormholeShader]}
                transparent={true}
                side={THREE.DoubleSide}
              />
            </mesh>
            <pointLight position={[0, 0, 0]} color={color} intensity={1} distance={size * 8} />
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

  // Technology orbiting as moons or satellites
  const renderTechnologyOrbiters = () => {
    if (!technologies) return null;
    
    return technologies.map((tech, idx) => {
      const angle = (2 * Math.PI / technologies.length) * idx;
      const radius = size * 2;
      const techSize = 0.4 + Math.random() * 0.3;
      
      return (
        <group key={idx} position={[
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * radius * 0.5,
          Math.sin(angle) * radius
        ]}>
          <mesh>
            <sphereGeometry args={[techSize, 8, 8]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
          </mesh>
          <Billboard>
            <Text
              color="white"
              anchorX="center"
              anchorY="middle"
              fontSize={0.5}
              outlineWidth={0.02}
              outlineColor="black"
              maxWidth={2}
            >
              {tech}
            </Text>
          </Billboard>
        </group>
      );
    });
  };

  // Name display for certifications
  const nameDisplay = name ? (
    <Billboard position={[0, size * 1.5, 0]}>
      <Text
        color="white"
        anchorX="center"
        anchorY="middle"
        fontSize={1}
        outlineWidth={0.05}
        outlineColor="black"
      >
        {name}
      </Text>
    </Billboard>
  ) : null;

  // Company and role display
  const infoDisplay = company ? (
    <Billboard position={[0, size * 1.2, 0]}>
      <Text
        color="white"
        anchorX="center"
        anchorY="middle"
        fontSize={1}
        outlineWidth={0.05}
        outlineColor="black"
      >
        {company}
      </Text>
      <Text
        position={[0, -1, 0]}
        color="#bbbbbb"
        anchorX="center"
        anchorY="middle"
        fontSize={0.7}
      >
        {role}
      </Text>
    </Billboard>
  ) : null;

  return (
    <group 
      ref={groupRef} 
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setDetailsVisible(!detailsVisible)}
    >
      {renderCelestialObject()}
      
      {/* Technology orbiters */}
      {renderTechnologyOrbiters()}
      
      {/* Info displays */}
      {infoDisplay}
      {nameDisplay}
      
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
            {company && (
              <>
                <h2 style={{ color, margin: '0 0 5px 0' }}>{company}</h2>
                <h3 style={{ margin: '0 0 5px 0', color: '#dddddd' }}>{role}</h3>
                <div style={{ 
                  color: '#aaaaaa', 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  marginBottom: '15px',
                  fontSize: '14px'
                }}>
                  <span>{location}</span>
                  <span>{period}</span>
                </div>
                
                <p style={{ fontSize: '14px', lineHeight: '1.4' }}>{description}</p>
                
                {technologies && (
                  <div style={{ marginTop: '15px' }}>
                    <h4 style={{ margin: '0 0 8px 0', color: '#dddddd' }}>Technologies:</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {technologies.map((tech, idx) => (
                        <span key={idx} style={{
                          backgroundColor: `${color}33`,
                          color: 'white',
                          padding: '3px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          border: `1px solid ${color}`
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
            
            {/* {name && (
              <>
                <h2 style={{ color, margin: '0 0 5px 0' }}>{name}</h2>
                <div style={{ color: '#aaaaaa', marginBottom: '10px' }}>{date}</div>
                <p style={{ fontSize: '14px', lineHeight: '1.4' }}>{description}</p>
              </>
            )}
            
            {celestialType === "wormhole" && (
              <>
                <h2 style={{ color, margin: '0 0 5px 0' }}>{institution}</h2>
                <h3 style={{ margin: '0 0 5px 0', color: '#dddddd' }}>{degree}</h3>
                <div style={{ color: '#aaaaaa', marginBottom: '10px' }}>{period}</div>
                <p style={{ fontSize: '14px', lineHeight: '1.4' }}>
                  {subjects && subjects.join(", ")}
                </p>
                {achievements && (
                  <p style={{ fontSize: '14px', lineHeight: '1.4', marginTop: '10px' }}>
                    <strong>Achievements:</strong> {achievements}
                  </p>
                )}
              </>
            )} */}
            
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
              Close
            </button>
          </div>
        </Html>
      )}
    </group>
  );
};

// SkillCloud Component - asteroid belt of skills
const SkillCloud = () => {
  const groupRef: any = useRef(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {skills.map((skill, idx) => {
        // Position skills in a rough torus/ring shape
        const angle = (2 * Math.PI / skills.length) * idx;
        const radius = 70;
        const verticalVariation = (Math.random() - 0.5) * 20;
        
        const position: [number, number, number] = [
          Math.cos(angle) * radius,
          verticalVariation,
          Math.sin(angle) * radius
        ];
        
        // Randomize size and color
        const size = 1 + Math.random() * 2;
        const hue = (idx * 20) % 360;
        const color = `hsl(${hue}, 70%, 60%)`;
        
        return (
          <group key={idx} position={[...position]}>
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
                {skill}
              </Text>
            </Billboard>
          </group>
        );
      })}
    </group>
  );
};

// Controls component with info overlay
const Controls = () => {
const [showInfo, setShowInfo] = useState(true);
const { camera } = useThree();

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
    
    {showInfo && (
      <Html position={[-20, 40, -40]} center>
        <div style={{
          backgroundColor: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '15px',
          borderRadius: '10px',
          width: '300px',
          fontFamily: 'Arial',
          border: '1px solid #444',
          transform: 'translateX(-50%)'
        }}>
          <h2 style={{ margin: '0 0 10px 0', color: '#00a1f1' }}>Interactive CV Space</h2>
          <p style={{ fontSize: '14px', lineHeight: '1.5', margin: '0 0 10px 0' }}>
            Welcome to my interactive 3D CV! Navigate through my professional experiences, certifications, and skills in this cosmic visualization.
          </p>
          <ul style={{ fontSize: '14px', lineHeight: '1.5', padding: '0 0 0 20px', margin: '0 0 10px 0' }}>
            <li>Click on celestial bodies to view details</li>
            <li>Rotate view: drag with mouse</li>
            <li>Zoom: scroll wheel</li>
            <li>Pan: right-click drag</li>
          </ul>
          <button 
            style={{
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
            onClick={() => setShowInfo(false)}
          >
            Got it!
          </button>
        </div>
      </Html>
    )}
  </>
);
};

// Lighting setup
const Lighting = () => {
return (
  <>
    <ambientLight intensity={0.3} />
    <directionalLight position={[50, 50, 25]} intensity={0.5} />
  </>
);
};

// Main Scene component
const Scene = () => {
return (
  <>
    <PerspectiveCamera makeDefault position={[0, 20, 100]} fov={60} />
    <Controls />
    <Lighting />
    <BackgroundStars />

    <EarthHomeButton />
    
    {/* Main experiences as celestial objects */}
    {experiences.map((exp, idx) => (
      <CelestialObject 
        key={idx}
        {...exp}
      />
    ))}
    
    {/* Certifications as stars */}
    {certifications.map((cert, idx) => (
      <CelestialObject 
        key={`cert-${idx}`}
        {...cert}
      />
    ))}
    
    {/* Education as wormholes */}
    {education.map((edu, idx) => (
      <CelestialObject 
        key={`edu-${idx}`}
        {...edu}
      />
    ))}
    
    {/* Skills as asteroid belt */}
    <SkillCloud />
  </>
);
};

// Main component
export default function SpaceCV() {
return (
  <div style={{ width: '100vw', height: '100vh', background: 'black' }}>
    <Canvas>
      <Scene />
    </Canvas>
  </div>
);
}