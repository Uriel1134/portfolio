const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function find() {
    console.log('--- Recherche du projet PTC Care ---');
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .or('id.eq.ptccare-mobile,title.ilike.%ptccare%');

    if (error) {
        console.error('Erreur Supabase:', error);
    } else {
        console.log('Résultats:', JSON.stringify(data, null, 2));
    }
}

find();
