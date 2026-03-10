const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function inspect() {
    console.log('--- INSPECTION COMPLÈTE DES PROJETS ---');
    const { data, error } = await supabase
        .from('projects')
        .select('id, title, year');

    if (error) {
        console.error('Erreur Supabase:', error);
    } else {
        console.log('Nombre de projets:', data.length);
        data.forEach((p, i) => {
            console.log(`${i + 1}. ID: [${p.id}] | Titre: [${p.title}]`);
        });
    }
}

inspect();
