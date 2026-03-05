import { supabase } from '../lib/supabase';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function check() {
    const { data, error } = await supabase.from('projects').select('*').limit(5);
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Projects:', JSON.stringify(data, null, 2));
    }
}

check();
