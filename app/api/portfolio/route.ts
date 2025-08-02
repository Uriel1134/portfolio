import { NextRequest, NextResponse } from 'next/server';
import { readData } from '../../../lib/data';
import { readdir, existsSync } from 'fs';
import { promisify } from 'util';
import path from 'path';

const readdirAsync = promisify(readdir);

// GET - Récupérer les données publiques du portfolio
export async function GET(request: NextRequest) {
  try {
    const data = await readData();

    // Récupérer le CV s'il existe
    let cv = null;
    try {
      const cvDir = path.join(process.cwd(), 'public', 'cv');
      if (existsSync(cvDir)) {
        const files = await readdirAsync(cvDir);
        const cvFiles = files.filter(file =>
          file.toLowerCase().endsWith('.pdf') ||
          file.toLowerCase().endsWith('.doc') ||
          file.toLowerCase().endsWith('.docx')
        );

        if (cvFiles.length > 0) {
          const cvFile = cvFiles[0];
          cv = {
            filename: cvFile,
            path: `/cv/${cvFile}`,
            uploadedAt: new Date().toISOString()
          };
        }
      }
    } catch (cvError) {
      console.log('Aucun CV trouvé:', cvError);
    }

    // Retourner seulement les données nécessaires pour le portfolio public
    return NextResponse.json({
      success: true,
      projects: data.projects,
      awards: data.awards,
      cv: cv,
      lastUpdated: data.lastUpdated
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des données du portfolio:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des données' },
      { status: 500 }
    );
  }
}
