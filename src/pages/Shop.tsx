import React from 'react';

function Shop() {
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
    <div className="pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Магазин</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
    </div>
  );
}

export default Shop;