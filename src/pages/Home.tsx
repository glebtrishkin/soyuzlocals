import React from 'react';
import { ShoppingBag } from 'lucide-react';

function Home() {
  const products = [
    {
      name: 'Куртка СОЮЗ',
      price: '24900 ₽',
      image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=800'
    },
    {
      name: 'Футболка СОЮЗ',
      price: '12900 ₽',
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800'
    },
    {
      name: 'Сумка СОЮЗ',
      price: '15900 ₽',
      image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="pt-16">
        <div className="relative h-screen">
          <img
            src="/ASSETS/hero.jpg.jpg"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
            <div className="text-center text-white w-full max-w-[500px] px-4">
              <img
                src="/ASSETS/союз-пдф.svg"
                alt="СОЮЗ"
                className="w-full h-auto filter brightness-0 invert"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative aspect-[3/4] mb-4 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="text-lg font-medium">{product.name}</h3>
              <p className="text-gray-600">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;