"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';

const Portfolio = () => {
  // Create an array of 9 items for the 3x3 grid
  const gridItems = Array(9).fill({
    src: '/StealthStartup.png',
    alt: 'Stealth Startup',
    description: 'Revolutionary AI-powered platform'
  });

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Navigation */}
      <nav className="p-6 flex items-center">
        <Link 
          href="/" 
          className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>
      </nav>

      {/* Header */}
      <header className="text-center py-12">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Portfolio
        </h1>
      </header>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-3 gap-4 p-8 max-w-5xl mx-auto">
        {gridItems.map((item, index) => (
          <div
            key={index}
            className="relative group border-2 border-white rounded-lg overflow-hidden bg-gray-900 aspect-square"
          >
            <div className="relative w-full h-full p-4">
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
              />
              
              <div className="absolute inset-0 bg-black bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center p-4">
                  <h3 className="text-xl font-bold">Stealth Startup</h3>
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