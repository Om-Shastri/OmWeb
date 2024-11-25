"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, Download } from 'lucide-react';

const Resume = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDownload = () => {
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'OmShastri_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Navigation */}
      <nav className="p-6 pl-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-105 origin-left group"
          >
            <Home 
              size={24} 
              className="group-hover:stroke-pink-500 transition-colors duration-300" 
              strokeWidth={1.5}
            />
            <span className="text-lg font-medium">Home</span>
          </Link>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500 rounded-lg hover:bg-pink-600 transition-colors duration-300"
          >
            <Download size={20} />
            <span>Download PDF</span>
          </button>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center p-8">
        <h1 className="text-6xl font-bold mb-8 text-pink-500">Resume</h1>
        
        <div className="bg-[#1a1b26] p-8 rounded-lg shadow-xl w-full max-w-4xl">
          {isClient && (
            <div className="relative w-full" style={{ paddingTop: '141.4%' }}>
              <object
                data="/resume.pdf"
                type="application/pdf"
                className="absolute top-0 left-0 w-full h-full rounded-lg"
              >
                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-[#1a1b26] rounded-lg p-8">
                  <p className="text-center mb-4">
                    Unable to display PDF directly. You can:
                  </p>
                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-pink-500 rounded-lg hover:bg-pink-600 transition-colors duration-300"
                  >
                    <Download size={20} />
                    <span>Download PDF</span>
                  </button>
                </div>
              </object>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resume;