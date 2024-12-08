'use client';

import React from "react";
import { Twitter, FileText, Github, Linkedin, Folder } from "lucide-react";
import Spline from "@splinetool/react-spline/next";
import Link from "next/link";

const TechText = ({ text }: { text: string }) => {
  return (
    <div className="relative">
      <h1 className="text-7xl font-extrabold tracking-wide" style={{
        fontFamily: "'Space Grotesk', sans-serif",
        WebkitTextStroke: '1px rgba(255,255,255,0.8)',
        WebkitTextFillColor: 'transparent',
        textShadow: `
          0px 1px 0px rgba(255,255,255,0.3),
          0px 2px 0px rgba(255,255,255,0.2),
          0px 3px 0px rgba(255,255,255,0.1),
          0px 4px 8px rgba(0,0,0,0.6)
        `,
        filter: 'brightness(0.9) contrast(1.2)'
      }}>
        {text.split('').map((char: string, i: number) => (
          <span 
            key={i}
            className="inline-block relative transition-colors duration-200"
            style={{
              transform: `translate3d(0, ${Math.sin(i * 0.5) * 2}px, 0)`,
            }}
          >
            {char}
          </span>
        ))}
      </h1>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
        filter: 'blur(4px)',
        transform: 'translateY(4px)'
      }} />
    </div>
  );
};

export default function Home() {
  const links = [
    {
      icon: Twitter,
      href: "https://x.com/OmShastri123",
      label: "Twitter",
      isExternal: true,
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/omshastri",
      label: "LinkedIn",
      isExternal: true,
    },
    {
      icon: Github,
      href: "https://github.com/Om-Shastri",
      label: "GitHub",
      isExternal: true,
    },
    {
      icon: Folder,
      href: "/portfolio",
      label: "Portfolio",
      isExternal: false,
    },
    {
      icon: FileText,
      href: "https://oshastri.substack.com/?r=2hc232&utm_campaign=pub-share-checklist",
      label: "Blog",
      isExternal: true,
    },
  ];

  return (
    <main className="relative min-h-screen">
      <div className="fixed top-0 left-0 w-full h-full -z-20">
        <Spline scene="https://prod.spline.design/28NJ03GramK8JYaV/scene.splinecode" />
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen p-8 space-y-12">
        <TechText text="Om Shastri" />

        <div className="flex space-x-8">
          {links.map(({ icon: Icon, href, label, isExternal }) => {
            const LinkComponent = isExternal ? 'a' : Link;
            const linkProps = isExternal 
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {};

            return (
              <LinkComponent
                key={label}
                href={href}
                {...linkProps}
                className="transform hover:scale-105 text-white/70 hover:text-white/90 transition-all duration-200"
                aria-label={label}
              >
                <Icon size={32} />
              </LinkComponent>
            );
          })}
        </div>
      </div>
    </main>
  );
}