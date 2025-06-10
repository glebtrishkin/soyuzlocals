import React from 'react';
import { Link } from 'react-router-dom';
import InteractiveHero from '../components/InteractiveHero';

function About() {
  return (
    <>
      <InteractiveHero imageSrc="/ASSETS/DSC04537.jpg" />

      {/* Fullscreen bold text section */}
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="text-center space-y-8 md:space-y-12 lg:space-y-16">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-black leading-tight tracking-wider">
            ГОРОД.
          </h1>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-black leading-tight tracking-wider">
            ЛЮДИ.
          </h1>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-black leading-tight tracking-wider">
            ОДЕЖДА.
          </h1>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-black leading-tight tracking-wider">
            ЛЮБОВЬ.
          </h1>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-black leading-tight tracking-wider">
            СОЮЗ.
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-center">
          <Link
            to="/shop"
            className="inline-flex items-center justify-center px-8 py-2 text-sm font-medium tracking-wider text-black bg-white border border-black uppercase"
          >
            Магазин
          </Link>
        </div>
      </div>
    </>
  );
}

export default About;