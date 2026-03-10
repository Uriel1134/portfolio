const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkType() {
    console.log('--- Vérification du type de la colonne ID ---');
    // On récupère une ligne pour voir le format
    const { data, error } = await supabase
        .from('projects')
        .select('id')
        .limit(1);

    if (error) {
        console.error('Erreur Supabase:', error);
    } else if (data && data.length > 0) {
        const id = data[0].id;
        console.log('Exemple d\'ID:', id);
        console.log('Type détecté (typeof):', typeof id);

        // Test d'insertion d'un ID texte pour voir si c'est autorisé
        const testId = 'test-' + Date.now();
        console.log('Test d\'insertion avec ID texte:', testId);
        const { error: insertError } = await supabase
            .from('projects')
            .insert({ id: testId, title: 'Test ID Type' });

        if (insertError) {
            console.log('L\'insertion a échoué (Probablement UUID):', insertError.message);
        } else {
            console.log('L\'insertion a réussi (C\'est une colonne TEXT !)');
            // Nettoyage
            await supabase.from('projects').delete().eq('id', testId);
        }
    }
}

checkType();
