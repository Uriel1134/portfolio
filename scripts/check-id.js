const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
    try {
        const { data, error } = await supabase.from('projects').select('id').limit(1);
        if (error) {
            console.error('Error fetching project:', error);
            return;
        }
        if (data && data.length > 0) {
            console.log('ID value:', data[0].id);
            console.log('ID type:', typeof data[0].id);
        } else {
            console.log('No projects found');
        }
    } catch (err) {
        console.error('Catch error:', err);
    }
}
run();
