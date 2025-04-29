import React, { useEffect, useRef, useState } from 'react';
import Logo from './Logo';

interface InteractiveHeroProps {
  imageSrc: string;
  children?: React.ReactNode;
}

function InteractiveHero({ imageSrc, children }: InteractiveHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Calculate movement values based on mouse position
  // Using very small values (0.5% max movement) for subtle effect
  const moveX = isHovering ? (mousePosition.x - 50) * 0.01 : 0;
  const moveY = isHovering ? (mousePosition.y - 50) * 0.01 : 0;

  // Calculate blur values based on mouse position
  const blurStyle = {
    '--blur-x': `${mousePosition.x}%`,
    '--blur-y': `${mousePosition.y}%`,
    '--blur-opacity': isHovering ? '1' : '0.5',
  } as React.CSSProperties;

  return (
    <div 
      ref={containerRef}
      className="relative h-[calc(100vh+20vh)] w-full overflow-hidden"
      style={blurStyle}
    >
      {/* Base image layer with subtle movement */}
      <img
        src={imageSrc}
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out"
        style={{
          transform: `scale(1.02) translate(${moveX}%, ${moveY}%)`,
        }}
      />

      {/* Radial blur layer that follows cursor */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle 30vw at ${mousePosition.x}% ${mousePosition.y}%, transparent 0%, rgba(0, 0, 0, 0.6) 70%)`,
          opacity: isHovering ? 0.8 : 0,
          mixBlendMode: 'multiply'
        }}
      />

      {/* Light glow that follows cursor */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle 15vw at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 255, 255, 0.3) 0%, transparent 70%)`,
          opacity: isHovering ? 0.7 : 0,
          mixBlendMode: 'overlay'
        }}
      />

      {/* Content overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <div className="text-center w-full max-w-[500px] px-4 z-10">
          {children}
        </div>
      </div>
    </div>
  );
}

export default InteractiveHero;