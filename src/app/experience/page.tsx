"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  Stars,
  OrbitControls,
  PerspectiveCamera,
  Billboard,
  Text,
  Html,
} from "@react-three/drei";
import * as THREE from "three";

// SVG asset path
const williamSVGPath = "/william.svg";

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
    position: [0, 0, -5],
    rotation: 0.002,
    arms: 4
  },
  {
    company: "iOCO AppDev (EOH)",
    location: "Midrand",
    role: "React Native Developer",
    period: "April 2023 - August 2024",
    description: "Working as a React Developer for iOCO AppDev on the main client project, MyMTN NextGen Mobile App and the internal application MTN Experience Manager.",
    technologies: ["React.js", "React Native", "Typescript", "Github", "Azure Portal", "Azure DevOps", "Azure AI Services", "Azure AI Custom Vision", "Azure OpenAI Service/GenAI", "Next.js", "TailwindCSS"],
    color: "#ffc107",
    size: 10,
    position: [25, 0, 15],
    rotation: 0.003,
    arms: 5
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
    position: [-20, 5, 25],
    rotation: 0.004,
    arms: 3
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
    position: [-15, -8, -20],
    rotation: 0.005,
    arms: 2
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
    position: [20, -5, -25],
    rotation: 0.0035,
    arms: 4
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
    position: [-25, 8, 0],
    rotation: 0.0045,
    arms: 2
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
    position: [10, 10, 30],
    rotation: 0.004,
    arms: 3
  },
  {
    company: "Self-Employed",
    location: "Johannesburg",
    role: "Freelance Web Developer",
    period: "March 2015 - September 2018",
    description: "Creating websites for small businesses and individuals using Wordpress and other CMS platforms. Working on Booking and Payment solutions for clients. Won Afristay.com award for client website.",
    technologies: ["PHP", "Wordpress", "jQuery", "Joomla", "C#", "Umbraco", "React Native", "Ionic Framework", "WPF", "ASP.NET MVC", "WinForms"],
    color: "#009688",
    size: 7.5,
    position: [-10, -10, -30],
    rotation: 0.0025,
    arms: 4
  }
];

// EtchedSVG Component
const EtchedSVG = () => {
  const texture = useLoader(THREE.TextureLoader, williamSVGPath);

  const aspect = useMemo(() => {
    if (texture && texture.image) {
      return texture.image.width / texture.image.height;
    }
    return 1;
  }, [texture]);

  const planeHeight = 40;
  const planeWidth = planeHeight * aspect;

  return (
    <mesh position={[-35, -5, -35]}>
      <planeGeometry args={[planeWidth, planeHeight]} />
      <meshBasicMaterial map={texture} transparent opacity={0.4} />
    </mesh>
  );
};

