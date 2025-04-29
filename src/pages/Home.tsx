import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import InteractiveHero from '../components/InteractiveHero';
import { getAllInventory, groupInventoryByProduct, type InventoryItem } from '../lib/supabase';
import { productsData } from '../lib/products';

function Home() {
  // Get specific products we want to display
  const mainProducts = [
    productsData['pants-1'],
    productsData['hoodie-1'],
    productsData['case']
  ].filter(Boolean); // Filter out any undefined products

  const [inventory, setInventory] = useState<Record<string, InventoryItem[]>>({});
  const [loading, setLoading] = useState(true);

  // Fetch inventory data from Supabase
  useEffect(() => {
    async function fetchInventory() {
      try {
        setLoading(true);
        
        // Get all inventory items
        const allItems = await getAllInventory();
        
        // Group them by product ID
        const groupedInventory = groupInventoryByProduct(allItems);
        setInventory(groupedInventory);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchInventory();
  }, []);

  return (
    <>
      {/* Interactive Hero Section with depth effect */}
      <InteractiveHero imageSrc="/ASSETS/hero.jpg.jpg">
        <div className="w-full h-16 md:h-24">
          <Logo />
        </div>
      </InteractiveHero>

      {/* Main Products Grid - No heading, no spacing, full width */}
      <div className="w-full">
        <div className="w-full p-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0">
            {mainProducts.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id} className="group cursor-pointer">
                <div className="relative w-full overflow-hidden product-card">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto object-contain product-card-image"
                  />
                </div>
                <div className="p-4 product-card-info">
                  <h3 className="text-xs uppercase tracking-wider font-medium text-black">{product.name}</h3>
                  <p className="text-xs text-black mt-1">{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Enhanced tech-inspired button with sophisticated animation */}
        <div className="flex justify-center mt-12 px-4 pb-16">
          <Link 
            to="/shop" 
            className="tech-button relative inline-flex items-center justify-center px-12 py-3 min-w-[220px] text-lg font-medium tracking-wider text-black bg-white hover:bg-gray-100 transition-all duration-700 border border-black"
          >
            <span className="text-fade relative z-10 w-full text-center uppercase tracking-widest">
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

export default Home;