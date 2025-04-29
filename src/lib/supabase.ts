import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false // This helps prevent issues with browser storage in some environments
  }
});

// Define the inventory item type based on the actual database schema
export type InventoryItem = {
  id: string | number;
  code: string; // Product code
  size: string; // Size code
  stock: number; // Available quantity
  name?: string; // Product name
  updated_at?: string;
  created_at?: string;
};

// Helper function to get all inventory items
export async function getAllInventory() {
  try {
    const { data, error } = await supabase
      .from('inventory')
      .select('*')
      .order('code', { ascending: true })
      .order('size', { ascending: true });
    
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    
    // Log each item individually for better debugging
    if (data && data.length > 0) {
      console.log('Inventory items breakdown:');
      data.forEach(item => {
        console.log(`Item: code=${item.code}, size=${item.size}, stock=${item.stock}`);
      });
    } else {
      console.log('No inventory items found');
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching all inventory:', error);
    return [];
  }
}

// Helper function to get inventory for a specific product
export async function getProductInventory(productId: string) {
  try {
    console.log(`Fetching inventory for product ID: ${productId}`);
    
    // First try exact match
    let { data, error } = await supabase
      .from('inventory')
      .select('*')
      .eq('code', productId)
      .order('size', { ascending: true });
    
    if (error) throw error;
    
    // If no results, try case-insensitive match
    if (!data || data.length === 0) {
      const { data: ilikeData, error: ilikeError } = await supabase
        .from('inventory')
        .select('*')
        .ilike('code', productId)
        .order('size', { ascending: true });
      
      if (ilikeError) throw ilikeError;
      data = ilikeData;
    }
    
    console.log(`Inventory for ${productId}:`, data);
    return data || [];
  } catch (error) {
    console.error(`Error fetching inventory for product ${productId}:`, error);
    return [];
  }
}

// Check stock by code and size
export async function checkStockByCodeAndSize(code: string, size: string): Promise<{
  inStock: boolean;
  quantity: number;
  productName?: string;
}> {
  try {
    console.log(`Checking stock for code: ${code}, size: ${size}`);
    
    // First try exact match
    let { data, error } = await supabase
      .from('inventory')
      .select('*')
      .eq('code', code)
      .eq('size', size)
      .maybeSingle();
    
    if (error) throw error;
    
    // If no results, try case-insensitive match
    if (!data) {
      const { data: ilikeData, error: ilikeError } = await supabase
        .from('inventory')
        .select('*')
        .ilike('code', code)
        .ilike('size', size)
        .maybeSingle();
      
      if (ilikeError) throw ilikeError;
      data = ilikeData;
    }
    
    if (data) {
      const stock = data.stock || 0;
      console.log(`Found item:`, data);
      return {
        inStock: stock > 0,
        quantity: stock,
        productName: data.name
      };
    }
    
    console.log(`No inventory found for ${code}/${size}`);
    return { inStock: false, quantity: 0 };
  } catch (error) {
    console.error(`Error checking stock for ${code}/${size}:`, error);
    return { inStock: false, quantity: 0 };
  }
}

// Helper function to group inventory by product ID
export function groupInventoryByProduct(items: InventoryItem[]) {
  const grouped: Record<string, InventoryItem[]> = {};
  
  items.forEach(item => {
    if (!item.code) return;
    
    // Normalize the product ID to lowercase for consistent grouping
    const productId = item.code.toLowerCase();
    if (!grouped[productId]) {
      grouped[productId] = [];
    }
    
    grouped[productId].push({
      ...item,
      stock: item.stock || 0
    });
  });
  
  // Create a version with original product IDs
  const result: Record<string, InventoryItem[]> = {};
  Object.entries(grouped).forEach(([key, value]) => {
    // Use the original code from the first item in the group
    const originalCode = value[0].code;
    result[originalCode] = value;
  });
  
  return result;
}

// Helper function to check if a specific size is in stock
export function isSizeInStock(inventory: InventoryItem[], size: string): boolean {
  const sizeItem = inventory.find(item => 
    item.size.toLowerCase() === size.toLowerCase()
  );
  return !!sizeItem && (sizeItem.stock || 0) > 0;
}

// Helper function to get quantity for a specific size
export function getSizeQuantity(inventory: InventoryItem[], size: string): number {
  const sizeItem = inventory.find(item => 
    item.size.toLowerCase() === size.toLowerCase()
  );
  return sizeItem ? (sizeItem.stock || 0) : 0;
}

// Helper function to get all available sizes with stock information
export function getAvailableSizes(inventory: InventoryItem[]) {
  const sizeOrder = { 'xs': 0, 's': 1, 'm': 2, 'l': 3, 'xl': 4, 'xxl': 5 };
  
  return inventory
    .map(item => ({
      size: item.size,
      inStock: (item.stock || 0) > 0,
      quantity: item.stock || 0
    }))
    .sort((a, b) => {
      const aOrder = sizeOrder[a.size.toLowerCase()] || 99;
      const bOrder = sizeOrder[b.size.toLowerCase()] || 99;
      return aOrder - bOrder;
    });
}