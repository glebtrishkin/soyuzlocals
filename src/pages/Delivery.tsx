import React from 'react';
import { Link } from 'react-router-dom';
import InteractiveHero from '../components/InteractiveHero';

function Delivery() {
  return (
    <>
      {/* Hero-блок одинаковый с главной */}
      <InteractiveHero imageSrc="/ASSETS/DSC01161-Улучшено-Ум. шума.jpg" />

      {/* Контент */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Доставка */}
        <section className="mb-16">
          <h1 className="text-3xl font-bold uppercase text-black mb-8">
            Доставка
          </h1>
          
          {/* Самовывоз */}
          <div className="mb-8 pb-6 border-b border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-black mb-2">САМОВЫВОЗ</h3>
                <div className="inline-block bg-gray-100 px-3 py-1 text-sm text-black rounded">
                  FREE
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-700 space-y-2">
              <p>Для получения потребуется назвать фамилию покупателя и номер заказа из письма в почте.</p>
              <p>Заказ находится в магазине Liars Collective в Санкт-Петербурге, по адресу ул. Гороховая д.47 (во дворе слева под лестницей). График работы: с 13 до 21 часов. Заказ доступен для выдачи в рабочее время через 1 час после оплаты.</p>
              <p>Заказ необходимо забрать в течение 10 дней с момента покупки. После этого он аннулируется.</p>
            </div>
          </div>

          {/* СДЭК ПВЗ */}
          <div className="mb-8 pb-6 border-b border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-black mb-2">СДЭК ДО ПВЗ ПО РОССИИ</h3>
                <div className="text-sm text-gray-600">ОТ 1 ДНЯ</div>
              </div>
              <div className="bg-black text-white px-3 py-1 text-sm rounded">
                400 RUB
              </div>
            </div>
            <div className="text-sm text-gray-700">
              <p>Заказы собираются и отправляются 3 раза в неделю (ВТ до 18, ПТ до 16, ВС до 12) после оформления на сайте. После отправки посылки, на указанную вами почту и номер телефона придут сообщения с трекинг-номером для отслеживания.</p>
            </div>
          </div>

          {/* СДЭК Курьер */}
          <div className="mb-8 pb-6 border-b border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-black mb-2">СДЭК КУРЬЕР ПО РОССИИ</h3>
                <div className="text-sm text-gray-600">ОТ 1 ДНЯ</div>
              </div>
              <div className="bg-black text-white px-3 py-1 text-sm rounded">
                600 RUB
              </div>
            </div>
            <div className="text-sm text-gray-700 space-y-2">
              <p>Заказы собираются и отправляются 3 раза в неделю (ВТ до 18, ПТ до 16, ВС до 12) дней после оформления на сайте. После отправки посылки, на указанную вами почту и номер телефона придут сообщения с трекинг-номером для отслеживания.</p>
              <p>Срок доставки зависит от удаленности пункта назначения и загруженности системы СДЭК. Ориентировочный срок доставки посылки в Москву — 1-4 дня, во Владивосток — 9 дней.</p>
            </div>
          </div>

          {/* Почта России */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-black mb-2">ПОЧТА РОССИИ</h3>
                <div className="text-sm text-gray-600">ОТ 3-7 ДНЕЙ</div>
              </div>
              <div className="bg-black text-white px-3 py-1 text-sm rounded">
                ОТ 300 RUB
              </div>
            </div>
            <div className="text-sm text-gray-700">
              <p>Стандартная доставка Почтой России по всей территории РФ. Сроки доставки зависят от региона назначения.</p>
            </div>
          </div>
        </section>

        {/* Оплата */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold uppercase text-black mb-8">
            Оплата
          </h2>
          <div className="space-y-6 text-gray-700">
            <div className="flex items-start">
              <div>
                <p className="font-medium text-black mb-1">Банковские карты</p>
                <p className="text-sm">МИР, Visa, Mastercard</p>
              </div>
            </div>
            <div className="flex items-start">
              <div>
                <p className="font-medium text-black mb-1">Онлайн-оплата</p>
                <p className="text-sm">Сбербанк Online, Тинькофф, ЮMoney</p>
              </div>
            </div>
            <div className="flex items-start">
              <div>
                <p className="font-medium text-black mb-1">Наличные при получении</p>
                <p className="text-sm">Только при курьерской доставке</p>
              </div>
            </div>
          </div>
        </section>

        {/* Кнопка «Все товары» */}
        <div className="flex justify-center">
          <Link
            to="/shop"
            className="inline-flex items-center justify-center px-8 py-2 text-sm font-medium tracking-wider text-black bg-white border border-black uppercase hover:bg-black hover:text-white transition-colors"
          >
            Все товары
          </Link>
        </div>
      </div>
    </>
  );
}

export default Delivery;