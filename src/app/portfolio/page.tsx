"use client";

import React from 'react';
import Link from 'next/link';
import { Home, Shield, Cpu, Code, Layers, Zap } from 'lucide-react';

const Portfolio = () => {
  const icons = [
    { Icon: Shield },
    { Icon: Cpu },
    { Icon: Code },
    { Icon: Layers },
    { Icon: Zap }
  ];

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Navigation */}
      <nav className="p-6 pl-8">
        <div className="max-w-6xl mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-105 origin-left group"
          >
            <Home 
              size={24} 
              className="group-hover:stroke-pink-500 transition-colors duration-300" 
              strokeWidth={1.5}
            />
            <span className="text-lg font-medium">Home</span>
          </Link>
        </div>
      </nav>

      {/* Header */}
      <header className="text-center py-12">
        <h1 className="text-8xl font-bold mb-4 text-pink-500">
          Portfolio
        </h1>
      </header>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-3 gap-8 p-8 max-w-6xl mx-auto">
        {icons.map(({Icon}, index) => (
          <div
            key={index}
            className="relative group border-2 border-white rounded-lg overflow-hidden bg-[#1a1b26] aspect-square p-4"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Icon
                size={80}
                className="text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
                strokeWidth={1.5}
              />
              
              <div className="absolute inset-0 bg-black bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-bold">Stealth</h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;