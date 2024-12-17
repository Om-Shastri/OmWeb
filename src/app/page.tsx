'use client';

import React from "react";
import { Folder } from "lucide-react";
import Link from "next/link";
import { XLogo } from './components/XLogo';
import { LinkedInLogo } from './components/LinkedInLogo';
import { GitHubLogo } from './components/GitHubLogo';
import { BlogLogo } from './components/BlogLogo';

const TechText = ({ text }: { text: string }) => {
  return (
    <div className="relative">
      <h1 
        className="text-7xl font-extrabold tracking-wider" 
        style={{
          fontFamily: "'Playfair Display', serif",
          background: `
            linear-gradient(
              90deg,
              #E8E8E8 0%,
              #FFFFFF 15%,
              #F5F5F5 25%,
              #FAFAFA 35%,
              #E0E0E0 45%,
              #FFFFFF 55%,
              #D8D8D8 65%,
              #F0F0F0 75%,
              #E6E6E6 85%,
              #FFFFFF 100%
            )
          `,
          backgroundSize: '400% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '0.05em',
          animation: 'silverflow 8s linear infinite',
          filter: 'drop-shadow(0 1px 2px rgba(150,150,150,0.2))'
        }}
      >
        {text}
      </h1>
      <style jsx>{`
        @keyframes silverflow {
          0% {
            background-position: 0% 50%;
            filter: brightness(100%) contrast(100%);
          }
          50% {
            background-position: 100% 50%;
            filter: brightness(110%) contrast(110%);
          }
          100% {
            background-position: 0% 50%;
            filter: brightness(100%) contrast(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default function Home() {
  const links = [
    {
      icon: XLogo,
      href: "https://x.com/OmShastri123",
      label: "X",
      isExternal: true,
    },
    {
      icon: LinkedInLogo,
      href: "https://linkedin.com/in/omshastri",
      label: "LinkedIn",
      isExternal: true,
    },
    {
      icon: GitHubLogo,
      href: "https://github.com/Om-Shastri",
      label: "GitHub",
      isExternal: true,
    },
    {
      icon: BlogLogo,
      href: "/blog",
      label: "Omnibus",
      isExternal: false,
    },
    {
      icon: Folder,
      href: "/portfolio",
      label: "Portfolio",
      isExternal: false,
      prefetch: true,
    },
  ];

  return (
    <main className="relative min-h-screen">
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <TechText text="Om Shastri" />

        <div className="flex items-center justify-center space-x-8 mt-16">
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
                className="transform hover:scale-105 transition-all duration-200"
                aria-label={label}
              >
                <div 
                  style={{
                    color: '#E8E8E8',
                    filter: 'drop-shadow(0 1px 2px rgba(150,150,150,0.2))',
                    transition: 'all 0.2s ease'
                  }}
                  className="hover:brightness-125 flex items-center justify-center"
                >
                  <Icon size={32} />
                </div>
              </LinkComponent>
            );
          })}
        </div>
      </div>
    </main>
  );
}