// Star System Component for individual stars in galaxy arms
const StarSystem = ({ position, color, size = 0.1 }) => {
  const starRef = useRef<THREE.Mesh>(null!);
  
  return (
    <mesh ref={starRef} position={position}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
};

// Technology Cloud Component - stars representing technologies
const TechnologyCloud = ({ technologies, color, position, radius }) => {
  return (
    <>
      {technologies.map((tech, idx) => {
        // Calculate position in a spherical cloud around the given position
        const angle1 = Math.random() * Math.PI * 2;
        const angle2 = Math.random() * Math.PI * 2;
        const distance = Math.random() * radius;
        
        const techPosition = [
          position[0] + Math.sin(angle1) * Math.cos(angle2) * distance,
          position[1] + Math.sin(angle1) * Math.sin(angle2) * distance,
          position[2] + Math.cos(angle1) * distance
        ];
        
        // Generate a color variation
        const techColor = new THREE.Color(color).offsetHSL(0, 0, Math.random() * 0.3);
        
        return (
          <group key={idx} position={techPosition as [number, number, number]}>
            <StarSystem 
              position={[0, 0, 0]} 
              color={techColor} 
              size={0.15 + Math.random() * 0.15} 
            />
            <Billboard>
              <Text
                color={techColor}
                anchorX="center"
                anchorY="middle"
                fontSize={0.2}
                outlineWidth={0.02}
                outlineColor="black"
                maxWidth={2}
                textAlign="center"
                visible={distance > radius * 0.5} // Only show text for outer stars
              >
                {tech}
              </Text>
            </Billboard>
          </group>
        );
      })}
    </>
  );
};

// Galaxy Component
const Galaxy = ({
  position,
  size,
  color,
  rotation,
  arms,
  company,
  location,
  role,
  period,
  description,
  technologies
}) => {
  const groupRef = useRef<THREE.Group>(null!);
  const galaxyRef = useRef<THREE.Points>(null!);
  const [hovered, setHovered] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);
  
  // Create galaxy particle system
  const { positions, colors } = useMemo(() => {
    const positions = [];
    const colors = [];
    const particleCount = 2000;
    
    // Create a spiral galaxy with multiple arms
    for (let i = 0; i < particleCount; i++) {
      // Choose which arm the star belongs to
      const armIndex = Math.floor(Math.random() * arms);
      const armAngle = (2 * Math.PI / arms) * armIndex;
      
      // Distance from center (logarithmic spiral)
      const distance = Math.random() * size;
      
      // Spiral twist increases with distance
      const twist = 4.0;
      const angle = armAngle + (distance / size) * twist;
      
      // Add some scatter to make it look more natural
      const scatter = (Math.random() - 0.5) * (distance / size) * 0.5;
      const scatterY = (Math.random() - 0.5) * 0.2 * size;
      
      // Calculate position with scatter
      const x = Math.cos(angle) * distance + Math.cos(angle + Math.PI/2) * scatter;
      const y = scatterY;
      const z = Math.sin(angle) * distance + Math.sin(angle + Math.PI/2) * scatter;
      
      positions.push(x, y, z);
      
      // Color gradient from center to edge
      const centerColor = new THREE.Color(color);
      const edgeColor = new THREE.Color('white');
      const colorFactor = distance / size;
      
      const starColor = new THREE.Color().copy(centerColor).lerp(edgeColor, colorFactor * 0.6);
      // Brighten the arms a bit
      const brightnessFactor = 1.0 - Math.abs(Math.cos((angle - armAngle) * 8)) * 0.2;
      starColor.multiplyScalar(brightnessFactor);
      
      colors.push(starColor.r, starColor.g, starColor.b);
    }
    
    // Add central bulge
    const bulgeParticles = 1000;
    for (let i = 0; i < bulgeParticles; i++) {
      const radius = (1 - Math.pow(Math.random(), 2)) * size * 0.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta) * 0.5; // Flatten bulge
      const z = radius * Math.cos(phi) * 0.5;
      
      positions.push(x, y, z);
      
      // Bulge is brighter and more colorful
      const bulgeColor = new THREE.Color(color);
      bulgeColor.offsetHSL(0, 0, 0.5); // Brighter
      colors.push(bulgeColor.r, bulgeColor.g, bulgeColor.b);
    }
    
    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors)
    };
  }, [size, color, arms]);

  useFrame((state) => {
    // Rotate galaxy
    groupRef.current.rotation.y += rotation;
    
    // Slight wobble
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.05;
    groupRef.current.rotation.z = Math.cos(t * 0.3) * 0.03;
    
    // Position follows its orbit
    const time = Date.now() * 0.0001;
    groupRef.current.position.x = position[0] + Math.sin(time) * 2;
    groupRef.current.position.z = position[2] + Math.cos(time) * 2;
  });

  // Company name and core info display
  const companyDisplay = (
    <Billboard position={[0, size * 1.2, 0]}>
      <Text
        color="white"
        anchorX="center"
        anchorY="middle"
        fontSize={size * 0.15}
        outlineWidth={size * 0.02}
        outlineColor="black"
        maxWidth={size * 2}
        textAlign="center"
      >
        {company}
      </Text>
      <Text
        position={[0, -size * 0.2, 0]}
        color="#bbbbbb"
        anchorX="center"
        anchorY="middle"
        fontSize={size * 0.1}
        maxWidth={size * 2.5}
        textAlign="center"
      >
        {role}
      </Text>
    </Billboard>
  );

  return (
    <group 
      ref={groupRef} 
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setDetailsVisible(!detailsVisible)}
    >
      {/* Central bright core */}
      <mesh>
        <sphereGeometry args={[size * 0.1, 16, 16]} />
        <meshBasicMaterial color={color} />
        <pointLight color={color} intensity={2} distance={size * 5} decay={2} />
      </mesh>
      
      {/* Galaxy particle system */}
      <points ref={galaxyRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.15} 
          vertexColors 
          transparent 
          opacity={0.8}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
      
      {/* Technology stars in a cloud */}
      <TechnologyCloud 
        technologies={technologies} 
        color={color} 
        position={[0, 0, 0]} 
        radius={size * 0.8} 
      />
      
      {/* Company and role display */}
      {companyDisplay}
      
      {/* Experience details on click */}
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
      
      {/* Highlight effect when hovered */}
      {hovered && !detailsVisible && (
        <mesh>
          <sphereGeometry args={[size * 1.05, 32, 32]} />
          <meshBasicMaterial 
            color={color} 
            transparent={true} 
            opacity={0.05} 
          />
        </mesh>
      )}
    </group>
  );
};

