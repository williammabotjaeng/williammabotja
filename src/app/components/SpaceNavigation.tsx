"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '@/components/SoundManager';
import * as d3 from 'd3';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

// Import MUI icons
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import WorkIcon from '@mui/icons-material/Work';
import BuildIcon from '@mui/icons-material/Build';
import PhotoAlbumIcon from '@mui/icons-material/PhotoAlbum';
import ContactMailIcon from '@mui/icons-material/ContactMail';

interface NavItemType {
  name: string;
  icon: React.ReactNode;
  link: string;
}

const navItems: NavItemType[] = [
  { name: 'Home', icon: <HomeIcon fontSize="large" />, link: '#home' },
  { name: 'About', icon: <InfoIcon fontSize="large" />, link: '#about' },
  { name: 'Experience', icon: <WorkIcon fontSize="large" />, link: '#experience' },
  { name: 'Skills', icon: <BuildIcon fontSize="large" />, link: '#skills' },
  { name: 'Projects', icon: <PhotoAlbumIcon fontSize="large" />, link: '#projects' },
  { name: 'Contact', icon: <ContactMailIcon fontSize="large" />, link: '#contact' },
];

const OrbitalPath = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    const width = 300;
    const height = 300;
    
    navItems.forEach((_, i) => {
      const radius = 70 + i * 30;      
      svg.append('circle')
        .attr('cx', width / 2)
        .attr('cy', height / 3) // Shifted vertically (upward)
        .attr('r', radius)
        .attr('fill', 'none')
        .attr('stroke', `rgba(255, 255, 255, ${0.1 + i * 0.05})`)
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '5,5');
        
      const starCount = 10 + i * 5;
      for (let j = 0; j < starCount; j++) {
        const angle = (j / starCount) * Math.PI * 2;
        const x = width / 2 + radius * Math.cos(angle);
        const y = height / 3 + radius * Math.sin(angle);
        svg.append('circle')
          .attr('cx', x)
          .attr('cy', y)
          .attr('r', Math.random() * 1.5 + 0.5)
          .attr('fill', 'white')
          .attr('opacity', Math.random() * 0.8 + 0.2);
      }
    });
  }, []);
  
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        opacity: 0.3,
        mb: 2,
      }}
    >
      <svg ref={svgRef} width="300" height="300" style={{ display: 'block', margin: '0 auto' }} />
    </Box>
  );
};

interface NavItemProps {
  item: NavItemType;
  index: number;
  active: number;
  setActive: (index: number) => void;
}

const NavItem = ({ item, index, active, setActive }: NavItemProps) => {
  const { playSound } = useSound();
  const totalItems = navItems.length;
  const angle = (index / totalItems) * Math.PI * 2 - Math.PI / 2;
  const radius = 220;
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
  
  return (
    <motion.div 
      style={{ position: 'absolute', left: '50%', top: '50%' }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: active === index ? 1.2 : 1,
        opacity: 1,
        zIndex: active === index ? 10 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      <IconButton
        onClick={handleClick}
        onMouseEnter={handleHover}
        sx={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          backgroundColor: active === index ? 'primary.main' : 'grey.800',
          color: 'white',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'scale(1.1) translateY(-5px)',
            boxShadow: active === index
              ? '0 0 15px 5px rgba(59,130,246,0.5)'
              : '0 0 15px 5px rgba(255,255,255,0.5)',
          },
        }}
      >
        {item.icon}
      </IconButton>
      <Typography variant="caption" sx={{ position: 'absolute', bottom: -24, whiteSpace: 'nowrap' }}>
        {item.name}
      </Typography>
    </motion.div>
  );
};

const SpaceNavigation = () => {
  const [active, setActive] = useState(0);
  const { playSound } = useSound() as { playSound: (sound: string) => void };
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item =>
        document.querySelector(item.link)
      );
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.getBoundingClientRect().top <= 100) {
          if (active !== i) {
            setActive(i);
            playSound('scroll');
          }
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [active, playSound]);
  
  return (
    <Box 
      sx={{
        position: 'fixed',
        right: { xs: 8, sm: 16, md: 24, lg: 40 },
        top: '30%', // Higher vertical position
        mt: 2,      // Additional top margin
        width: { xs: 128, sm: 160, md: 240 },
        height: { xs: 128, sm: 160, md: 200 },
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <OrbitalPath />
      <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
        {navItems.map((item, index) => (
          <NavItem 
            key={index} 
            item={item} 
            index={index} 
            active={active}
            setActive={setActive}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SpaceNavigation;
