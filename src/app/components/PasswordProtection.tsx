import React, { useState } from 'react';
import { Lock } from 'lucide-react';

interface PasswordProtectionProps {
  onCorrectPassword: () => void;
}

export default function PasswordProtection({ onCorrectPassword }: PasswordProtectionProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === 'omerta') {
      onCorrectPassword();
    } else {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <h1 className="text-6xl font-bold mb-16 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
        Portfolio
      </h1>
      
      <form onSubmit={handleSubmit} className="relative w-full max-w-sm">
        <div className={`relative group flex items-center ${error ? 'animate-shake' : ''}`}>
          <div className="absolute left-3 text-gray-400">
            <Lock size={20} />
          </div>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full pl-11 pr-4 py-3 bg-gray-900/30 border-0 rounded-lg text-gray-200 
              placeholder-gray-500 focus:outline-none focus:ring-1 
              ${error ? 'ring-1 ring-red-500/50' : 'focus:ring-gray-500'} 
              transition-all duration-200`}
            placeholder="Enter password"
            autoFocus
          />
          <div className={`absolute inset-0 rounded-lg transition-all duration-300
            ${error ? 'ring-1 ring-red-500/50' : 'group-hover:ring-1 group-hover:ring-gray-600/50'}`}
          />
        </div>
        
        {error && (
          <p className="absolute -bottom-6 left-0 w-full text-center text-sm text-red-400/90">
            Incorrect password
          </p>
        )}
      </form>
    </div>
  );
} 