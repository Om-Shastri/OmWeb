import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: "Project: Hephaestus Robotics"
};

export default function HephaestusRoboticsProject() {
  return (
    <main className="min-h-screen">
      <div className="relative z-10">
        <nav className="p-6">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft size={24} strokeWidth={1.5} />
            <span>Back</span>
          </Link>
        </nav>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-2xl text-gray-400">Hephaestus Robotics</h1>
          {/* Add project specific content here */}
        </div>
      </div>
    </main>
  );
} 