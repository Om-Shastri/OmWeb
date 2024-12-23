"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

interface Investment {
  name: string;
  round: string;
  sectors: string[];
  status: string;
  logo: string;
  url: string;
}

function InvestmentCard({ investment }: { investment: Investment }) {
  return (
    <a 
      href={investment.url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="block border border-gray-800/40 rounded-md p-4 hover:border-gray-600/60 transition-all duration-300 bg-black/10 backdrop-blur-[2px] hover:bg-black/20 group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 relative">
            <Image
              src={investment.logo}
              alt={`${investment.name} logo`}
              fill
              className="object-contain opacity-80 group-hover:opacity-100 transition-opacity"
            />
          </div>
          <h2 className="text-base font-medium text-gray-200 group-hover:text-white transition-colors">
            {investment.name}
          </h2>
        </div>
        <span className="px-2 py-0.5 bg-gray-800/30 rounded-full text-xs text-gray-300 backdrop-blur-[2px] group-hover:bg-gray-800/40">
          {investment.round}
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5 mt-2.5">
        {investment.sectors.map((sector) => (
          <span
            key={sector}
            className="px-2 py-0.5 bg-gray-800/30 rounded-full text-xs text-gray-400 group-hover:text-gray-300 transition-colors"
          >
            {sector}
          </span>
        ))}
      </div>
    </a>
  );
}

export default function Portfolio() {
  const investments: Investment[] = [
    {
      name: "Mercor",
      round: "Series B",
      sectors: ["HR Tech", "AI"],
      status: "Active",
      logo: "/mercor.png",
      url: "https://mercor.com/"
    },
    // Temporarily removed
    /*{
      name: "Automorphic",
      round: "Series A",
      sectors: ["DevTools", "AI"],
      status: "Active",
      logo: "/automorphic.png",
      url: "https://automorphic.ai/"
    }*/
  ];

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

        <div className="max-w-2xl mx-auto px-6 py-12">
          <h1 className="text-6xl font-bold mb-12 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent text-center pb-4">
            Angel Portfolio
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {investments.map((investment) => (
              <InvestmentCard key={investment.name} investment={investment} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}