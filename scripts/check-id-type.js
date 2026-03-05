const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
    const { data, error } = await supabase.rpc('get_table_info', { table_name: 'projects' });
    // If RPC doesn't exist, we'll try a regular query on a known table if possible, 
    // but better to just try to fetch one row and see the type of ID.
    const { data: rows, error: rowError } = await supabase.from('projects').select('*').limit(1);
    if (rowError) {
        console.error('Row Error:', rowError);
    } else {
        console.log('Row ID type:', typeof rows[0].id);
        console.log('Row ID value:', rows[0].id);
    }
}
run();
