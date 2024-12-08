'use client';

import { useEffect, useState, useRef } from 'react';

export default function DynamicCursorAura() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ dx: 0, dy: 0 });
  const [shape, setShape] = useState({ width: 150, height: 150 });
  const [intensity, setIntensity] = useState(0);
  const lastPos = useRef({ x: 0, y: 0 });
  const lastUpdate = useRef(Date.now());
  const trail = useRef<Array<{ x: number; y: number; intensity: number }>>([]);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      const now = Date.now();
      const dt = (now - lastUpdate.current) / 1000;
      
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy) / dt;
      const angle = Math.atan2(dy, dx);
      
      // Smoother velocity updates with more damping
      setVelocity(prev => ({
        dx: dx * 0.3 + prev.dx * 0.7,
        dy: dy * 0.3 + prev.dy * 0.7
      }));

      // Gentler shape deformation
      const baseSize = 120;
      const stretchFactor = Math.min(Math.abs(speed) * 0.15, 50);
      
      setShape({
        width: baseSize + stretchFactor * Math.cos(angle),
        height: baseSize + stretchFactor * Math.sin(angle)
      });
      
      // Reduced base intensity and smoother scaling
      const baseIntensity = 0.08;
      const speedFactor = Math.min(speed * 0.002, 0.12);
      const newIntensity = baseIntensity + speedFactor;
      setIntensity(prev => prev * 0.8 + newIntensity * 0.2);
      
      // Softer trail with fewer points
      trail.current.unshift({
        x: e.clientX,
        y: e.clientY,
        intensity: newIntensity * 0.4
      });
      trail.current = trail.current.slice(0, 2);

      lastPos.current = { x: e.clientX, y: e.clientY };
      lastUpdate.current = now;
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const fadeEffect = setInterval(() => {
      setIntensity(prev => Math.max(prev * 0.95, 0));
    }, 20);

    window.addEventListener('mousemove', updatePosition);
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      clearInterval(fadeEffect);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-30">
      {/* Main aura */}
      <div 
        className="absolute inset-0 transition-all duration-150 ease-out"
        style={{
          background: `
            radial-gradient(
              ${shape.width}px ${shape.height}px at ${position.x}px ${position.y}px,
              rgba(255, 255, 255, ${intensity}),
              rgba(255, 255, 255, ${intensity * 0.3}) 35%,
              rgba(255, 255, 255, ${intensity * 0.1}) 55%,
              transparent 85%
            )
          `
        }}
      />
      
      {/* Subtle inner core */}
      <div 
        className="absolute inset-0 transition-all duration-100 ease-out"
        style={{
          background: `
            radial-gradient(
              ${shape.width * 0.4}px ${shape.height * 0.4}px at ${position.x}px ${position.y}px,
              rgba(255, 255, 255, ${intensity * 0.6}),
              transparent 85%
            )
          `
        }}
      />

      {/* Soft trail */}
      {trail.current.map((point, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-all duration-200"
          style={{
            background: `
              radial-gradient(
                80px at ${point.x}px ${point.y}px,
                rgba(255, 255, 255, ${point.intensity * Math.pow(0.4, i)}),
                transparent 85%
              )
            `
          }}
        />
      ))}
    </div>
  );
}