'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
}

const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    <div className="group relative p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm hover:from-white/10 hover:to-white/15 transition-all duration-300">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
        {post.title}
      </h2>
      
      <p className="text-gray-400 mb-4 line-clamp-2">
        {post.excerpt}
      </p>
      
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Calendar size={14} />
          <span>{post.date}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={14} />
          <span>{post.readTime}</span>
        </div>
      </div>
      
      <div className="mt-4 flex gap-2 flex-wrap">
        {post.tags.map(tag => (
          <span 
            key={tag}
            className="px-2 py-1 text-xs rounded-full bg-white/10 text-gray-300"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <Link 
        href={`/blog/${post.slug}`}
        className="absolute inset-0 rounded-xl ring-1 ring-white/10 hover:ring-white/20 transition-all duration-300"
        aria-label={`Read ${post.title}`}
      />
    </div>
  );
};

export default function Blog() {
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

        <div className="max-w-5xl mx-auto px-6 py-12">
          <h1 className="text-6xl font-bold mb-16 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent text-center pb-4">
            Omnibus
          </h1>

          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Coming Soon
              </h2>
              <p className="text-gray-400">
                Exciting content is being curated. Check back soon!
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 