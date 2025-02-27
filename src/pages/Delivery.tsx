import React from 'react';

function Delivery() {
  return (
    <div className="pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Доставка и оплата</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Способы доставки</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <div>
                  <p className="font-medium">Курьерская доставка по Калининграду</p>
                  <p className="text-gray-600">Бесплатно при заказе от 5000 ₽</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <div>
                  <p className="font-medium">Почта России</p>
                  <p className="text-gray-600">От 300 ₽, срок доставки 3-7 дней</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <div>
                  <p className="font-medium">СДЭК</p>
                  <p className="text-gray-600">От 400 ₽, срок доставки 2-4 дня</p>
                </div>
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Способы оплаты</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <div>
                  <p className="font-medium">Банковской картой онлайн</p>
                  <p className="text-gray-600">Visa, MasterCard, МИР</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <div>
                  <p className="font-medium">Наличными при получении</p>
                  <p className="text-gray-600">Только при курьерской доставке</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="relative aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1561715276-a2d087060f1d?auto=format&fit=crop&q=80&w=1200"
              alt="Доставка"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Delivery;