import { supabase } from './lib/supabase';

async function testInventory() {
  console.log('Testing inventory table...\n');

  try {
    // 1. Test table structure
    console.log('1. Checking table structure:');
    const { data: tableInfo, error: tableError } = await supabase
      .from('inventory')
      .select('*')
      .limit(1);

    if (tableError) {
      console.error('❌ Error accessing table:', tableError.message);
      return;
    }

    console.log('✅ Table is accessible\n');

    // 2. Test data insertion
    console.log('2. Testing specific products:');
    const products = [
      { code: 'pants-1', size: 'M' },
      { code: 'hoodie-1', size: 'L' },
      { code: 'tshirt-2', size: 'XL' }
    ];

    for (const product of products) {
      const { data, error } = await supabase
        .from('inventory')
        .select('*')
        .eq('code', product.code)
        .eq('size', product.size)
        .single();

      if (error) {
        console.error(`❌ Error querying ${product.code} ${product.size}:`, error.message);
        continue;
      }

      console.log(`✅ ${product.code} (${product.size}): ${data.stock} in stock`);
    }

    // 3. Test all inventory
    console.log('\n3. All inventory items:');
    const { data: allItems, error: allError } = await supabase
      .from('inventory')
      .select('*')
      .order('code', { ascending: true })
      .order('size', { ascending: true });

    if (allError) {
      console.error('❌ Error fetching all items:', allError.message);
      return;
    }

    console.log('Total items:', allItems.length);
    console.table(allItems.map(item => ({
      code: item.code,
      size: item.size,
      stock: item.stock,
      name: item.name
    })));

  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

testInventory();