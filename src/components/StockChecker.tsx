import React, { useState } from 'react';
import { checkStockByCodeAndSize } from '../lib/supabase';

interface StockCheckerProps {
  defaultCode?: string;
  defaultSize?: string;
}

function StockChecker({ defaultCode = '', defaultSize = '' }: StockCheckerProps) {
  const [code, setCode] = useState(defaultCode);
  const [size, setSize] = useState(defaultSize);
  const [result, setResult] = useState<{
    inStock: boolean;
    quantity: number;
    productName?: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () => {
    if (!code || !size) {
      setError('Пожалуйста, введите код товара и размер');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setResult(null);
      
      const stockInfo = await checkStockByCodeAndSize(code, size);
      setResult(stockInfo);
    } catch (err) {
      console.error('Error checking stock:', err);
      setError('Произошла ошибка при проверке наличия');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-gray-200 p-4 rounded-md">
      <h2 className="text-lg font-medium mb-4 text-black">Проверка наличия товара</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="product-code" className="block text-sm font-medium text-black mb-1">
            Код товара
          </label>
          <input
            id="product-code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            placeholder="Например: tshirt-1"
          />
        </div>
        
        <div>
          <label htmlFor="product-size" className="block text-sm font-medium text-black mb-1">
            Размер
          </label>
          <input
            id="product-size"
            type="text"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            placeholder="Например: M"
          />
        </div>
        
        <button
          onClick={handleCheck}
          disabled={loading}
          className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {loading ? 'Проверка...' : 'Проверить наличие'}
        </button>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        
        {result && (
          <div className={`mt-4 p-4 rounded-md ${result.inStock ? 'bg-green-100' : 'bg-red-100'}`}>
            {result.productName && (
              <p className="font-medium text-black mb-2">{result.productName}</p>
            )}
            <p className="text-black">
              {result.inStock 
                ? `В наличии: ${result.quantity} шт.` 
                : 'Нет в наличии'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StockChecker;