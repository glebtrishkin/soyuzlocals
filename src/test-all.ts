import { supabase, getAllInventory, getProductInventory, checkStockByCodeAndSize } from './lib/supabase';

async function runAllTests() {
  console.log('🧪 Running all database tests...\n');

  // Test 1: Basic Connection
  console.log('Test 1: Basic Connection');
  try {
    const { data, error } = await supabase.from('inventory').select('*').limit(1);
    if (error) throw error;
    console.log('✅ Database connection successful!\n');
  } catch (error) {
    console.error('❌ Connection failed:', error);
    return;
  }

  // Test 2: Get All Inventory
  console.log('Test 2: Get All Inventory');
  try {
    const inventory = await getAllInventory();
    console.log(`✅ Found ${inventory.length} items in inventory\n`);
  } catch (error) {
    console.error('❌ Failed to get all inventory:', error);
  }

  // Test 3: Get Product Inventory
  console.log('Test 3: Get Product Inventory');
  const products = ['pants-1', 'hoodie-1', 'tshirt-2'];
  for (const productId of products) {
    try {
      const inventory = await getProductInventory(productId);
      console.log(`✅ ${productId}: Found ${inventory.length} size variants`);
      inventory.forEach(item => {
        console.log(`  - Size ${item.size}: ${item.stock} in stock`);
      });
    } catch (error) {
      console.error(`❌ Failed to get inventory for ${productId}:`, error);
    }
  }
  console.log();

  // Test 4: Check Stock By Code and Size
  console.log('Test 4: Check Stock By Code and Size');
  const stockChecks = [
    { code: 'pants-1', size: 'M' },
    { code: 'hoodie-1', size: 'L' },
    { code: 'tshirt-2', size: 'XL' }
  ];

  for (const check of stockChecks) {
    try {
      const result = await checkStockByCodeAndSize(check.code, check.size);
      console.log(`✅ ${check.code} (${check.size}): ${
        result.inStock 
          ? `In stock (${result.quantity} available)` 
          : 'Out of stock'
      }`);
    } catch (error) {
      console.error(`❌ Failed to check stock for ${check.code} ${check.size}:`, error);
    }
  }
}

// Run all tests
runAllTests();