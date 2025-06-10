import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import InteractiveHero from '../components/InteractiveHero';
import CategoryScroll from '../components/CategoryScroll';
import { getAllInventory, groupInventoryByProduct, type InventoryItem } from '../lib/supabase';
import { productsData } from '../lib/products';

function Home() {
  // Get specific products we want to display
  const mainProducts = [
    productsData['pants-1'],
    productsData['longsleeve-spring'],
    productsData['tshirt-skulls']
  ].filter(Boolean);

  const [inventory, setInventory] = useState<Record<string, InventoryItem[]>>({});
  const [loading, setLoading] = useState(true);

  return (
    <>
      <InteractiveHero imageSrc="/ASSETS/hero.jpg">
        <div className="w-full h-16 md:h-24">
          <Logo />
        </div>
      </InteractiveHero>

      <div className="w-full mt-16 md:mt-24">
        <div className="w-full p-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0">
            {mainProducts.map((product) => (
              <Link 
                to={`/product/${product.id}`} 
                key={product.id} 
                className="product-card"
              >
                {/* Mobile version - info below image */}
                <div className="md:hidden">
                  <div className="product-card-container">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-card-image"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xs uppercase tracking-wider font-medium text-black">{product.name}</h3>
                    <p className="text-xs text-black mt-1">{product.price}</p>
                  </div>
                </div>

                {/* Desktop version - info above image */}
                <div className="hidden md:block">
                  <div className="p-4">
                    <h3 className="text-xs uppercase tracking-wider font-medium text-black">{product.name}</h3>
                    <p className="text-xs text-black mt-1">{product.price}</p>
                  </div>
                  <div className="product-card-container">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-card-image"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Subscription Block - Added mt-12 for mobile spacing */}
        <div className="relative w-full h-[400px] overflow-hidden mt-6 md:mt-0">
          <img 
            src="/ASSETS/DSC04537.jpg"
            alt="Subscribe to our channel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-end justify-center pb-8">
            <Link 
              to="https://t.me/soyuzlocals"
              target="_blank"
              rel="noopener noreferrer" 
              className="bg-[#F4F1DE] text-black px-4 py-2 text-sm font-light hover:bg-opacity-90 transition-all text-center"
            >
              Подпишитесь на канал, чтобы бы в курсе новостей и новинок
            </Link>
          </div>
        </div>

        {/* Category scroll section - only visible on mobile */}
        <CategoryScroll />
        
        <div className="flex justify-center mt-12 px-4 pb-16">
          <Link 
            to="/shop" 
            className="inline-flex items-center justify-center px-8 py-2 text-sm font-medium tracking-wider text-black bg-white border border-black uppercase"
          >
            Все товары
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;