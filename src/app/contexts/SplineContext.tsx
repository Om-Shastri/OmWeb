'use client';

import React, { createContext, useContext, useState } from 'react';
import type Spline from '@splinetool/react-spline';

interface SplineContextType {
  spline: any | null;
  setSpline: (spline: any) => void;
}

const SplineContext = createContext<SplineContextType | null>(null);

export function SplineProvider({ children }: { children: React.ReactNode }) {
  const [spline, setSpline] = useState<any | null>(null);

  return (
    <SplineContext.Provider value={{ spline, setSpline }}>
      {children}
    </SplineContext.Provider>
  );
}

export function useSpline() {
  const context = useContext(SplineContext);
  if (!context) {
    throw new Error('useSpline must be used within a SplineProvider');
  }
  return context;
} 