'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Settings, Volume2, VolumeX } from 'lucide-react';

export default function SettingsControl() {
  const [isOpen, setIsOpen] = useState(false);
  const [volume, setVolume] = useState(10);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const hasAttemptedAutoplay = useRef(false);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('/background-music.mp3');
    audioRef.current.loop = true;

    // Try to autoplay at half volume
    if (!hasAttemptedAutoplay.current) {
      hasAttemptedAutoplay.current = true;
      audioRef.current.volume = volume / 100;
      audioRef.current.play().catch(() => {
        // Autoplay failed - we'll wait for user interaction
      });
    }

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Add a document-wide click listener to start playing after first interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioRef.current && !isMuted) {
        audioRef.current.volume = volume / 100;
        audioRef.current.play().catch(console.error);
      }
      document.removeEventListener('click', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    return () => document.removeEventListener('click', handleFirstInteraction);
  }, []);

  useEffect(() => {
    // Handle clicks outside settings panel to close it
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause();
      } else {
        audioRef.current.volume = volume / 100;
        audioRef.current.play().catch(console.error);
      }
    }
  }, [volume, isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div 
      ref={settingsRef}
      className="fixed top-6 right-6 z-50"
    >
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="transform hover:scale-105 transition-all duration-200"
          aria-label="Settings"
        >
          <div 
            style={{
              color: '#E8E8E8',
              filter: 'drop-shadow(0 1px 2px rgba(150,150,150,0.2))',
              transition: 'all 0.2s ease'
            }}
            className="hover:brightness-125 flex items-center justify-center"
          >
            <Settings size={24} strokeWidth={1.5} />
          </div>
        </button>
        
        <div className={`
          absolute top-full right-0 mt-2
          flex flex-col items-end gap-3
          transition-all duration-300 ease-in-out origin-top
          ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}
        `}>
          <button
            onClick={toggleMute}
            className="transform hover:scale-105 transition-all duration-200"
          >
            <div 
              style={{
                color: '#E8E8E8',
                filter: 'drop-shadow(0 1px 2px rgba(150,150,150,0.2))',
                transition: 'all 0.2s ease'
              }}
              className="hover:brightness-125 flex items-center justify-center"
            >
              {isMuted ? 
                <VolumeX size={24} strokeWidth={1.5} /> : 
                <Volume2 size={24} strokeWidth={1.5} />
              }
            </div>
          </button>
          <div className="rotate-90 origin-right translate-x-[42px] -translate-y-[42px]">
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => {
                setVolume(Number(e.target.value));
              }}
              className="w-20 h-0.5 bg-gray-600/40 rounded-lg appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-2.5
                [&::-webkit-slider-thumb]:h-2.5
                [&::-webkit-slider-thumb]:bg-[#E8E8E8]
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:shadow-sm
                hover:[&::-webkit-slider-thumb]:brightness-125
                transition-all duration-150"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 