import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <>
      {/* Brand description section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <p className="text-lg md:text-xl font-semibold text-black leading-relaxed">
            *СОЮЗ* — локальный калининградский бренд, мы существуем с 2018 года. Печатаем мерч шелкографией. Шьем одежду, сумки и аксессуары.
          </p>
          <p className="text-lg md:text-xl font-semibold text-black leading-relaxed mt-6">
            Наша миссия — развивать уникальный городской стиль, вдохновленный Калининградом, и создавать вещи, которые несут в себе частичку нашей культуры и истории.
          </p>
        </div>

        <div className="flex justify-center">
          <Link
            to="/shop"
            className="inline-flex items-center justify-center px-8 py-2 text-sm font-medium tracking-wider text-black bg-white border border-black uppercase hover:bg-black hover:text-white transition-colors"
          >
            Магазин
          </Link>
        </div>
      </div>
    </>
  );
}

export default About;