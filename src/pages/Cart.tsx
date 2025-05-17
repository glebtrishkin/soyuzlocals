import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { checkStockByCodeAndSize } from '../lib/supabase';

// Define cart item type
interface CartItem {
  id: string;
  productId: string;
  name: string;
  size: string;
  price: string;
  quantity: number;
  image: string;
  maxAvailable: number;
}

function Cart() {
  // State for cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Mock cart data - in a real app, this would come from localStorage or a backend
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        setLoading(true);
        
        // Mock data - in a real app, this would be fetched from localStorage or API
        const mockCartItems: CartItem[] = [
          {
            id: 'cart-item-1',
            productId: 'pants-1',
            name: 'Брюки Союз 2.0',
            size: 'M',
            price: '5000 ₽',
            quantity: 1,
            image: '/ASSETS/DSC09365.jpg',
            maxAvailable: 8
          },
          {
            id: 'cart-item-2',
            productId: 'hoodie-1',
            name: 'Худи Союз',
            size: 'L',
            price: '5000 ₽',
            quantity: 2,
            image: '/ASSETS/DSC09470.jpg',
            maxAvailable: 5
          }
        ];
        
        // Check stock availability for each item
        const updatedItems = await Promise.all(
          mockCartItems.map(async (item) => {
            try {
              const stockInfo = await checkStockByCodeAndSize(item.productId, item.size);
              return {
                ...item,
                maxAvailable: stockInfo.quantity
              };
            } catch (err) {
              console.error(`Error checking stock for ${item.productId}/${item.size}:`, err);
              return item;
            }
          })
        );
        
        setCartItems(updatedItems);
      } catch (err) {
        console.error('Error fetching cart data:', err);
        setError('Произошла ошибка при загрузке корзины');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCartData();
  }, []);
  
  // Calculate subtotal
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseInt(item.price.replace(/\D/g, ''));
      return total + (price * item.quantity);
    }, 0);
  };
  
  // Handle quantity change
  const handleQuantityChange = (id: string, newQuantity: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.min(newQuantity, item.maxAvailable) } 
          : item
      )
    );
  };
  
  // Handle item removal
  const handleRemoveItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  // Generate quantity options based on available stock
  const getQuantityOptions = (maxAvailable: number) => {
    return Array.from({ length: Math.min(maxAvailable, 10) }, (_, i) => i + 1);
  };
  
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-2xl font-medium mb-8 text-black">КОРЗИНА</h1>
        <p className="text-black">Загрузка корзины...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-2xl font-medium mb-8 text-black">КОРЗИНА</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }
  
  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-2xl font-medium mb-8 text-black">КОРЗИНА</h1>
        <div className="text-center py-16">
          <p className="text-black mb-8">Ваша корзина пуста</p>
          <Link 
            to="/shop" 
            className="tech-button relative inline-flex items-center justify-center px-12 py-3 min-w-[220px] text-lg font-medium tracking-wider text-black bg-white hover:bg-gray-100 transition-all duration-700 border border-black"
          >
            <span className="text-fade relative z-10 w-full text-center uppercase tracking-widest">
              В МАГАЗИН
            </span>
            <img 
              src="/ASSETS/союз лого пнг.png" 
              alt="Союз лого" 
              className="logo-reveal w-full h-full object-contain p-2"
            />
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-2xl font-medium mb-8 text-black">КОРЗИНА</h1>
      
      {/* Cart items */}
      <div className="mb-12">
        {/* Header - desktop only */}
        <div className="hidden md:grid md:grid-cols-12 gap-4 pb-4 border-b border-gray-200">
          <div className="md:col-span-6">
            <span className="text-sm font-medium text-black uppercase tracking-wider">Товар</span>
          </div>
          <div className="md:col-span-2 text-center">
            <span className="text-sm font-medium text-black uppercase tracking-wider">Цена</span>
          </div>
          <div className="md:col-span-2 text-center">
            <span className="text-sm font-medium text-black uppercase tracking-wider">Количество</span>
          </div>
          <div className="md:col-span-2 text-right">
            <span className="text-sm font-medium text-black uppercase tracking-wider">Итого</span>
          </div>
        </div>
        
        {/* Cart items */}
        {cartItems.map((item) => {
          const itemPrice = parseInt(item.price.replace(/\D/g, ''));
          const itemTotal = itemPrice * item.quantity;
          
          return (
            <div key={item.id} className="py-6 border-b border-gray-200">
              <div className="md:grid md:grid-cols-12 gap-4 flex flex-col">
                {/* Product info */}
                <div className="md:col-span-6 flex">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex flex-col">
                    <Link to={`/product/${item.productId}`} className="text-black hover:opacity-70">
                      <span className="text-sm font-medium">{item.name}</span>
                    </Link>
                    <span className="text-sm text-black mt-1">Размер: {item.size}</span>
                    
                    {/* Mobile price */}
                    <div className="md:hidden mt-2">
                      <span className="text-sm text-black">{item.price}</span>
                    </div>
                    
                    {/* Remove button */}
                    <button 
                      onClick={() => handleRemoveItem(item.id)}
                      className="mt-auto flex items-center text-black hover:opacity-70 text-xs"
                    >
                      <Trash2 size={14} className="mr-1" />
                      <span>Удалить</span>
                    </button>
                  </div>
                </div>
                
                {/* Price - desktop */}
                <div className="md:col-span-2 hidden md:flex items-center justify-center">
                  <span className="text-sm text-black">{item.price}</span>
                </div>
                
                {/* Quantity selector */}
                <div className="md:col-span-2 flex items-center justify-center mt-4 md:mt-0">
                  <select
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-sm"
                  >
                    {getQuantityOptions(item.maxAvailable).map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                  
                  {item.quantity === item.maxAvailable && (
                    <span className="ml-2 text-xs text-red-600">Макс.</span>
                  )}
                </div>
                
                {/* Total */}
                <div className="md:col-span-2 flex items-center justify-end mt-4 md:mt-0">
                  <span className="text-sm font-medium text-black">{itemTotal.toLocaleString()} ₽</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Order summary */}
      <div className="md:w-1/2 ml-auto">
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between mb-2">
            <span className="text-black">Подытог</span>
            <span className="text-black font-medium">{calculateSubtotal().toLocaleString()} ₽</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-black">Доставка</span>
            <span className="text-black">Рассчитывается при оформлении</span>
          </div>
          <div className="flex justify-between pt-4 border-t border-gray-200">
            <span className="text-black font-medium">Итого</span>
            <span className="text-black font-medium">{calculateSubtotal().toLocaleString()} ₽</span>
          </div>
        </div>
        
        {/* Checkout button */}
        <div className="mt-8">
          <button className="w-full py-4 px-6 bg-black text-white uppercase font-medium tracking-wider hover:bg-gray-800 transition-colors">
            Оформить заказ
          </button>
        </div>
        
        {/* Continue shopping */}
        <div className="mt-4 text-center">
          <Link to="/shop" className="text-black text-sm hover:opacity-70">
            Продолжить покупки
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;