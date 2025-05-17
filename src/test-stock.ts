import { supabase } from './lib/supabase';

async function checkStock(productCode: string, size: string) {
    try {
        console.log(`Checking stock for ${productCode} size ${size}...`);
        
        // First try exact match
        const { data, error } = await supabase
            .from('inventory')
            .select('*')
            .eq('code', productCode)
            .eq('size', size)
            .maybeSingle();

        if (error) {
            console.error('Query error:', error);
            return 'Ошибка загрузки';
        }

        // Log the full response for debugging
        console.log('Query response:', data);

        if (!data) {
            console.log('No data found, trying case-insensitive search...');
            
            // Try case-insensitive match
            const { data: ilikeData, error: ilikeError } = await supabase
                .from('inventory')
                .select('*')
                .ilike('code', productCode)
                .ilike('size', size)
                .maybeSingle();

            if (ilikeError) {
                console.error('Case-insensitive query error:', ilikeError);
                return 'Ошибка загрузки';
            }

            console.log('Case-insensitive response:', ilikeData);
            
            if (!ilikeData) {
                return 'Нет в наличии';
            }

            return ilikeData.stock > 0 ? `В наличии: ${ilikeData.stock} шт.` : 'Нет в наличии';
        }

        return data.stock > 0 ? `В наличии: ${data.stock} шт.` : 'Нет в наличии';
    } catch (err) {
        console.error('Unexpected error:', err);
        return 'Ошибка загрузки';
    }
}

// Test multiple products and sizes
async function runTests() {
    console.log('Running stock check tests...\n');

    const tests = [
        { code: 'tshirt-2', size: 'M' },
        { code: 'pants-1', size: 'L' },
        { code: 'hoodie-1', size: 'M' },
        // Test case sensitivity
        { code: 'PANTS-1', size: 'L' },
        { code: 'Hoodie-1', size: 'M' },
    ];

    for (const test of tests) {
        console.log(`\nTesting ${test.code} (${test.size}):`);
        const result = await checkStock(test.code, test.size);
        console.log('Result:', result);
        console.log('-'.repeat(50));
    }
}

// Run the tests
runTests();