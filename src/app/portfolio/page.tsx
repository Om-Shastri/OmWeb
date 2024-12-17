"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, TrendingUp, Users, Calendar } from 'lucide-react';

interface Investment {
  name: string;
  description: string;
  round: string;
  sectors: string[];
  status: 'Active' | 'Exited' | 'Stealth';
  logo?: string;
}

const InvestmentCard = ({ investment }: { investment: Investment }) => {
  return (
    <div className="group relative p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm hover:from-white/10 hover:to-white/15 transition-all duration-300">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Status Badge */}
      <div className="absolute top-4 right-4">
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-gray-300">
          {investment.round}
        </span>
      </div>

      {/* Company Logo & Name */}
      <div className="flex items-center gap-4 mb-4">
        {investment.logo && (
          <img 
            src={investment.logo} 
            alt={`${investment.name} logo`} 
            className="w-12 h-12 rounded-lg object-contain bg-white/5 p-2"
          />
        )}
        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          {investment.name}
        </h2>
      </div>

      {/* Sector tags */}
      <div className="flex gap-3 mb-3 text-sm text-gray-400">
        {investment.sectors.map(sector => (
          <span key={sector} className="px-2 py-1 rounded-md bg-white/10">
            {sector}
          </span>
        ))}
      </div>

      <p className="text-gray-400">
        {investment.description}
      </p>
    </div>
  );
};

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