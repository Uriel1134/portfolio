import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Erreur: NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY doivent être définis.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkData() {
    try {
        const { count: projectCount, error: projectError } = await supabase
            .from('projects')
            .select('*', { count: 'exact', head: true });

        if (projectError) throw projectError;

        const { count: awardCount, error: awardError } = await supabase
            .from('awards')
            .select('*', { count: 'exact', head: true });

        if (awardError) throw awardError;

        console.log('--- STATUT DE LA BASE DE DONNÉES ---');
        console.log(`URL: ${supabaseUrl}`);
        console.log(`Nombre de Projets: ${projectCount}`);
        console.log(`Nombre de Distinctions: ${awardCount}`);
        console.log('-----------------------------------');
    } catch (err) {
        console.error('❌ Erreur lors de la vérification:', err.message);
    }
}

checkData();
