import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Image as ImageIcon } from 'lucide-react';
import InteractiveHero from '../components/InteractiveHero';
import { getAllInventory, groupInventoryByProduct, type InventoryItem } from '../lib/supabase';
import { productsData, getProductsByCategory, getAllProducts } from '../lib/products';
import { Product } from '../lib/types';

// Category labels for display
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

  // Fetch inventory data from Supabase
  useEffect(() => {
    async function fetchInventory() {
      try {
        setLoading(true);
        setError(null);
        
        const allItems = await getAllInventory();
        console.log('Shop page - All inventory items:', allItems);
        
        if (!allItems || allItems.length === 0) {
          console.warn('No inventory items returned from database');
        }
        
        const groupedInventory = groupInventoryByProduct(allItems);
        console.log('Shop page - Grouped inventory:', groupedInventory);
        
        Object.keys(productsData).forEach(productId => {
          console.log(`Inventory check for ${productId}:`, 
            groupedInventory[productId] || 'No inventory found');
        });
        
        setInventory(groupedInventory);
      } catch (error) {
        console.error('Error fetching inventory:', error);
        setError('Failed to load inventory data');
      } finally {
        setLoading(false);
      }
    }
    
    fetchInventory();
  }, []);

  // Update displayed products when category changes
  useEffect(() => {
    if (activeCategory) {
      setDisplayedProducts(getProductsByCategory(activeCategory));
    } else {
      setDisplayedProducts(getAllProducts());
    }
  }, [activeCategory]);

  // Handle category change
  const handleCategoryChange = (category: string | null) => {
    setActiveCategory(category);
  };

  // Determine if Dom Sovetov section should be shown
  const shouldShowDomSovetov = activeCategory === null || activeCategory === 'accessories';

  return (
    <>
      {/* Interactive Hero Section with depth effect */}
      <InteractiveHero imageSrc="/ASSETS/IMG_1745[1].jpg" />

      {/* Category Navigation */}
      <div className="w-full border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center py-4 space-x-8">
            <button 
              onClick={() => handleCategoryChange(null)}
              className={`text-sm uppercase font-medium tracking-widest py-2 relative ${
                activeCategory === null ? 'text-black' : 'text-gray-400 hover:text-black'
              }`}
            >
              ВСЕ
              {activeCategory === null && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></span>
              )}
            </button>
            {Object.entries(categoryLabels).map(([category, label]) => (
              <button 
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`text-sm uppercase font-medium tracking-widest py-2 relative ${
                  activeCategory === category ? 'text-black' : 'text-gray-400 hover:text-black'
                }`}
              >
                {label}
                {activeCategory === category && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0">
              {displayedProducts.map((product) => (
                <Link 
                  to={`/product/${product.id}`}
                  key={product.id} 
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-square w-full overflow-hidden product-card">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover product-card-image"
                    />
                    
                    {/* Image count indicator */}
                    {product.images && product.images.length > 0 && (
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full flex items-center text-xs">
                        <ImageIcon size={14} className="mr-1" />
                        <span>{product.images.length}</span>
                      </div>
                    )}
                    
                    {/* Brand badge for "friends" category */}
                    {product.category === 'friends' && product.brand && (
                      <div className="absolute top-0 right-0 bg-black text-white px-2 py-1 text-xs">
                        {product.brand}
                      </div>
                    )}
                  </div>
                  <div className="p-4 product-card-info">
                    <h3 className="text-xs uppercase tracking-wider font-medium text-black">{product.name}</h3>
                    <p className="text-xs text-black mt-1">{product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Dom Sovets Banner - Only shown for 'all' and 'accessories' categories */}
        {shouldShowDomSovetov && (
          <div className="w-full bg-black text-white py-16 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Подсвечник Дом Советов</h2>
                  <p className="text-lg mb-8">
                    Наше особое творение - керамический подсвечник в форме знакового здания Калининграда.
                    Каждый экземпляр создается вручную с любовью к деталям.
                  </p>
                  <Link 
                    to="/dom-sovets" 
                    className="inline-block border border-white px-8 py-3 text-white hover:bg-white hover:text-black transition-colors duration-300"
                  >
                    ПОДРОБНЕЕ
                  </Link>
                </div>
                <div className="aspect-square relative">
                  <img 
                    src="/ASSETS/items/DS.jpg" 
                    alt="Подсвечник Дом Советов" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Back to Home Button */}
        <div className="flex justify-center mt-12 px-4 pb-16">
          <Link 
            to="/" 
            className="tech-button relative inline-flex items-center justify-center px-12 py-3 min-w-[220px] text-lg font-medium tracking-wider text-black bg-white hover:bg-gray-100 transition-all duration-700 border border-black"
          >
            <span className="text-fade relative z-10 w-full text-center uppercase tracking-widest">
              На главную
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

export default Shop;