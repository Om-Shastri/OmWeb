"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function Portfolio() {
  return (
    <main className="min-h-screen">
      <div className="relative z-10">
        <nav className="p-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft size={24} strokeWidth={1.5} />
            <span>Back</span>
          </Link>
        </nav>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-6xl font-bold mb-12 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent text-center pb-4">
            Angel Portfolio
          </h1>

          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Coming Soon
              </h2>
              <p className="text-gray-400">
                Portfolio details are being prepared. Check back soon!
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}