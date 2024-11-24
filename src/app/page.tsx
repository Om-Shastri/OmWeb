"use client";

import React from 'react';
import { Twitter, FileText, Github, Linkedin, Folder } from 'lucide-react';
import Spline from '@splinetool/react-spline/next';
import Link from 'next/link';

const Background = () => {
  return (
    <Spline
      scene="https://prod.spline.design/Fm2oH0q1qSQyzm0J/scene.splinecode"
      className="fixed top-0 left-0 w-full h-full -z-20"
    />
  );
};

export default function Home() {
  const links = [
    {
      icon: Twitter,
      href: "https://x.com/OmShastri123",
      label: "Twitter",
      isExternal: true
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/omshastri",
      label: "LinkedIn",
      isExternal: true
    },
    {
      icon: Github,
      href: "https://github.com/Om-Shastri",
      label: "GitHub",
      isExternal: true
    },
    {
      icon: FileText,
      href: "/resume.pdf",
      label: "Resume",
      isExternal: true
    },
    {
      icon: Folder,
      href: "/portfolio",
      label: "Portfolio",
      isExternal: false
    }
  ];

  return (
    <main className="relative min-h-screen">
      <Background />
      
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-red-500 to-teal-500 bg-clip-text text-transparent animate-gradient">
          Om Shastri
        </h1>
        
        <div className="flex space-x-8">
          {links.map(({ icon: Icon, href, label, isExternal }) => {
            if (isExternal) {
              return (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform transition-transform hover:scale-110 hover:-translate-y-1 text-2xl text-gray-300"
                  aria-label={label}
                >
                  <Icon 
                    size={32}
                    className="text-gray-300 hover:text-gray-200 transition-colors"
                  />
                </a>
              );
            } else {
              return (
                <Link
                  key={label}
                  href={href}
                  className="transform transition-transform hover:scale-110 hover:-translate-y-1 text-2xl text-gray-300"
                  aria-label={label}
                >
                  <Icon 
                    size={32}
                    className="text-gray-300 hover:text-gray-200 transition-colors"
                  />
                </Link>
              );
            }
          })}
        </div>
      </div>
    </main>
  );
}