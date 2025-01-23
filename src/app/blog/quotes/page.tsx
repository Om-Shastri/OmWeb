"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import SettingsControl from '../../components/Settings';

interface Quote {
  text: string;
  author: string;
  source?: string;
  year?: string;
}

const quotes: Quote[] = [
  {
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
    year: "1971"
  },
  {
    text: "The future is already here – it's just not evenly distributed.",
    author: "William Gibson",
    year: "1993"
  },
  {
    text: "Move fast and break things. Unless you are breaking stuff, you are not moving fast enough.",
    author: "Mark Zuckerberg",
    year: "2009"
  },
  {
    text: "Intelligence is the ability to avoid doing work, yet getting the work done.",
    author: "Linus Torvalds",
    year: "2006"
  },
  {
    text: "The computer was born to solve problems that did not exist before.",
    author: "Bill Gates",
    year: "1985"
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
          {quote.source && (
            <div className="mt-2 text-gray-500">
              {quote.source}
            </div>
          )}
        </footer>
      </blockquote>
    </div>
  );
}

export default function Quotes() {
  return (
    <main className="min-h-screen">
      <div className="relative z-10">
        <nav className="p-6 flex justify-between items-center">
          <Link 
            href="/blog" 
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
            Favorite Quotes
          </h1>

          <div className="space-y-6">
            {quotes.map((quote, index) => (
              <QuoteCard key={index} quote={quote} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 