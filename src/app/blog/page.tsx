'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: 'Research' | 'Investing' | 'Projects' | 'Literature';
  tags: string[];
  slug: string;
}

interface ProjectPost extends BlogPost {
  links?: {
    demo?: string;
    github?: string;
    website?: string;
    poster?: string;
    paper?: string;
  };
  association?: string;
}

function BlogCard({ post }: { post: BlogPost }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="block border border-gray-800/40 rounded-md p-4 hover:border-gray-600/60 transition-all duration-300 bg-black/10 backdrop-blur-[2px] hover:bg-black/20 group cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-base font-medium text-gray-200 group-hover:text-white transition-colors">
          {post.title}
        </h2>
        <span className="px-2 py-0.5 bg-gray-800/30 rounded-full text-xs text-gray-300 backdrop-blur-[2px] group-hover:bg-gray-800/40">
          {post.category}
        </span>
      </div>
      <p className="text-sm text-gray-400 mb-2.5">
        {post.date} · {post.readTime}
      </p>
      <p className={`text-sm text-gray-300 ${isExpanded ? '' : 'line-clamp-2'} mb-2.5`}>
        {post.excerpt}
      </p>
      <div className="flex flex-wrap items-center justify-between gap-1.5">
        <div className="flex flex-wrap items-center gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-gray-800/30 rounded-full text-xs text-gray-400 group-hover:text-gray-300 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="px-2 py-0.5 bg-gray-800/30 rounded-full text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
          {isExpanded ? '↑ Less' : '↓ More'}
        </span>
      </div>
    </div>
  );
}

