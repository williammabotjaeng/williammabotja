"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';

// Create a sound hook to replace the external SoundManager
const useSoundEffect = () => {
  // Use refs to store audio elements
  const clickSound = useRef<HTMLAudioElement | null>(null);
  const hoverSound = useRef<HTMLAudioElement | null>(null);
  const scrollSound = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // Only create audio elements in the browser
    if (typeof window !== 'undefined') {
      clickSound.current = new Audio('/sounds/click.mp3');
      hoverSound.current = new Audio('/sounds/hover.mp3');
      scrollSound.current = new Audio('/sounds/scroll.mp3');
      
      // Preload audio files
      clickSound.current.load();
      hoverSound.current.load();
      scrollSound.current.load();
    }
  }, []);
  
  const playSound = (sound: 'click' | 'hover' | 'scroll') => {
    try {
      if (sound === 'click' && clickSound.current) {
        clickSound.current.currentTime = 0;
        clickSound.current.play().catch(() => {});
      } else if (sound === 'hover' && hoverSound.current) {
        hoverSound.current.currentTime = 0;
        hoverSound.current.volume = 0.5;
        hoverSound.current.play().catch(() => {});
      } else if (sound === 'scroll' && scrollSound.current) {
        scrollSound.current.currentTime = 0;
        scrollSound.current.play().catch(() => {});
      }
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };
  
  return { playSound };
};

interface NavItemType {
  name: string;
  icon: string;
  link: string;
}

const navItems: NavItemType[] = [
  { name: 'Home', icon: '🚀', link: '#home' },
  { name: 'About', icon: '👨‍🚀', link: '#about' },
  { name: 'Experience', icon: '🛰️', link: '#experience' },
  { name: 'Skills', icon: '🌠', link: '#skills' },
  { name: 'Projects', icon: '🪐', link: '#projects' },
  { name: 'Contact', icon: '📡', link: '#contact' },
];

const OrbitalPath = ({ isMobile }: { isMobile: boolean }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    
    // Adjust dimensions based on mobile state
    const width = isMobile ? 220 : 300;
    const height = isMobile ? 220 : 300;
    
    // Add a radial gradient for a nicer background effect
    const defs = svg.append("defs");
    const radialGradient = defs.append("radialGradient")
      .attr("id", "orbital-bg")
      .attr("cx", "50%")
      .attr("cy", "33%")
      .attr("r", "70%");
      
    radialGradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "rgba(59, 130, 246, 0.3)");
      
    radialGradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "rgba(0, 0, 0, 0)");
    
    // Add a subtle background glow
    svg.append("circle")
      .attr("cx", width / 2)
      .attr("cy", height / 3)
      .attr("r", isMobile ? 100 : 140)
      .attr("fill", "url(#orbital-bg)");
    
    // Drawing logic adjusted for mobile/desktop
    const orbitalCount = isMobile ? 3 : navItems.length;
    
    for (let i = 0; i < orbitalCount; i++) {
      // Smaller radiuses on mobile
      const radius = isMobile ? (50 + i * 25) : (70 + i * 30);
      
      svg.append('circle')
        .attr('cx', width / 2)
        .attr('cy', height / 3)
        .attr('r', radius)
        .attr('fill', 'none')
        .attr('stroke', `rgba(255, 255, 255, ${0.1 + i * 0.05})`)
        .attr('stroke-width', isMobile ? 0.8 : 1)
        .attr('stroke-dasharray', i % 2 === 0 ? '3,3' : '5,5');
        
      // Fewer stars on mobile for better performance
      const starCount = isMobile ? (5 + i * 3) : (10 + i * 5);
      
      for (let j = 0; j < starCount; j++) {
        const angle = (j / starCount) * Math.PI * 2;
        const x = width / 2 + radius * Math.cos(angle);
        const y = height / 3 + radius * Math.sin(angle);
        
        // Create twinkling effect with varying sizes
        const starSize = Math.random() * (isMobile ? 1.2 : 1.5) + 0.5;
        const opacity = Math.random() * 0.8 + 0.2;
        
        // Add glow to some stars
        if (Math.random() > 0.7) {
          svg.append('circle')
            .attr('cx', x)
            .attr('cy', y)
            .attr('r', starSize + (isMobile ? 1 : 1.5))
            .attr('fill', 'rgba(255, 255, 255, 0.3)')
            .attr('opacity', opacity * 0.5);
        }
        
        svg.append('circle')
          .attr('cx', x)
          .attr('cy', y)
          .attr('r', starSize)
          .attr('fill', 'white')
          .attr('opacity', opacity);
      }
    }
    
    // Add a few floating particles for depth (fewer on mobile)
    const particleCount = isMobile ? 15 : 30;
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      svg.append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', Math.random() * 0.8)
        .attr('fill', 'white')
        .attr('opacity', Math.random() * 0.5);
    }
  }, [isMobile]);
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 mb-2">
      <svg 
        ref={svgRef} 
        width={isMobile ? "220" : "300"} 
        height={isMobile ? "220" : "300"} 
        className="mx-auto block"
      />
    </div>
  );
};

