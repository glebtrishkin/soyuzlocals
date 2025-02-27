import React from 'react';

function About() {
  return (
    <div className="pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">О нас</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-lg text-gray-600 mb-6">
              СОЮЗ - это современный бренд одежды, созданный в Калининграде. Мы создаем уникальные предметы гардероба, которые сочетают в себе комфорт, стиль и качество.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Наша миссия - создавать одежду, которая станет неотъемлемой частью вашего гардероба, сохраняя при этом доступные цены и высокое качество.
            </p>
            <p className="text-lg text-gray-600">
              Мы гордимся тем, что все наши изделия производятся в России с использованием современных технологий и материалов высочайшего качества.
            </p>
          </div>
          <div className="relative aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200"
              alt="О нас"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;