'use client';

import dynamic from 'next/dynamic';

const SplineBackground = dynamic(() => import('./SplineBackground'), {
  ssr: false,
  loading: () => <div className="fixed top-0 left-0 w-full h-full bg-black -z-20" />
});

export default function BackgroundWrapper() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-20">
      <SplineBackground />
    </div>
  );
} 