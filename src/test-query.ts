import { supabase } from './lib/supabase';

async function testQuery() {
  try {
    console.log('Testing inventory queries...');
    
    // Test query for pants-1
    console.log('\nTesting pants-1:');
    const { data: pantsData, error: pantsError } = await supabase
      .from('inventory')
      .select('*')
      .eq('code', 'pants-1');
    
    if (pantsError) {
      console.error('Error querying pants-1:', pantsError);
    } else {
      console.log('pants-1 data:', pantsData);
    }
    
    // Test query for hoodie-1
    console.log('\nTesting hoodie-1:');
    const { data: hoodieData, error: hoodieError } = await supabase
      .from('inventory')
      .select('*')
      .eq('code', 'hoodie-1');
    
    if (hoodieError) {
      console.error('Error querying hoodie-1:', hoodieError);
    } else {
      console.log('hoodie-1 data:', hoodieData);
    }
    
    // Test case-insensitive query
    console.log('\nTesting case-insensitive query for PANTS-1:');
    const { data: caseData, error: caseError } = await supabase
      .from('inventory')
      .select('*')
      .ilike('code', 'PANTS-1');
    
    if (caseError) {
      console.error('Error with case-insensitive query:', caseError);
    } else {
      console.log('Case-insensitive results:', caseData);
    }
    
    // Test getting all inventory
    console.log('\nTesting all inventory:');
    const { data: allData, error: allError } = await supabase
      .from('inventory')
      .select('*')
      .order('code', { ascending: true });
    
    if (allError) {
      console.error('Error querying all inventory:', allError);
    } else {
      console.log('Total items:', allData?.length);
      console.log('All inventory:', allData);
    }
    
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

// Execute the test query
testQuery();