// Journey Path Component - connecting galaxies with light trails
const JourneyPath = () => {
  const pathRef = useRef<THREE.Line>(null!);
  
  // Create path connecting all experience galaxies in chronological order
  const sortedExperiences = [...experiences].sort((a, b) => {
    // Extract start year from period
    const getStartYear = (period) => {
      const match = period.match(/(\d{4})/);
      return match ? parseInt(match[1]) : 0;
    };
    
    return getStartYear(a.period) - getStartYear(b.period);
  });
  
  // Create path points
  const pathPoints = useMemo(() => {
    const points = [];
    sortedExperiences.forEach(exp => {
      points.push(new THREE.Vector3(exp.position[0], exp.position[1], exp.position[2]));
    });
    
    // Create a smooth curve through all points
    const curve = new THREE.CatmullRomCurve3(points);
    return curve.getPoints(100);
  }, [sortedExperiences]);
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Animate path with flowing gradient effect
    if (pathRef.current && pathRef.current.material instanceof THREE.ShaderMaterial) {
      pathRef.current.material.uniforms.time.value = t;
    }
  });
  
  // Custom shader for animated path
  const pathShader = {
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color(0x88ccff) }
    },
    vertexShader: `
      varying vec3 vPosition;
      void main() {
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color;
      varying vec3 vPosition;
      
      void main() {
        float t = fract(time * 0.2); // Speed of flow
        float distanceAlongPath = length(vPosition);
        float flow = smoothstep(0.0, 0.3, 1.0 - abs(fract(distanceAlongPath * 0.05 - time * 0.1) * 2.0 - 1.0));
        vec3 glowColor = mix(color, vec3(1.0), flow * 0.5);
        float alpha = 0.5 * (1.0 - flow * 0.5);
        gl_FragColor = vec4(glowColor, alpha);
      }
    `
  };
  
  return (
    <line ref={pathRef}>
      <bufferGeometry>
        <float32BufferAttribute 
          attach="attributes-position" 
          args={[new Float32Array(pathPoints.flatMap(p => [p.x, p.y, p.z])), 3]} 
        />
      </bufferGeometry>
      <shaderMaterial 
        attach="material"
        args={[pathShader]}
        transparent={true}
        depthWrite={false}
      />
    </line>
  );
};

// SpaceDust Component
const SpaceDust = () => {
  const particles = useRef<THREE.Points>(null!);
  const count = 5000;

  const [positions, colors] = useMemo(() => {
    const posArray = new Float32Array(count * 3);
    const colorArray = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const distance = Math.random() * 80 + 20;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      posArray[i * 3] = distance * Math.sin(phi) * Math.cos(theta);
      posArray[i * 3 + 1] = distance * Math.sin(phi) * Math.sin(theta);
      posArray[i * 3 + 2] = distance * Math.cos(phi);

      // Create varied space dust
      const r = 0.3 + Math.random() * 0.7;
      const g = 0.3 + Math.random() * 0.7;
      const b = 0.5 + Math.random() * 0.5;
      
      colorArray[i * 3] = r;
      colorArray[i * 3 + 1] = g;
      colorArray[i * 3 + 2] = b;
    }
    return [posArray, colorArray];
  }, [count]);

  useFrame(() => {
    particles.current.rotation.y += 0.0001;
  });

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.2} 
        vertexColors 
        transparent 
        opacity={0.7} 
        sizeAttenuation
      />
    </points>
  );
};

