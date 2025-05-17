import React from 'react';
import { type InventoryItem } from '../lib/supabase';

interface SizeSelectorProps {
  sizes: Array<{
    size: string;
    inStock: boolean;
    quantity: number;
  }>;
  selectedSize: string;
  onSizeSelect: (size: string) => void;
  loading?: boolean;
}

function SizeSelector({ sizes, selectedSize, onSizeSelect, loading = false }: SizeSelectorProps) {
  if (loading) {
    return <p className="text-sm text-black">Загрузка размеров...</p>;
  }

  if (!sizes || sizes.length === 0) {
    return <p className="text-sm text-black">Нет доступных размеров</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map(({ size, inStock, quantity }) => (
        <div key={size} className="relative group">
          <button
            onClick={() => onSizeSelect(size)}
            className={`
              relative px-4 py-2 border text-sm
              ${selectedSize.toLowerCase() === size.toLowerCase() ? 'border-black bg-black text-white' : 'border-gray-300'}
              ${!inStock ? 'opacity-50 cursor-not-allowed' : 'hover:border-black'}
              transition-all duration-200
            `}
            disabled={!inStock}
          >
            {size}
          </button>
          
          {/* Tooltip that appears on hover */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 
                        bg-black text-white text-xs rounded py-1 px-2 opacity-0 
                        group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            {inStock ? `В наличии: ${quantity} шт.` : 'Нет в наличии'}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SizeSelector;