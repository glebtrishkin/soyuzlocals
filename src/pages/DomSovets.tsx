import React from 'react';
import { Link } from 'react-router-dom';
import InteractiveHero from '../components/InteractiveHero';

function DomSovets() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <InteractiveHero imageSrc="/ASSETS/items/DS.jpg">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Подсвечник Дом Советов</h1>
        <p className="text-xl text-white mb-8">Символ города в вашем доме</p>
      </InteractiveHero>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-black">История создания</h2>
            <p className="text-lg mb-4 text-black">
              Дом Советов - один из самых узнаваемых символов Калининграда, воплощающий в себе историю города и его трансформацию. Мы создали этот подсвечник как дань уважения архитектурному наследию нашего города.
            </p>
            <p className="text-lg text-black">
              Каждый подсвечник изготавливается вручную с особым вниманием к деталям, чтобы максимально точно передать характерные черты здания.
            </p>
          </div>
          <div className="aspect-square relative">
            <img 
              src="/ASSETS/items/DS.jpg" 
              alt="Подсвечник Дом Советов" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 border border-black">
            <h3 className="text-lg font-bold mb-3 text-black">Материалы</h3>
            <p className="text-black">Высококачественная керамика ручной работы</p>
          </div>
          <div className="text-center p-6 border border-black">
            <h3 className="text-lg font-bold mb-3 text-black">Размеры</h3>
            <p className="text-black">Высота: 15 см<br/>Ширина: 10 см<br/>Глубина: 10 см</p>
          </div>
          <div className="text-center p-6 border border-black">
            <h3 className="text-lg font-bold mb-3 text-black">Особенности</h3>
            <p className="text-black">Детальная проработка фасада<br/>Устойчивое основание<br/>Подходит для свечей-таблеток</p>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-black text-center">Галерея</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <img 
              src="/ASSETS/items/DS.jpg" 
              alt="Подсвечник детали" 
              className="w-full aspect-square object-cover"
            />
            <img 
              src="/ASSETS/items/DS.jpg" 
              alt="Подсвечник в интерьере" 
              className="w-full aspect-square object-cover"
            />
            <img 
              src="/ASSETS/items/DS.jpg" 
              alt="Подсвечник со свечой" 
              className="w-full aspect-square object-cover"
            />
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-black">Приобрести подсвечник</h2>
          <p className="text-lg mb-8 text-black">Стоимость: 3500 ₽</p>
          <Link 
            to="/shop" 
            className="tech-button relative inline-flex items-center justify-center px-12 py-3 min-w-[220px] text-lg font-medium tracking-wider text-black bg-white hover:bg-gray-100 transition-all duration-700 border border-black"
          >
            <span className="text-fade relative z-10 w-full text-center uppercase tracking-widest">
              В МАГАЗИН
            </span>
            <img 
              src="/ASSETS/союз лого пнг.png" 
              alt="Союз лого" 
              className="logo-reveal w-full h-full object-contain p-2"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DomSovets;