import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config({ path: '.env.local' });
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Erreur: NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY doivent être définis.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function importData() {
    try {
        const dataPath = path.resolve(process.cwd(), 'data/portfolio.json');
        if (!fs.existsSync(dataPath)) {
            console.error('Erreur: Fichier data/portfolio.json introuvable.');
            return;
        }

        const fileContent = fs.readFileSync(dataPath, 'utf8');
        const { projects, awards } = JSON.parse(fileContent);

        console.log(`Importation de ${projects.length} projets et ${awards.length} distinctions...`);

        // 1. Importer les Projets
        for (const project of projects) {
            console.log(`- Importation du projet: ${project.title}`);

            const payload = {
                id: project.id,
                title: project.title,
                description: project.description,
                long_description: project.longDescription,
                image: project.image,
                images: project.images || [],
                company_name: project.companyName || null,
                category: project.category,
                tech: project.tech,
                year: project.year.toString(),
                figma_link: project.figmaLink || null,
                github_link: project.githubLink || null,
                created_at: project.createdAt || new Date().toISOString(),
                updated_at: project.updatedAt || new Date().toISOString(),
            };

            const { error } = await supabase.from('projects').upsert(payload, { onConflict: 'id' });
            if (error) console.error(`  Erreur Upsert Projet (${project.title}):`, error.message);
        }

        // 2. Importer les Distinctions
        for (const award of awards) {
            console.log(`- Importation de la distinction: ${award.title}`);

            const payload = {
                id: award.id,
                title: award.title,
                event: award.event,
                description: award.description,
                date: award.date,
                location: award.location,
                image: award.image,
                certificate: award.certificate,
                icon: award.icon,
                gradient: award.gradient,
                border_color: award.borderColor,
                bg_color: award.bgColor,
                created_at: award.createdAt || new Date().toISOString(),
                updated_at: award.updatedAt || new Date().toISOString(),
            };

            const { error } = await supabase.from('awards').upsert(payload, { onConflict: 'id' });
            if (error) console.error(`  Erreur Upsert Distinction (${award.title}):`, error.message);
        }

        console.log('✅ Importation terminée avec succès !');
    } catch (err) {
        console.error('❌ Erreur critique lors de l\'importation:', err);
    }
}

importData();
