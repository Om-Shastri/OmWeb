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
  association?: string;
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
          {(post as ProjectPost).association || post.category}
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
      title: "Why I Angeled Into Mercor: Revolutionizing Hiring with AI",
      excerpt: "When three Thiel Fellows dropped out of Harvard and Georgetown to build an AI hiring platform, they weren't just creating another HR tool – they were reimagining how talent is discovered. Mercor's AI models have already analyzed thousands of candidates, but what truly caught my attention was their contrarian approach: offering enterprise-grade interview feedback freely to everyone, using this data flywheel to build increasingly sophisticated hiring models. With backing from Peter Thiel, Jack Dorsey, and Adam D'Angelo, Mercor is positioned to transform hiring from a biased, inefficient process into a true meritocracy powered by AI.",
      date: "December 2024",
      readTime: "4 min read",
      category: "Investing",
      tags: ["Startups", "AI", "HR Tech"],
      slug: "why-i-invested-in-mercor",
      association: "Angel Investment"
    },
    // Temporarily removed
    /*{
      title: "Why I Angeled Into Automorphic: Democratizing LLM Development",
      excerpt: "I first met Govind during a NASA internship when we were 16 – he was already building neural nets while the rest of us were still learning Python. Several years later, when he and his Georgia Tech roommates were building a platform to turn months-long LLM development into a minutes-long workflow, I knew I had to be involved. Their contrarian bet? That specialized, efficient LLMs will outperform massive models. Their platform enables developers to infuse domain knowledge with just 10 examples, and with backing from Paul Graham, Govind becoming a Thiel Fellow, and joining YC S23, Automorphic is proving that sometimes, smaller and smarter beats bigger.",
      date: "August 2023",
      readTime: "5 min read",
      category: "Investing",
      tags: ["Startups", "AI", "DevTools"],
      slug: "why-i-invested-in-automorphic",
      association: "Angel Investment"
    },*/

    // Project Posts (keep existing project posts)
    {
      title: "A Hitchhiker's Guide to X",
      excerpt: "xAI Hackathon Winner; Grok's embedding model transforms Twitter/X posts into a personalized, ever-expanding knowledge graph that lets users explore ideas and insights in depth, sparking new inspirations.",
      date: "October 2024",
      readTime: "Project",
      category: "Projects",
      tags: ["AI", "LLM", "Knowledge Graphs"],
      slug: "hitchhikers-guide-to-x",
      association: "xAI Hackathon",
      links: {
        github: "https://github.com/alex-vesel/xai-hackathon",
        demo: "https://www.youtube.com/watch?v=8Sq7pVOZddM"
      }
    },
    {
      title: "PlanForm",
      excerpt: "Empowering educators with AI-driven, one click personalization, PlanForm transforms students' learning experiences through dynamic personalization of activities powered by fine-tuned LLMs.",
      date: "June 2024 - September 2024",
      readTime: "Project",
      category: "Projects",
      tags: ["AI", "LLM", "EdTech"],
      slug: "planform",
      association: "Venture",
      links: {
        website: "https://planform.app",
        demo: "https://www.youtube.com/watch?v=1vhO_FuPjrs"
      }
    },
    {
      title: "Rabbit-Hole",
      excerpt: "Rabbit-Hole is an AI-driven learning tool that simulates the immersive experience of \"going down a rabbit hole,\" guiding users through layered topics and questions adapting to user curiosity by continuously offering deeper insights and related content. The tool integrates with a text-to-Manim model, enabling visual learning through educational animations.",
      date: "September 2024",
      readTime: "Project",
      category: "Projects",
      tags: ["AI", "LLM", "EdTech"],
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
      tags: ["Astronomy", "Robotics", "Instrumentation"],
      slug: "picsarr-polarimeter",
      association: "MNRAS",
      links: {
        paper: "https://arxiv.org/abs/2301.09782"
      }
    } as ProjectPost,
    {
      title: "MOSQUITO EDGE: An Edge-Intelligent Real-Time Mosquito Threat Prediction Using an IoT-Enabled Hardware System",
      excerpt: "Edge computing device with wingbeat sound recognition & real time satellite data for real-time malaria & dengue tracking.",
      date: "August 2021 - October 2022",
      readTime: "Research Paper",
      category: "Research",
      tags: ["AI", "Edge Computing", "Robotics"],
      slug: "mosquito-edge",
      association: "MDPI",
      links: {
        poster: "https://drive.google.com/file/d/1xhdNR8FCIJGqksykH5KliomueXmd2JuX/view?usp=sharing",
        paper: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8780188/"
      }
    } as ProjectPost,
    {
      title: "Hephaestus Robotics",
      excerpt: "Led a team of 12 to design and build an underwater ROV (Remotely Operated Vehicle) for marine research and conservation. The ROV features advanced capabilities including 3D scanning of coral reefs, laser-based distance measurement, and precision manipulation tools.",
      date: "December 2020 - June 2023",
      readTime: "Project",
      category: "Projects",
      tags: ["AI", "Robotics", "Computer Vision"],
      slug: "hephaestus-robotics",
      association: "MATE ROV",
      links: {
        paper: "https://20693798.fs1.hubspotusercontent-na1.net/hubfs/20693798/RN19%20X_Academy_Hephaestus_Robotics_TECHNICAL_DOCUMENTATION_2023.pdf"
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
          <p className="text-gray-400 text-center mb-12 w-full mx-auto">
            This space is for those who, like me, are deeply curious about the future.
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