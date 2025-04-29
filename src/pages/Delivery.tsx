import React from 'react';
import { Link } from 'react-router-dom';
import InteractiveHero from '../components/InteractiveHero';

function Delivery() {
  return (
    <>
      {/* Hero-блок одинаковый с главной */}
      <InteractiveHero imageSrc="public/ASSETS/items/skeletBACK.jpg" />

      {/* Контент */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Доставка */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold uppercase text-black mb-4">
              Доставка
            </h1>
            <ul className="space-y-6 text-gray-700 text-lg">
              <li className="flex items-start">
                <span className="mr-4 text-2xl">🚚</span>
                <div>
                  <p className="font-medium text-black">
                    Курьер по Калининграду
                  </p>
                  <p>Бесплатно при заказе от 5000 ₽</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-4 text-2xl">📦</span>
                <div>
                  <p className="font-medium text-black">Почта России</p>
                  <p>От 300 ₽, 3–7 дней</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-4 text-2xl">🏬</span>
                <div>
                  <p className="font-medium text-black">Самовывоз</p>
                  <p>Ленинский проспект, 18к1</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="relative aspect-[4/3]">
            <img
              src="/ASSETS/delivery-image.jpg"
              alt="Доставка"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </section>

        {/* Оплата */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3]">
            <img
              src="/ASSETS/payment-image.jpg"
              alt="Оплата"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold uppercase text-black mb-4">
              Оплата
            </h2>
            <ul className="space-y-6 text-gray-700 text-lg">
              <li className="flex items-start">
                <span className="mr-4 text-2xl">💳</span>
                <div>
                  <p className="font-medium text-black">Банковские карты</p>
                  <p>МИР, Visa, Mastercard</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-4 text-2xl">🌐</span>
                <div>
                  <p className="font-medium text-black">Онлайн-оплата</p>
                  <p>Сбербанк Online, Тинькофф, ЮMoney</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-4 text-2xl">💵</span>
                <div>
                  <p className="font-medium text-black">
                    Наличные при получении
                  </p>
                  <p>Только курьер</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Кнопка «Все товары» */}
        <div className="flex justify-center mt-12 px-4 pb-16">
          <Link
            to="/shop"
            className="tech-button relative inline-flex items-center justify-center px-8 py-4 uppercase font-medium relative overflow-hidden transition-all duration-700 border border-black"
          >
            <span className="text-fade relative z-10 w-full text-center tracking-widest">
              Все товары
            </span>
            <img
              src="/ASSETS/союз лого пнг.png"
              alt="Союз лого"
              className="logo-reveal w-full h-full object-contain p-2"
            />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Delivery;
