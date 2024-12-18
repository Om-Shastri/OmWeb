'use client';

import Spline from "@splinetool/react-spline";
import { useSpline } from '../contexts/SplineContext';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function SplineBackground() {
  const { spline, setSpline } = useSpline();
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.position = 'fixed';
    }

    const removeWatermark = () => {
      const watermarkElement = document.querySelector('a[href*="spline"]');
      if (watermarkElement) {
        watermarkElement.remove();
      }
    };

    removeWatermark();

    const observer = new MutationObserver(() => {
      removeWatermark();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, [pathname]);

  const onLoad = (splineApp: unknown) => {
    if (!spline) {
      setSpline(splineApp);
    }
  };

  return (
    <div ref={containerRef} className="fixed top-0 left-0 w-full h-full -z-20 opacity-40">
      <Spline 
        scene="https://prod.spline.design/28NJ03GramK8JYaV/scene.splinecode"
        onLoad={onLoad}
      />
    </div>
  );
} 