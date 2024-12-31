"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import SettingsControl from '../../components/Settings';

export default function PlanformProject() {
  return (
    <main className="min-h-screen">
      <div className="relative z-10">
        <nav className="p-6 flex justify-between items-center">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-white hover:text-white transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft size={24} strokeWidth={1.5} />
          </Link>
          <div className="flex items-center gap-2">
            <SettingsControl />
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-2xl text-gray-400">Planform</h1>
          {/* Add project specific content here */}
        </div>
      </div>
    </main>
  );
} 