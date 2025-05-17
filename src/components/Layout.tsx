import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="w-full bg-white z-50">
        {/* Logo centered at the top with nothing beside it */}
        <div className="flex justify-center py-3 border-b border-gray-200">
          <Link to="/" className="h-8">
            <img 
              src="/ASSETS/items/союз лого пнг.png" 
              alt="СОЮЗ" 
              className="h-full object-contain"
            />
          </Link>
        </div>
        
        {/* Desktop Navigation links - hidden on mobile */}
        <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between py-3">
            <Link to="/shop" className="text-sm uppercase font-medium text-black hover:opacity-70 tracking-widest">МАГАЗИН</Link>
            <Link to="/about" className="text-sm uppercase font-medium text-black hover:opacity-70 tracking-widest">О НАС</Link>
            <Link to="/delivery" className="text-sm uppercase font-medium text-black hover:opacity-70 tracking-widest">ДОСТАВКА И ОПЛАТА</Link>
            <Link to="/cart" className="text-sm uppercase font-medium text-black hover:opacity-70 tracking-widest">
              КОРЗИНА
            </Link>
          </div>
        </div>

        {/* Mobile menu button and cart text - only visible on mobile */}
        <div className="md:hidden flex justify-between items-center px-4 py-3">
          <button 
            onClick={toggleMobileMenu}
            className="text-black"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <Link to="/cart" className="text-sm uppercase font-medium text-black hover:opacity-70 tracking-widest">
            КОРЗИНА
          </Link>
        </div>
        
        {/* Mobile menu - only visible when toggled */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 px-4 py-2">
            <div className="flex flex-col space-y-4 py-2">
              <Link 
                to="/shop" 
                className="text-sm uppercase font-medium text-black hover:opacity-70 tracking-widest py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                МАГАЗИН
              </Link>
              <Link 
                to="/about" 
                className="text-sm uppercase font-medium text-black hover:opacity-70 tracking-widest py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                О НАС
              </Link>
              <Link 
                to="/delivery" 
                className="text-sm uppercase font-medium text-black hover:opacity-70 tracking-widest py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                ДОСТАВКА И ОПЛАТА
              </Link>
            </div>
          </div>
        )}
      </nav>

      <div>
        {children}
      </div>

      {/* Compact Footer - All info in left top corner with light grey text */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start">
            <div className="text-xs text-gray-400 mb-1">Ленинский проспект, 18к1, Калининград</div>
            <a href="tel:+79114582910" className="text-xs text-gray-400 mb-1 hover:opacity-70">+7 911 458 2910</a>
            <div className="flex space-x-4 text-xs">
              <Link to="/about" className="text-gray-400 hover:opacity-70">О нас</Link>
              <Link to="/delivery" className="text-gray-400 hover:opacity-70">Доставка</Link>
              <a href="#" className="text-gray-400 hover:opacity-70">Возврат</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;