import React from 'react';
import { Link } from 'react-router-dom';
import InteractiveHero from '../components/InteractiveHero';

function About() {
  return (
    <>
      <InteractiveHero imageSrc="/ASSETS/DSC04537.jpg" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <section className="flex flex-col items-center text-center">
          <img
            src="/ASSETS/1.png"
            alt="Союз логотип"
            className="w-48 h-auto mb-8"
          />
          <p className="text-lg text-gray-700 mb-4">
            FROM LOCALS WITH LOVE
          </p>
          <p className="text-lg text-gray-700">
          </p>
        </section>

        <div className="flex justify-center mt-12 px-4 pb-16">
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