function ProjectCard({ post }: { post: ProjectPost }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="border border-gray-800/40 rounded-md p-4 hover:border-gray-600/60 transition-all duration-300 bg-black/10 backdrop-blur-[2px] hover:bg-black/20 group cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-base font-medium text-gray-200 group-hover:text-white transition-colors">
          {post.title}
        </h2>
        {post.association && (
          <span className="px-2 py-0.5 bg-gray-800/30 rounded-full text-xs text-gray-300 backdrop-blur-[2px] group-hover:bg-gray-800/40">
            {post.association}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-400 mb-2.5">
        {post.date}
      </p>
      <p className={`text-sm text-gray-300 ${isExpanded ? '' : 'line-clamp-2'} mb-2.5`}>
        {post.excerpt}
      </p>
      <div className="flex flex-wrap items-center justify-between gap-1.5">
        <div className="flex flex-wrap items-center gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-gray-800/30 rounded-full text-xs text-gray-400 group-hover:text-gray-300 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="px-2 py-0.5 bg-gray-800/30 rounded-full text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
          {isExpanded ? '↑ Less' : '↓ More'}
        </span>
      </div>
      
      {post.links && (
        <div 
          className="flex gap-2 mt-3 pt-3 border-t border-gray-800/30"
          onClick={(e) => e.stopPropagation()}
        >
          {Object.entries(post.links).map(([type, url]) => (
            <a
              key={type}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-400 hover:text-white transition-colors"
            >
              {type.charAt(0).toUpperCase() + type.slice(1)} →
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function TabButton({ active, onClick, children }: { 
  active: boolean; 
  onClick: () => void; 
  children: React.ReactNode 
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
        active 
          ? 'bg-gray-800/60 text-white' 
          : 'text-gray-400 hover:text-gray-200'
      }`}
    >
      {children}
    </button>
  );
}

export default function Blog() {
  const [activeTab, setActiveTab] = useState<'Research' | 'Investing' | 'Projects' | 'Literature'>('Projects');
  
  const posts: (BlogPost | ProjectPost)[] = [
    // Investing Posts
    {
      title: "Why Mercor's AI-First Hiring Platform Caught My Attention",
      excerpt: "My investment thesis on Mercor: How their AI-driven approach to technical hiring, impressive growth to 7-figure ARR, and ambitious vision for the future of recruitment resonated with me...",
      date: "March 15, 2024",
      readTime: "4 min read",
      category: "Investing",
      tags: ["Angel Investing", "Startups", "AI", "HR Tech"],
      slug: "why-i-invested-in-mercor"
    },
    {
      title: "Betting on Automorphic's Vision for AI Development",
      excerpt: "What drew me to invest in Automorphic: Their innovative approach to LLM knowledge infusion, strong technical founding team, and potential to reshape how we build AI systems...",
      date: "March 10, 2024",
      readTime: "5 min read",
      category: "Investing",
      tags: ["Angel Investing", "Startups", "AI", "DevTools"],
      slug: "investing-in-automorphic"
    },

    // Project Posts (keep existing project posts)
    {
      title: "A Hitchhiker's Guide to 𝕏",
      excerpt: "xAI Hackathon Winner: Built an intelligent knowledge graph system using Grok's embedding model to transform 𝕏 posts into an explorable universe of interconnected ideas and insights, enabling users to navigate the depths of knowledge on the platform.",
      date: "October 2024",
      readTime: "Project",
      category: "Projects",
      tags: ["AI", "LLM", "Python", "Knowledge Graphs"],
      slug: "hitchhikers-guide-to-x",
      association: "xAI Hackathon",
      links: {
        github: "https://github.com/alex-vesel/xai-hackathon",
        demo: "https://www.youtube.com/watch?v=8Sq7pVOZddM"
      }
    },
    {
      title: "PlanForm",
      excerpt: "First-ever AI agent for educators that enables one-click personalization of learning activities. Nova, our AI assistant, helps create and tailor content based on student profiles, interests, and educational performance while maintaining FERPA compliance.",
      date: "June 2024 - September 2024",
      readTime: "Project",
      category: "Projects",
      tags: ["AI", "LLM", "EdTech", "Personalization"],
      slug: "planform",
      association: "Summer Project",
      links: {
        website: "https://planform.app",
        demo: "https://www.youtube.com/watch?v=1vhO_FuPjrs"
      }
    },
    {
      title: "Rabbit-Hole",
      excerpt: "An AI learning companion that recreates the experience of diving deep into fascinating topics. Features dynamic content generation and a novel text-to-Manim model for creating educational animations on the fly.",
      date: "September 2024",
      readTime: "Project",
      category: "Projects",
      tags: ["AI", "LLM", "Python", "Education"],
      slug: "rabbit-hole",
      association: "HackMIT",
      links: {
        demo: "https://www.youtube.com/watch?v=uYTwy9LeCBc"
      }
    },
    {
      title: "PICSARR: High-Precision Polarimetry Using CMOS Image Sensors",
      excerpt: "Developed a compact, high-performance astronomical polarimeter enabling precise measurements of stellar and planetary polarization. The instrument achieves high quantum efficiency and low noise using CMOS detectors, making it ideal for small telescopes up to 1m aperture.",
      date: "January 2023",
      readTime: "Research Paper",
      category: "Research",
      tags: ["Astronomy", "Robotics", "Instrumentation", "Published"],
      slug: "picsarr-polarimeter",
      association: "MNRAS",
      links: {
        paper: "https://arxiv.org/abs/2301.09782"
      }
    } as ProjectPost,
    {
      title: "MosquitoEdge",
      excerpt: "Published research on an edge computing device for real-time mosquito threat prediction. Built an 86% accurate Random Forest model combining wingbeat sound recognition with satellite data to create an early warning system for disease vectors.",
      date: "August 2021 - October 2022",
      readTime: "Research Paper",
      category: "Research",
      tags: ["Robotics", "ML", "Healthcare", "Published"],
      slug: "mosquito-edge",
      association: "NASA",
      links: {
        poster: "https://drive.google.com/file/d/1xhdNR8FCIJGqksykH5KliomueXmd2JuX/view?usp=sharing",
        paper: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8780188/"
      }
    } as ProjectPost,
  ];

  const filteredPosts = posts.filter(post => post.category === activeTab);

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
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent text-center">
            Omnibus
          </h1>
          <p className="text-gray-400 text-center mb-12 max-w-lg mx-auto">
            This space is for those who, like me, are deeply curious in the future.
          </p>

          <div className="flex justify-center gap-2 mb-8 bg-black/20 backdrop-blur-sm p-1 rounded-lg">
            <TabButton 
              active={activeTab === 'Research'} 
              onClick={() => setActiveTab('Research')}
            >
              Research
            </TabButton>
            <TabButton 
              active={activeTab === 'Investing'} 
              onClick={() => setActiveTab('Investing')}
            >
              Investing
            </TabButton>
            <TabButton 
              active={activeTab === 'Projects'} 
              onClick={() => setActiveTab('Projects')}
            >
              Projects
            </TabButton>
            <TabButton 
              active={activeTab === 'Literature'} 
              onClick={() => setActiveTab('Literature')}
            >
              Literature
            </TabButton>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {filteredPosts.map((post) => (
              post.category === 'Investing' || (post.category === 'Research' && !('links' in post)) ? (
                <BlogCard key={post.slug} post={post} />
              ) : (
                <ProjectCard key={post.slug} post={post as ProjectPost} />
              )
            ))}
            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400">No posts yet in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 