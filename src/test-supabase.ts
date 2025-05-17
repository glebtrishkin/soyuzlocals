import { supabase } from './lib/supabase';
import dotenv from 'dotenv';

// Load environment variables for testing
dotenv.config();

async function testSupabase() {
  try {
    const { data, error } = await supabase.from('inventory').select('*').limit(1);
    if (error) throw error;
    console.log('✅ Supabase connection successful');
    console.log('Sample data:', data);
  } catch (error) {
    console.error('❌ Supabase connection failed:', error);
  }
}

testSupabase();