"use client";

import React from "react";
import { Twitter, FileText, Github, Linkedin, Folder } from "lucide-react";
import Spline from "@splinetool/react-spline/next";
import Link from "next/link";

const Background = () => {
  return (
    <Spline
      scene="https://prod.spline.design/28NJ03GramK8JYaV/scene.splinecode"
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
      <Background />

      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <h1 className="text-5xl font-bold mb-8 text-white hover:text-gray-200 transition-colors duration-300">
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
                  className="transform transition-transform hover:scale-110 hover:-translate-y-1 text-white hover:text-gray-200"
                  aria-label={label}
                >
                  <Icon
                    size={32}
                    className="text-white hover:text-gray-200 transition-colors duration-300"
                  />
                </a>
              );
            } else {
              return (
                <Link
                  key={label}
                  href={href}
                  className="transform transition-transform hover:scale-110 hover:-translate-y-1 text-white hover:text-gray-200"
                  aria-label={label}
                >
                  <Icon
                    size={32}
                    className="text-white hover:text-gray-200 transition-colors duration-300"
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
