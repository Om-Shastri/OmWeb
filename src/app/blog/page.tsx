'use client';
//test

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Maximize2 } from 'lucide-react';
import venturingIntoUnknownContent from './text/investinginunknown.txt';
import llmSteganographyContent from './text/llmsteganography.txt';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import SettingsControl from '../components/Settings';
import processRewardModelsContent from './text/processrewardmodels.txt';

interface Quote {
  text: string;
  author: string;
  year?: string;
}

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime?: string;
  category: 'Research' | 'Investing' | 'Projects' | 'Literature' | 'Quotes';
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
  const [isFullScreen, setIsFullScreen] = useState(false);

  const renderFormula = (formula: string, isBlock = false) => {
    try {
      return isBlock ? (
        <div className="my-4 overflow-x-auto">
          <BlockMath math={formula} />
        </div>
      ) : (
        <InlineMath math={formula} />
      );
    } catch {
      return <code>{formula}</code>;
    }
  };

  const renderContent = () => {
    if (post.category === 'Literature') {
      const paragraphs = post.excerpt.split(/\n\s*\n/);
      
      return (
        <div className="space-y-6">
          {paragraphs.map((paragraph, index) => {
            const trimmedParagraph = paragraph.trim();
            if (!trimmedParagraph) return null;

            // Handle code blocks
            if (trimmedParagraph.startsWith('```') && trimmedParagraph.endsWith('```')) {
              return (
                <pre key={index} className="bg-gray-900/50 p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm text-gray-300">
                    {trimmedParagraph.slice(3, -3)}
                  </code>
                </pre>
              );
            }

            // Handle math blocks
            if (trimmedParagraph.startsWith('$$') && trimmedParagraph.endsWith('$$')) {
              return (
                <div key={index} className="my-4">
                  {renderFormula(trimmedParagraph.slice(2, -2), true)}
                </div>
              );
            }

            if (trimmedParagraph.endsWith(':')) {
              return (
                <h3 key={index} className="text-base font-medium text-gray-200 mt-6 mb-3">
                  {trimmedParagraph}
                </h3>
              );
            }

            // Handle bullet points
            if (trimmedParagraph.startsWith('- ')) {
              return (
                <div key={index} className="pl-4 text-gray-300 text-sm font-normal leading-relaxed">
                  • {trimmedParagraph.slice(2).split('$').map((part, i) => 
                    i % 2 === 0 ? part : renderFormula(part)
                  )}
                </div>
              );
            }

            // Handle numbered lists
            if (/^\d+\.\s/.test(trimmedParagraph)) {
              return (
                <div key={index} className="pl-6 space-y-2">
                  <p className="text-gray-300 text-sm font-normal leading-relaxed">
                    {trimmedParagraph.split('$').map((part, i) => 
                      i % 2 === 0 ? part : renderFormula(part)
                    )}
                  </p>
                </div>
              );
            }
            
            // Regular paragraphs with inline math
            return (
              <p key={index} className="text-gray-300 text-sm font-normal leading-relaxed">
                {trimmedParagraph.split('$').map((part, i) => 
                  i % 2 === 0 ? part : renderFormula(part)
                )}
              </p>
            );
          })}
        </div>
      );
    }

    return (
      <p className="text-gray-300 text-sm font-normal leading-relaxed">
        {post.excerpt}
      </p>
    );
  };

  const handleFullScreenToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFullScreen(!isFullScreen);
    setIsExpanded(true);
  };

  console.log('Post category:', post.category);

  return (
    <div 
      className={`block border border-gray-800/40 rounded-md p-6 transition-all duration-300 ease-in-out 
        ${isFullScreen 
          ? 'fixed left-[5%] right-[5%] top-[5%] bottom-[5%] z-50 overflow-y-auto bg-black rounded-xl' 
          : 'bg-black/10 backdrop-blur-[2px] hover:bg-black/20 hover:border-gray-600/60'
        } group cursor-pointer`}
      style={{
        transitionProperty: 'all, background-color',
        transitionDuration: '300ms'
      }}
      onClick={() => !isFullScreen && setIsExpanded(!isExpanded)}
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-base font-medium text-gray-200 group-hover:text-white transition-colors">
          {post.title}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handleFullScreenToggle}
            className="p-1 hover:bg-gray-800/40 rounded-full transition-colors"
            aria-label="Toggle fullscreen"
          >
            <Maximize2 size={16} className="text-gray-400 hover:text-white" />
          </button>
          <span className="px-2 py-0.5 bg-gray-800/30 rounded-full text-xs text-gray-300 backdrop-blur-[2px] group-hover:bg-gray-800/40">
            {post.association || post.category}
          </span>
        </div>
      </div>
      <p className="text-sm text-gray-400 mb-2.5">
        {post.date}{post.readTime && ` · ${post.readTime}`}
      </p>
      <div className={`${isFullScreen ? '' : isExpanded ? '' : 'line-clamp-3'} mb-2.5 overflow-hidden`}>
        {renderContent()}
      </div>
      {!isFullScreen && (
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
      )}
      {(post as ProjectPost).links && (
        <div 
          className="flex gap-2 mt-3 pt-3 border-t border-gray-800/30"
          onClick={(e) => e.stopPropagation()}
        >
          {Object.entries((post as ProjectPost).links!).map(([type, url]) => (
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

function ProjectCard({ post }: { post: ProjectPost }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreenToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFullScreen(!isFullScreen);
    setIsExpanded(true);
  };

  return (
    <div 
      className={`border border-gray-800/40 rounded-md p-4 transition-all duration-300 ease-in-out 
        ${isFullScreen 
          ? 'fixed left-[5%] right-[5%] top-[5%] bottom-[5%] z-50 overflow-y-auto bg-black rounded-xl' 
          : 'bg-black/10 backdrop-blur-[2px] hover:bg-black/20 hover:border-gray-600/60'
        } group cursor-pointer`}
      style={{
        transitionProperty: 'all, background-color',
        transitionDuration: '300ms'
      }}
      onClick={() => !isFullScreen && setIsExpanded(!isExpanded)}
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-base font-medium text-gray-200 group-hover:text-white transition-colors">
          {post.title}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handleFullScreenToggle}
            className="p-1 hover:bg-gray-800/40 rounded-full transition-colors"
            aria-label="Toggle fullscreen"
          >
            <Maximize2 size={16} className="text-gray-400 hover:text-white" />
          </button>
          {post.association && (
            <span className="px-2 py-0.5 bg-gray-800/30 rounded-full text-xs text-gray-300 backdrop-blur-[2px] group-hover:bg-gray-800/40">
              {post.association}
            </span>
          )}
        </div>
      </div>
      <p className="text-sm text-gray-400 mb-2.5">
        {post.date}{post.readTime && ` · ${post.readTime}`}
      </p>
      <p className={`text-sm text-gray-300 ${isExpanded ? '' : 'line-clamp-2'} mb-2.5`}>
        {post.excerpt.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < post.excerpt.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </p>
      {!isFullScreen && (
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
      )}
      
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

const quotes: Quote[] = [
  {
    text: "Don't worry about what anybody else is going to do. The best way to predict the future is to invent it.",
    author: "Alan Kay",
    year: "1971"
  },
  {
    text: "The more I think about language, the more it amazes me that people ever understand each other at all.",
    author: "Kurt Gödel",
    year: "1906"
  },
  {
    text: "I don't think success is complicated; if you do something that works, then it is a success.",
    author: "Peter Thiel",
    year: "2014"
  },
  {
    text: "In labouring to be concise, I become obscure.",
    author: "Horace",
    year: "20 BC"
  },
  {
    text: "Here we are, trapped in the amber of the moment. There is no why.",
    author: "Kurt Vonnegut",
    year: "1973"
  },
  {
    text: "Short words are best and the old words when short are best of all.",
    author: "Winston Churchill",
    year: "1940"
  },
  {
    text: "If you can imagine someone surpassing you, you should do it yourself.",
    author: "Paul Graham",
    year: "2004"
  },
  {
    text: "Not all treasure is silver and gold, mate.",
    author: "Jack Sparrow",
    year: "2003"
  }
];

function QuoteCard({ quote }: { quote: Quote }) {
  return (
    <div className="p-6 border border-gray-800/40 rounded-lg bg-black/10 backdrop-blur-sm hover:bg-black/20 transition-all duration-300 group">
      <blockquote className="space-y-4">
        <p className="text-lg text-gray-200 leading-relaxed italic">
          &ldquo;{quote.text}&rdquo;
        </p>
        <footer className="text-sm">
          <cite className="text-gray-400 not-italic font-medium flex items-center gap-3">
            <span>{quote.author}</span>
            {quote.year && (
              <span className="text-gray-500 border border-gray-800 px-2 py-0.5 rounded-full text-xs">
                {quote.year}
              </span>
            )}
          </cite>
        </footer>
      </blockquote>
    </div>
  );
}

export default function Blog() {
  const [activeTab, setActiveTab] = useState<'Research' | 'Investing' | 'Projects' | 'Literature' | 'Quotes'>('Projects');

  const posts: (BlogPost | ProjectPost)[] = [
    {
      title: "Neural Whispers: The Steganography of LLMs",
      excerpt: llmSteganographyContent,
      date: "December 2024",
      readTime: "6 min read",
      category: "Literature",
      tags: ["AI", "Security", "Cryptography"],
      slug: "llm-steganography",
      association: "IBM Research",
      links: {
        paper: "https://arxiv.org/abs/2311.09688"
      }
    } as ProjectPost,
    {
      title: "Venturing Beyond Certainty: Zeckhauser's Unknown",
      excerpt: venturingIntoUnknownContent,
      date: "December 2024",
      readTime: "8 min read",
      category: "Literature",
      tags: ["Investing", "Decision Making", "Risk"],
      slug: "venturing-into-unknown",
      association: "TBA",
      links: {
        paper: "https://scholar.harvard.edu/files/rzeckhauser/files/investing_in_unknown_and_unknowable.pdf"
      }
    } as BlogPost,
    // Investing Posts
    // {
    //   title: "Why I Angeled Into Mercor: Revolutionizing Hiring with AI",
    //   excerpt: "When three Thiel Fellows dropped out of Harvard and Georgetown to build an AI hiring platform, they weren't just creating another HR tool – they were reimagining how talent is discovered. Mercor's AI models have already analyzed thousands of candidates, but what truly caught my attention was their contrarian approach: offering enterprise-grade interview feedback freely to everyone, using this data flywheel to build increasingly sophisticated hiring models. With backing from Peter Thiel, Jack Dorsey, and Adam D'Angelo, Mercor is positioned to transform hiring from a biased, inefficient process into a true meritocracy powered by AI.",
    //   date: "December 2024",
    //   readTime: "2 min read",
    //   category: "Investing",
    //   tags: ["Startups", "AI", "HR Tech"],
    //   slug: "why-i-invested-in-mercor",
    //   association: "Angel Investment",
    //   links: {
    //     website: "https://mercor.com/"
    //   }
    // },
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
      title: "Semantic PRMs",
      excerpt: processRewardModelsContent,
      date: "December 2024",
      readTime: "5 min read",
      category: "Projects",
      tags: ["AI", "LLM", "NLP"],
      slug: "process-reward-models-nyt-connections",
      association: "Research Project",
      links: {
        Data: "https://huggingface.co/datasets/Om-Shastri/prmupdated_dataset",
        Model: "https://huggingface.co/Om-Shastri/llama-3.1-8b-Reward-NTY"
      }
    } as ProjectPost,
    {
      title: "A Hitchhiker's Guide to X",
      excerpt: "xAI Hackathon Winner; Grok's embedding model transforms Twitter/X posts into a personalized, ever-expanding knowledge graph that lets users explore ideas and insights in depth, sparking new inspirations.",
      date: "October 2024",
      readTime: "1 min read",
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
      readTime: "1 min read",
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
      readTime: "1 min read",
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
      readTime: "1 min read",
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
      excerpt: "Edge computing device that combines real-time wingbeat sound recognition with satellite data to track and predict malaria & dengue outbreaks. The system uses a novel ML architecture optimized for edge deployment, achieving 86% accuracy in species identification while consuming minimal power. Deployed in pilot programs across Southeast Asia, enabling early warning systems for disease control agencies.",
      date: "August 2021 - October 2022",
      readTime: "1 min read",
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
      readTime: "1 min read",
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
        <nav className="p-6 flex justify-between items-center">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white hover:text-white transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft size={24} strokeWidth={1.5} />
          </Link>
          <div className="flex items-center gap-2">
            <SettingsControl />
          </div>
        </nav>

        <div className="max-w-3xl mx-auto px-6 py-12">
          <h1 className="text-6xl font-bold mb-12 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent text-center pb-4">
            Omnibus
          </h1>

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
            <TabButton 
              active={activeTab === 'Quotes'} 
              onClick={() => setActiveTab('Quotes')}
            >
              Quotes
            </TabButton>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {activeTab === 'Quotes' ? (
              <div className="space-y-6">
                {quotes.map((quote, index) => (
                  <QuoteCard key={index} quote={quote} />
                ))}
              </div>
            ) : (
              filteredPosts.map((post) => (
                post.category === 'Literature' || post.category === 'Investing' || 
                (post.category === 'Research' && !('links' in post)) ? (
                  <BlogCard key={post.slug} post={post} />
                ) : (
                  <ProjectCard key={post.slug} post={post as ProjectPost} />
                )
              ))
            )}
            {activeTab !== 'Quotes' && filteredPosts.length === 0 && (
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