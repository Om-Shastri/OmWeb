"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Spline from '@splinetool/react-spline/next';

const MinimalView = () => {
  return (
    <div className="relative min-h-screen">
      {/* Spline Background */}
      <div className="fixed inset-0">
        <Spline
          scene="https://prod.spline.design/LuIdvkO4kVAC5-hX/scene.splinecode"
        />
      </div>

      {/* Back Arrow */}
      <nav className="relative z-10 p-6">
        <Link 
          href="/" 
          className="inline-flex p-2 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
        >
          <ArrowLeft size={24} strokeWidth={1.5} />
        </Link>
      </nav>
    </div>
  );
};

export default MinimalView;