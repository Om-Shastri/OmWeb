'use client';

import React, { createContext, useContext, useState } from 'react';

interface SplineContextType {
  spline: unknown;
  setSpline: (spline: unknown) => void;
}

const SplineContext = createContext<SplineContextType | null>(null);

export function SplineProvider({ children }: { children: React.ReactNode }) {
  const [spline, setSpline] = useState<unknown | null>(null);

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