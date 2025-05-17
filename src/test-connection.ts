import { supabase } from './lib/supabase';

async function testConnection() {
    try {
        // Test basic connection
        console.log('Testing Supabase connection...');
        const { data, error } = await supabase.from('inventory').select('*').limit(5);
        
        if (error) {
            console.error('❌ Connection error:', error.message);
            return;
        }
        
        console.log('✅ Connection successful!');
        console.log('Sample data:', data);

        // Test specific product queries
        console.log('\nTesting specific products:');
        
        const products = ['pants-1', 'hoodie-1', 'tshirt-2'];
        
        for (const code of products) {
            const { data: productData, error: productError } = await supabase
                .from('inventory')
                .select('*')
                .eq('code', code);
            
            if (productError) {
                console.error(`❌ Error querying ${code}:`, productError.message);
            } else {
                console.log(`\n${code} inventory:`);
                console.table(productData);
            }
        }

    } catch (err) {
        console.error('❌ Unexpected error:', err);
    }
}

// Run the test
testConnection();