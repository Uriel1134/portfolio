const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function list() {
    console.log('--- Liste des projets dans Supabase ---');
    const { data, error } = await supabase
        .from('projects')
        .select('id, title');

    if (error) {
        console.error('Erreur Supabase:', error);
    } else {
        console.log('Projets:', JSON.stringify(data, null, 2));
    }
}

list();
