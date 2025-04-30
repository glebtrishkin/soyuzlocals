import React from 'react';
import { Link } from 'react-router-dom';
import InteractiveHero from '../components/InteractiveHero';

function About() {
  return (
    <>
      {/* Hero-блок: как на главной */}
      <InteractiveHero imageSrc="/ASSETS/items/DSC09470.jpg" />

      {/* Контент */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* О нас */}
        <section className="flex flex-col items-center text-center">
          {/* Логотип */}
          <img
            src="/ASSETS/1.png"
            alt="Союз логотип"
            className="w-48 h-auto mb-8"
          />
          {/* Текст под логотипом */}
          <p className="text-lg text-gray-700 mb-4">
            FROM LOCALS WITH LOVE
          </p>
          <p className="text-lg text-gray-700">
            {/* Дополнительный текст сюда */}
          </p>
        </section>

        {/* Кнопка «Магазин» */}
        <div className="flex justify-center mt-12 px-4 pb-16">
          <Link
            to="/shop"
            className="tech-button relative inline-flex items-center justify-center px-8 py-4 uppercase font-medium relative overflow-hidden transition-all duration-700 border border-black"
          >
            <span className="text-fade relative z-10 w-full text-center tracking-widest">
              Магазин
            </span>
            <img
              src="/ASSETS/items/союз лого пнг.png"
              alt="Союз лого"
              className="logo-reveal w-full h-full object-contain p-2"
            />
          </Link>
        </div>
      </div>
    </>
  );
}

export default About;
