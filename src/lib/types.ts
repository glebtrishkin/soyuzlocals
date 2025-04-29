// Product category types
export type ProductCategory = 'clothing' | 'accessories' | 'friends';

// Product data type
export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  category: ProductCategory;
  brand?: string; // For "friends" category to indicate the brand
  description?: {
    rus: string;
    eng: string;
  };
  sizes?: string[];
  modelInfo?: {
    rus: string[];
    eng: string[];
  };
  images?: string[];
  thumbnails?: string[];
}

// Cart item type
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  size: string;
  price: string;
  quantity: number;
  image: string;
  maxAvailable: number;
}