import { Product } from './types';

// Product data store
export const productsData: Record<string, Product> = {
  'pants-1': {
    id: 'pants-1',
    name: 'Брюки Союз 2.0',
    price: '5000 ₽',
    image: '/ASSETS/DSC09225.jpg',
    images: [
      '/ASSETS/17.jpg',
      '/ASSETS/18.jpg',
      '/ASSETS/DSC00576.jpg',
      '/ASSETS/DSC00578.jpg',
      '/ASSETS/DSC00583.jpg',
      '/ASSETS/DSC09255.jpg',
      '/ASSETS/DSC09246.jpg',
      '/ASSETS/DSC09266.jpg',
    ],
    category: 'clothing',
    description: {
      rus: 'Брюки из плотного хлопка с вышивкой логотипа СОЮЗ. Свободный крой, удобные карманы и эластичный пояс.',
      eng: 'Pants made of thick cotton with СОЮЗ logo embroidery. Relaxed fit, comfortable pockets and elastic waistband.',
    },
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  'hoodie-1': {
    id: 'hoodie-1',
    name: 'Худи Союз',
    price: '5000 ₽',
    image: '/ASSETS/DSC09444.jpg',
    images: [
      '/ASSETS/DSC09444.jpg',
      '/ASSETS/DSC09428.jpg',
      '/ASSETS/DSC09471.jpg',
    ],
    category: 'clothing',
    description: {
      rus: 'Худи из мягкого хлопка с вышивкой логотипа СОЮЗ. Свободный крой и удобный капюшон.',
      eng: 'Hoodie made of soft cotton with СОЮЗ logo embroidery. Relaxed fit and comfortable hood.',
    },
    sizes: ['S', 'M', 'L', 'XL'],
  },
  'tshirt-daktil': {
    id: 'tshirt-daktil',
    name: 'Футболка Дактиль',
    price: '2500 ₽',
    image: '/ASSETS/daktil.jpg',
    images: [
      '/ASSETS/1.jpg',
      '/ASSETS/2.jpg',
      '/ASSETS/DSC00703.jpg',
      '/ASSETS/DSC00707.jpg',
      '/ASSETS/DSC00709.jpg',
      '/ASSETS/daktil.jpg',
      '/ASSETS/DSC05560.jpg',
    ],
    category: 'clothing',
    description: {
      rus: 'Футболка из 100% хлопка с авторским принтом.',
      eng: '100% cotton t-shirt with original print.',
    },
    sizes: ['S', 'M', 'L', 'XL'],
  },
  'longsleeve-spring': {
    id: 'longsleeve-spring',
    name: 'Лонгсливы весенние',
    price: '3999 ₽',
    image: '/ASSETS/DSC00997-Улучшено-Ум. шума.jpg',
    images: [
      '/ASSETS/DSC00997-Улучшено-Ум. шума.jpg',
      '/ASSETS/DSC00968-Улучшено-Ум. шума.jpg',
      '/ASSETS/DSC01105-Улучшено-Ум. шума.jpg',
      '/ASSETS/DSC01150-Улучшено-Ум. шума.jpg',
      '/ASSETS/DSC01159-Улучшено-Ум. шума.jpg',
      '/ASSETS/DSC01161-Улучшено-Ум. шума.jpg',
      '/ASSETS/DSC01202-Улучшено-Ум. шума.jpg',
    ],
    category: 'clothing',
    description: {
      rus: 'Лёгкий весенний лонгслив из хлопка.',
      eng: 'Lightweight spring cotton longsleeve.',
    },
    sizes: ['S', 'M', 'L', 'XL'],
  },
  'tshirt-skulls': {
    id: 'tshirt-skulls',
    name: 'Футболка Черепа',
    price: '2500 ₽',
    image: '/ASSETS/DSC04288.jpg',
    images: [
      '/ASSETS/13.jpg',
      '/ASSETS/14.jpg',
      '/ASSETS/DSC00694.jpg',
      '/ASSETS/DSC00696.jpg',
      '/ASSETS/DSC00698.jpg',
      '/ASSETS/DSC00701.jpg',
      '/ASSETS/DSC04288.jpg',
      '/ASSETS/DSC04223.jpg',
    ],
    category: 'clothing',
    description: {
      rus: 'Футболка из 100% хлопка с авторским принтом.',
      eng: '100% cotton t-shirt with original print.',
    },
    sizes: ['L', 'XL', 'XXL'],
  },
  'long-pink': {
    id: 'long-pink',
    name: 'Лонгслив Огонь розовый',
    price: '3500 ₽',
    image: '/ASSETS/flamelong.jpg',
    images: ['/ASSETS/flamelong.jpg'],
    category: 'clothing',
    description: {
      rus: 'Лонгслив из мягкого хлопка с авторским принтом.',
      eng: 'Soft cotton longsleeve with original print.',
    },
    sizes: ['L', 'XL'],
  },
  'crop-cherry': {
    id: 'crop-cherry',
    name: 'Кроп Вишни',
    price: '2000 ₽',
    image: '/ASSETS/topcherry.jpg',
    images: [
      '/ASSETS/9.jpg',
      '/ASSETS/10.jpg',
      '/ASSETS/DSC00670.jpg',
      '/ASSETS/DSC00673.jpg',
      '/ASSETS/topcherry.jpg',
      '/ASSETS/DSC04029.jpg',
    ],
    category: 'clothing',
    description: {
      rus: 'Стильный кроп-топ с принтом вишни.',
      eng: 'Stylish crop top with cherry print.',
    },
    sizes: ['XS', 'S', 'M'],
  },
  'crop-tie': {
    id: 'crop-tie',
    name: 'Кроп Бант',
    price: '2000 ₽',
    image: '/ASSETS/topBANTIK.jpg',
    images: [
      '/ASSETS/11.jpg',
      '/ASSETS/12.jpg',
      '/ASSETS/DSC00677.jpg',
      '/ASSETS/DSC00683.jpg',
      '/ASSETS/DSC00683.jpg',
      '/ASSETS/DSC03876.jpg',
      '/ASSETS/DSC03917.jpg',
      '/ASSETS/DSC03934.jpg',
    ],
    category: 'clothing',
    description: {
      rus: 'Стильный кроп-топ с декоративным бантом.',
      eng: 'Stylish crop top with decorative bow.',
    },
    sizes: ['XS', 'S', 'M'],
  },
  'crop-black': {
    id: 'crop-black',
    name: 'Кроп черный',
    price: '2000 ₽',
    image: '/ASSETS/toppinkFRONT.jpg',
    images: [
      '/ASSETS/7.jpg',
      '/ASSETS/8.jpg',
      '/ASSETS/DSC00684.jpg',
      '/ASSETS/DSC00688.jpg',
      '/ASSETS/toppinkFRONT.jpg',
      '/ASSETS/DSC04057.jpg',
    ],
    category: 'clothing',
    description: {
      rus: 'Стильный черный кроп-топ с минималистичным дизайном.',
      eng: 'Stylish black crop top with minimalist design.',
    },
    sizes: ['XS', 'S', 'M'],
  },
  bucketbag: {
    id: 'bucketbag',
    name: 'Сумка bucket',
    price: '2500 ₽',
    image: '/ASSETS/DSC00641.jpg',
    images: [
      '/ASSETS/DSC00641.jpg',
      '/ASSETS/DSC00644.jpg',
      '/ASSETS/DSC00645.jpg',
      '/ASSETS/DSC00646.jpg',
      '/ASSETS/DSC00649.jpg',
      '/ASSETS/DSC00650.jpg',
      '/ASSETS/DSC00651.jpg',
      '/ASSETS/DSC00653.jpg',
    ],
    category: 'accessories',
    description: {
      rus: 'Вместительная сумка в стиле bucket bag с логотипом СОЮЗ.',
      eng: 'Spacious bucket bag with СОЮЗ logo.',
    },
    sizes: ['Один размер'],
  },
'bag-cow': {
    id: 'bag-cow',
    name: 'Сумка-коровка',
    price: '2500 ₽',
    image: '/ASSETS/DSC00600.jpg',
    images: [
      '/ASSETS/DSC00600.jpg',
      '/ASSETS/DSC00601.jpg',
      '/ASSETS/DSC00602.jpg',
      '/ASSETS/DSC00603.jpg',
      '/ASSETS/DSC00604.jpg',
    ],
    category: 'accessories',
    description: {
      rus: 'Лёгкая хлопковая сумка с принтом.',
      eng: 'Lightweight cotton bag with print.',
    },
    sizes: [],
  },
  case: {
    id: 'case',
    name: 'Чехол для очков',
    price: '1000 ₽',
    image: '/ASSETS/DSC00612.jpg',
    images: [
      '/ASSETS/DSC00612.jpg',
      '/ASSETS/DSC00614.jpg',
      '/ASSETS/DSC00620.jpg',
      '/ASSETS/DSC00623.jpg',
      '/ASSETS/DSC04548.jpg',
      '/ASSETS/bagf.jpg',
    ],
    category: 'accessories',
    description: {
      rus: 'Защитный чехол для очков с логотипом СОЮЗ.',
      eng: 'Protective glasses case with СОЮЗ logo.',
    },
    sizes: ['Один размер'],
  },
  socks: {
    id: 'socks',
    name: 'Носки',
    price: '500 ₽',
    image: '/ASSETS/DSC00591.jpg',
    images: [
      '/ASSETS/DSC00591.jpg',
      '/ASSETS/DSC00593.jpg',
      '/ASSETS/DSC00594.jpg',
      '/ASSETS/DSC09502.jpg',
    ],
    category: 'accessories',
    description: {
      rus: 'Удобные носки с вышивкой логотипа.',
      eng: 'Comfortable socks with logo embroidery.',
    },
    sizes: [],
  },
};

// --- Функции ниже оставить без изменений ---
export function getProductsByCategory(category: string) {
  return Object.values(productsData).filter(
    (product) => product.category === category
  );
}

export function getAllProducts() {
  return Object.values(productsData);
}
