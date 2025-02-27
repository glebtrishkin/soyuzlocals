import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';

function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <button
              className="sm:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <div className="hidden sm:flex space-x-8">
              <Link to="/shop" className="text-gray-900 hover:text-gray-600">Магазин</Link>
              <Link to="/about" className="text-gray-900 hover:text-gray-600">О нас</Link>
              <Link to="/delivery" className="text-gray-900 hover:text-gray-600">Доставка и оплата</Link>
            </div>

            <div className="flex-1 flex justify-center">
              <Link to="/" className="text-2xl font-bold tracking-wider">СОЮЗ</Link>
            </div>

            <div className="flex items-center">
              <a href="#" className="text-gray-900 hover:text-gray-600">
                <ShoppingBag size={24} />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 pt-16">
          <div className="p-4 space-y-4">
            <Link to="/shop" className="block text-xl text-gray-900">Магазин</Link>
            <Link to="/about" className="block text-xl text-gray-900">О нас</Link>
            <Link to="/delivery" className="block text-xl text-gray-900">Доставка и оплата</Link>
          </div>
        </div>
      )}

      {children}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Контакты</h3>
              <p className="text-gray-600">Калининград, ул. Ленина 1</p>
              <p className="text-gray-600">+7 (4012) 123-45-67</p>
              <p className="text-gray-600">info@soyuz.ru</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Информация</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-600 hover:text-gray-900">О нас</Link></li>
                <li><Link to="/delivery" className="text-gray-600 hover:text-gray-900">Доставка</Link></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Возврат</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Подписка</h3>
              <p className="text-gray-600 mb-4">Подпишитесь на наши новости</p>
              <input
                type="email"
                placeholder="Ваш email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
          </div>
          <div className="mt-12 text-center text-gray-600">
            <p>© 2024 СОЮЗ. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;