// For the mobile bottom navigation bar
const MobileNavBar = ({ active, setActive }: { active: number, setActive: (index: number) => void }) => {
  const { playSound } = useSoundEffect();
  
  const handleClick = (index: number) => {
    playSound('click');
    setActive(index);
    const element = document.querySelector(navItems[index].link);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 bg-gray-900 bg-opacity-80 backdrop-blur-md z-50 shadow-lg"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item, index) => (
          <motion.button
            key={index}
            className={`flex flex-col items-center justify-center py-1 w-1/6 ${
              active === index ? 'text-blue-400' : 'text-gray-400'
            }`}
            onClick={() => handleClick(index)}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => playSound('hover')}
          >
            <span className="text-xl mb-1">{item.icon}</span>
            <span className="text-xs">{item.name}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

interface NavItemProps {
  item: NavItemType;
  index: number;
  active: number;
  setActive: (index: number) => void;
  isMobile: boolean;
  isTablet: boolean;
}

const NavItem = ({ item, index, active, setActive, isMobile, isTablet }: NavItemProps) => {
  const { playSound } = useSoundEffect();
  const totalItems = navItems.length;
  
  // Adjust position calculations for different devices
  let radius;
  if (isMobile) {
    radius = 80;
  } else if (isTablet) {
    radius = 120;
  } else {
    radius = 160;
  }
  
  // Semi-circle layout for better visibility
  const angle = ((index / (totalItems - 1)) * Math.PI) - Math.PI / 8;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  
  const handleClick = () => {
    playSound('click');
    setActive(index);
    const element = document.querySelector(item.link);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleHover = () => {
    playSound('hover');
  };
  
  // Adjust size based on device
  const buttonSize = isMobile ? 'w-10 h-10' : isTablet ? 'w-12 h-12' : 'w-16 h-16';
  const iconSize = isMobile ? 'text-lg' : isTablet ? 'text-xl' : 'text-2xl';
  const labelSize = isMobile ? 'text-xs' : 'text-sm';
  
  return (
    <motion.div 
      className="absolute left-1/2 top-1/2"
      style={{ x, y }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: active === index ? (isMobile ? 1.1 : 1.2) : 1,
        opacity: 1,
        zIndex: active === index ? 10 : 1,
      }}
      transition={{ 
        duration: 0.4,
        type: 'spring',
        stiffness: 200,
        damping: 20
      }}
    >
      <motion.button
        className={`relative flex flex-col items-center justify-center ${buttonSize} rounded-full 
          ${active === index ? 'bg-blue-600' : 'bg-gray-800 bg-opacity-80'} 
          text-white font-semibold transition-transform hover:scale-110`}
        onClick={handleClick}
        onMouseEnter={handleHover}
        whileHover={{ 
          boxShadow: `0 0 15px 5px rgba(${active === index ? '59, 130, 246' : '255, 255, 255'}, 0.5)`, 
          y: -5 
        }}
        whileTap={{ scale: 0.95 }}
      >
        <span className={`${iconSize} mb-1`}>{item.icon}</span>
        <span className={`absolute -bottom-6 ${labelSize} whitespace-nowrap 
          ${active === index ? 'text-blue-300' : 'text-gray-200'}`}>
          {item.name}
        </span>
      </motion.button>
    </motion.div>
  );
};

const SpaceNavigation = () => {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const { playSound } = useSoundEffect();
  
  // Detect screen size and update component state
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
      setShowMobileNav(window.innerWidth < 640);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item =>
        document.querySelector(item.link)
      );
      
      if (!sections[0]) return;
      
      let foundActive = false;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.getBoundingClientRect().top <= 100) {
          if (active !== i) {
            setActive(i);
            playSound('scroll');
          }
          foundActive = true;
          break;
        }
      }
      
      // If we're at the top and no section is active, set Home as active
      if (!foundActive && window.scrollY < 100) {
        setActive(0);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [active, playSound]);
  
  if (showMobileNav) {
    return <MobileNavBar active={active} setActive={setActive} />;
  }
  
  // Position and size adjustments for different screens
  let positionClasses;
  if (isMobile) {
    positionClasses = "fixed right-2 top-1/3 w-24 h-24";
  } else if (isTablet) {
    positionClasses = "fixed right-8 top-1/3 w-32 h-32";
  } else {
    positionClasses = "fixed right-12 lg:right-40 top-1/3 w-40 md:w-60 h-40 md:h-50";
  }
  
  return (
    <motion.div 
      className={`${positionClasses} z-40 flex items-center justify-center`}
      initial={{ opacity: 0, scale: 0.9, rotateZ: -5 }}
      animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <OrbitalPath isMobile={isMobile} />
      <div className="relative w-full h-full">
        {navItems.map((item, index) => (
          <NavItem 
            key={index} 
            item={item} 
            index={index} 
            active={active}
            setActive={setActive}
            isMobile={isMobile}
            isTablet={isTablet}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default SpaceNavigation;