// Timeline Component
const Timeline = () => {
  // Calculate earliest and latest years
  const years = experiences.map(exp => {
    const matches = exp.period.match(/\d{4}/g);
    return matches ? matches.map(year => parseInt(year)) : [];
  }).flat();
  
  const minYear = Math.min(...years);
  const maxYear = new Date().getFullYear();
  const yearRange = maxYear - minYear + 1;
  
  return (
    <Html position={[0, -15, 0]} center>
      <div style={{
        backgroundColor: 'rgba(0,0,0,0.7)',
        color: 'white',
        padding: '15px',
        borderRadius: '10px',
        width: '80vw',
        maxWidth: '800px',
        border: '1px solid #336699'
      }}>
        <h3 style={{ margin: '0 0 10px 0', textAlign: 'center' }}>Professional Journey Timeline</h3>
        <div style={{ 
          display: 'flex', 
          position: 'relative',
          height: '60px',
          marginTop: '10px'
        }}>
          {/* Timeline bar */}
          <div style={{
            position: 'absolute',
            top: '30px',
            left: '0',
            right: '0',
            height: '4px',
            backgroundColor: '#336699',
            zIndex: 1
          }}></div>
          
          {/* Year markers */}
          {Array.from({ length: yearRange }).map((_, idx) => {
            const year = minYear + idx;
            const isSignificant = year % 2 === 0;
            
            return isSignificant ? (
              <div key={year} style={{
                position: 'absolute',
                left: `${(idx / (yearRange - 1)) * 100}%`,
                top: '10px',
                transform: 'translateX(-50%)',
                textAlign: 'center',
                zIndex: 2
              }}>
                <div style={{
                  width: '2px',
                  height: '10px',
                  backgroundColor: '#336699',
                  margin: '0 auto'
                }}></div>
                <div style={{
                  fontSize: '12px',
                  color: '#bbbbbb'
                }}>
                  {year}
                </div>
              </div>
            ) : null;
          })}
          
          {/* Experience markers */}
          {experiences.map((exp, idx) => {
            // Extract years from period
            const matches = exp.period.match(/\d{4}/g);
            if (!matches || matches.length === 0) return null;
            
            const startYear = parseInt(matches[0]);
            const startPosition = ((startYear - minYear) / (yearRange - 1)) * 100;
            
            return (
              <div key={idx} style={{
                position: 'absolute',
                left: `${startPosition}%`,
                bottom: '10px',
                transform: 'translateX(-50%)',
                zIndex: 3
              }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: exp.color,
                  boxShadow: `0 0 8px ${exp.color}`,
                  margin: '0 auto'
                }}></div>
                <div style={{
                  fontSize: '10px',
                  color: 'white',
                  maxWidth: '100px',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  transform: idx % 2 ? 'translateY(20px)' : 'none'
                }}>
                  {exp.company}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Html>
  );
};

// InfoPanel Component
const InfoPanel = () => {
  return (
    <Html position={[-35, 15, 0]} transform>
      <div style={{
        backgroundColor: 'rgba(0,0,0,0.7)',
        color: 'white',
        padding: '15px',
        borderRadius: '10px',
        width: '300px',
        border: '1px solid #336699'
      }}>
        <h2 style={{ margin: '0 0 10px 0', color: '#4fc3f7' }}>William's Career Universe</h2>
        <p style={{ fontSize: '14px', margin: '5px 0' }}>
          Each galaxy represents a professional experience in my career journey.
          The size and number of arms indicate the scope and impact of the role.
        </p>
        <p style={{ fontSize: '14px', margin: '10px 0' }}>
          Click on any galaxy to explore details about that experience.
        </p>
        <p style={{ fontSize: '12px', fontStyle: 'italic', marginTop: '10px' }}>
          Interact with the scene: Drag to rotate, scroll to zoom
        </p>
      </div>
    </Html>
  );
};

// Main ExperienceUniverse Component
const ExperienceUniverse = () => {
  return (
    <Canvas style={{ height: "100vh", width: "100vw", background: "black" }}>
      {/* Etched SVG */}
      <EtchedSVG />
      
      {/* Camera setup */}
      <PerspectiveCamera makeDefault position={[0, 30, 50]} />
      
      {/* Basic lighting */}
      <ambientLight intensity={0.1} />
      
      {/* Camera controls */}
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={15}
        maxDistance={150}
      />
      
      {/* Background stars */}
      <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade />
      
      {/* Journey path connecting experiences */}
      <JourneyPath />
      
      {/* Experience galaxies */}
      {experiences.map((exp, index) => (
        <Galaxy
          key={index}
          position={exp.position}
          size={exp.size}
          color={exp.color}
          rotation={exp.rotation}
          arms={exp.arms}
          company={exp.company}
          location={exp.location}
          role={exp.role}
          period={exp.period}
          description={exp.description}
          technologies={exp.technologies}
        />
      ))}
      
      {/* Space dust particles */}
      <SpaceDust />
      
      {/* Info Panel */}
      <InfoPanel />
      
      {/* Timeline */}
      <Timeline />
    </Canvas>
  );
};

export default ExperienceUniverse;