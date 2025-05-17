import React from 'react';

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSizeSelect: (size: string) => void;
  loading?: boolean;
}

function SizeSelector({ sizes, selectedSize, onSizeSelect, loading = false }: SizeSelectorProps) {
  if (loading) {
    return <div className="animate-pulse h-10 bg-gray-200 rounded"></div>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => onSizeSelect(size)}
          className={`
            min-w-[48px] h-12 px-4 border text-sm font-medium
            transition-all duration-200 uppercase
            ${selectedSize === size 
              ? 'border-black bg-black text-white' 
              : 'border-gray-300 hover:border-black text-black'
            }
          `}
        >
          {size}
        </button>
      ))}
    </div>
  );
}

export default SizeSelector;