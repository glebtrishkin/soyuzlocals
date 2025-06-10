import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import InteractiveHero from '../components/InteractiveHero';
import { getAllInventory, groupInventoryByProduct, type InventoryItem } from '../lib/supabase';
import { productsData, getProductsByCategory, getAllProducts } from '../lib/products';
import { Product } from '../lib/types';

const categoryLabels = {
  'clothing': 'ОДЕЖДА',
  'accessories': 'АКСЕССУАРЫ',
  'friends': 'ДРУЗЬЯ'
};

interface ShopProps {
  initialCategory?: string | null;
}

function Shop({ initialCategory = null }: ShopProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory);
  const [inventory, setInventory] = useState<Record<string, InventoryItem[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (activeCategory) {
      setDisplayedProducts(getProductsByCategory(activeCategory));
    } else {
      setDisplayedProducts(getAllProducts());
    }
  }, [activeCategory]);

  const handleCategoryChange = (category: string | null) => {
    setActiveCategory(category);
  };

  return (
    <>
      <InteractiveHero imageSrc="/ASSETS/IMG_1745[1].jpg" />

      <div className="w-full border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center py-4 space-x-8">
            <button 
              onClick={() => handleCategoryChange(null)}
              className={`text-sm uppercase font-medium tracking-widest py-2 relative ${
                activeCategory === null ? 'text-black' : 'text-gray-400'
              }`}
            >
              ВСЕ ТОВАРЫ
            </button>
            {Object.entries(categoryLabels).map(([category, label]) => (
              <button 
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`text-sm uppercase font-medium tracking-widest py-2 relative ${
                  activeCategory === category ? 'text-black' : 'text-gray-400'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-4 my-4">
            {error}
          </div>
        )}
        
        <div className="w-full p-0">
          {displayedProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-black">Нет товаров в данной категории</p>
            </div>
          ) : (
            <div className="product-grid md:grid md:grid-cols-3 md:gap-0">
              {displayedProducts.map((product) => (
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
                      <button className="favorite-button">
                        <Heart size={20} />
                      </button>
                    </div>
                    <div className="product-info">
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-price">{product.price}</p>
                    </div>
                  </div>

                  {/* Desktop version - info above image */}
                  <div className="hidden md:block">
                    <div className="product-info">
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-price">{product.price}</p>
                    </div>
                    <div className="product-card-container">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-card-image"
                      />
                      <button className="favorite-button">
                        <Heart size={20} />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex justify-center mt-12 px-4 pb-16">
          <Link 
            to="/" 
            className="inline-flex items-center justify-center px-8 py-2 text-sm font-medium tracking-wider text-black bg-white border border-black uppercase"
          >
            На главную
          </Link>
        </div>
      </div>
    </>
  );
}

export default Shop;