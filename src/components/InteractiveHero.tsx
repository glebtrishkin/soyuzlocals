import React, { ReactNode } from 'react';

interface InteractiveHeroProps {
  children: ReactNode;
  imageSrc: string;
}

function InteractiveHero({ children, imageSrc }: InteractiveHeroProps) {
  return (
    <div className="relative h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageSrc})` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="text-center px-4">
          {children}
        </div>
      </div>
    </div>
  );
}

export default InteractiveHero;