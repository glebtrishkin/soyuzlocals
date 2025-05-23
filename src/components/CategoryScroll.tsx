import React from 'react';
import { Link } from 'react-router-dom';

interface Category {
  title: string;
  image: string;
  link: string;
}

const categories: Category[] = [
  {
    title: 'Одежда',
    image: '/ASSETS/DSC09444.jpg',
    link: '/shop?category=clothing'
  },
  {
    title: 'Аксессуары',
    image: '/ASSETS/DSC00641.jpg',
    link: '/shop?category=accessories'
  },
  {
    title: 'Подарочные\nСертификаты',
    image: '/ASSETS/DSC00612.jpg',
    link: '/shop?category=gift-cards'
  }
];

function CategoryScroll() {
  return (
    <div className="md:hidden mt-8 mb-8">
      <h2 className="text-2xl px-4 mb-4">Каталог</h2>
      <div className="overflow-x-auto category-scroll">
        <div className="flex px-4 space-x-4 min-w-max pb-4">
          {categories.map((category, index) => (
            <Link 
              key={index}
              to={category.link}
              className="relative w-[280px] h-[360px] rounded-3xl overflow-hidden flex-shrink-0"
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-start justify-start p-6">
                <h3 className="text-2xl text-white whitespace-pre-line">
                  {category.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryScroll;
