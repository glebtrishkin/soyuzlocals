import React from 'react';
import { X } from 'lucide-react';

interface SizeGuideProps {
  isOpen: boolean;
  onClose: () => void;
  productType: 'hoodie' | 'crop-top' | 'longsleeve' | 'pants' | 'tshirt';
}

const sizeData = {
  tshirt: {
    measurements: {
      'XS': { chest: '46', length: '64', shoulders: '40' },
      'S': { chest: '48', length: '66', shoulders: '42' },
      'M': { chest: '50', length: '68', shoulders: '44' },
      'L': { chest: '52', length: '70', shoulders: '46' },
      'XL': { chest: '54', length: '72', shoulders: '48' }
    },
    labels: {
      chest: 'Обхват груди',
      length: 'Длина',
      shoulders: 'Плечи'
    }
  },
  hoodie: {
    measurements: {
      'XS': { chest: '52', length: '66', shoulders: '44' },
      'S': { chest: '54', length: '68', shoulders: '46' },
      'M': { chest: '56', length: '70', shoulders: '48' },
      'L': { chest: '58', length: '72', shoulders: '50' },
      'XL': { chest: '60', length: '74', shoulders: '52' }
    },
    labels: {
      chest: 'Обхват груди',
      length: 'Длина',
      shoulders: 'Плечи'
    }
  },
  'crop-top': {
    measurements: {
      'XS': { chest: '42', length: '40', shoulders: '38' },
      'S': { chest: '44', length: '42', shoulders: '40' },
      'M': { chest: '46', length: '44', shoulders: '42' }
    },
    labels: {
      chest: 'Обхват груди',
      length: 'Длина',
      shoulders: 'Плечи'
    }
  },
  longsleeve: {
    measurements: {
      'XS': { chest: '48', length: '66', shoulders: '42', sleeve: '60' },
      'S': { chest: '50', length: '68', shoulders: '44', sleeve: '62' },
      'M': { chest: '52', length: '70', shoulders: '46', sleeve: '64' },
      'L': { chest: '54', length: '72', shoulders: '48', sleeve: '66' },
      'XL': { chest: '56', length: '74', shoulders: '50', sleeve: '68' }
    },
    labels: {
      chest: 'Обхват груди',
      length: 'Длина',
      shoulders: 'Плечи',
      sleeve: 'Длина рукава'
    }
  },
  pants: {
    measurements: {
      'XS': { waist: '36', hip: '52', length: '100', thigh: '32' },
      'S': { waist: '38', hip: '54', length: '102', thigh: '33' },
      'M': { waist: '40', hip: '56', length: '104', thigh: '34' },
      'L': { waist: '42', hip: '58', length: '106', thigh: '35' },
      'XL': { waist: '44', hip: '60', length: '108', thigh: '36' }
    },
    labels: {
      waist: 'Талия',
      hip: 'Бедра',
      length: 'Длина',
      thigh: 'Бедро'
    }
  }
};

function SizeGuide({ isOpen, onClose, productType }: SizeGuideProps) {
  if (!isOpen) return null;

  const getImageSrc = () => {
    switch (productType) {
      case 'hoodie':
        return '/ASSETS/худик.png';
      case 'crop-top':
        return '/ASSETS/кроп топ.png';
      case 'longsleeve':
        return '/ASSETS/лонг.png';
      case 'pants':
        return '/ASSETS/брюки.png';
      case 'tshirt':
        return '/ASSETS/футболка.png';
      default:
        return '';
    }
  };

  const data = sizeData[productType];
  const sizes = Object.keys(data.measurements);
  const measurements = Object.keys(data.labels);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div 
        className="relative w-[500px] bg-white"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-8 right-0 text-white hover:opacity-70"
          aria-label="Close size guide"
        >
          <X size={20} />
        </button>
        
        <div className="p-6">
          <h3 className="text-sm font-medium mb-4 uppercase">Размерная сетка</h3>
          
          <div className="mb-6">
            <img
              src={getImageSrc()}
              alt="Size Guide"
              className="w-full h-auto"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left font-medium">Размер</th>
                  {sizes.map(size => (
                    <th key={size} className="py-2 text-center font-medium">{size}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {measurements.map(measure => (
                  <tr key={measure} className="border-b">
                    <td className="py-2 text-left">{data.labels[measure]}</td>
                    {sizes.map(size => (
                      <td key={`${measure}-${size}`} className="py-2 text-center">
                        {data.measurements[size][measure]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-xs text-gray-500">
            <p>Все измерения указаны в сантиметрах</p>
            <p>Допустимая погрешность в измерениях: ±1-2 см</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SizeGuide;
