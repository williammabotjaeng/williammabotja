"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Howl, Howler } from 'howler';

type SoundType = 'click' | 'hover' | 'scroll' | 'success' | 'transition';

interface SoundsMap {
  [key: string]: Howl;
}

export const SoundContext = React.createContext({
  playSound: (sound: SoundType) => {},
  toggleMute: () => {},
  isMuted: false,
});

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const backgroundMusicRef = useRef<Howl | null>(null);
  const sounds = useRef<SoundsMap>({});

  useEffect(() => {
    // Setup sounds
    sounds.current = {
      click: new Howl({
        src: ['/sounds/click.mp3'],
        volume: 0.5,
      }),
      hover: new Howl({
        src: ['/sounds/hover.mp3'],
        volume: 0.3,
      }),
      scroll: new Howl({
        src: ['/sounds/scroll.mp3'],
        volume: 0.2,
      }),
      success: new Howl({
        src: ['/sounds/success.mp3'],
        volume: 0.5,
      }),
      transition: new Howl({
        src: ['/sounds/transition.mp3'],
        volume: 0.4,
      }),
    };

    // Setup background music
    backgroundMusicRef.current = new Howl({
      src: ['/sounds/ambient_space.mp3'],
      loop: true,
      volume: 0.2,
      autoplay: true,
    });

    // Cleanup function
    return () => {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.stop();
      }
      Object.values(sounds.current).forEach(sound => sound.stop());
    };
  }, []);

  useEffect(() => {
    if (backgroundMusicRef.current) {
      if (isMuted) {
        backgroundMusicRef.current.pause();
      } else {
        backgroundMusicRef.current.play();
      }
    }
    
    // Set global Howler mute state
    Howler.mute(isMuted);
  }, [isMuted]);

  const playSound = (sound: SoundType) => {
    if (!isMuted && sounds.current[sound]) {
      sounds.current[sound].play();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <SoundContext.Provider value={{ playSound, toggleMute, isMuted }}>
      {children}
    </SoundContext.Provider>
  );
};

// Custom hook to use sound
export const useSound = () => {
  const context = React.useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};

// Sound button component
export const SoundToggle: React.FC = () => {
  const { toggleMute, isMuted } = useSound();

  return (
    <button 
      onClick={toggleMute}
      className="fixed bottom-4 right-4 z-50 bg-black bg-opacity-50 p-3 rounded-full"
    >
      {isMuted ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <line x1="1" y1="1" x2="23" y2="23"></line>
          <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
          <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
          <line x1="12" y1="19" x2="12" y2="23"></line>
          <line x1="8" y1="23" x2="16" y2="23"></line>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
        </svg>
      )}
    </button>
  );
};