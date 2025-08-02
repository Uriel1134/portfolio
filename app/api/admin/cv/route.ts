import { NextRequest, NextResponse } from 'next/server';
import { writeFile, unlink, readdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { requireAuth } from '../../../../lib/auth';

// GET - Récupérer les informations du CV
export const GET = requireAuth(async (request: NextRequest) => {

  try {
    const cvDir = path.join(process.cwd(), 'public', 'cv');
    
    // Vérifier si le dossier existe
    if (!existsSync(cvDir)) {
      return NextResponse.json({ 
        cv: null,
        message: 'Aucun CV uploadé'
      });
    }

    // Lire les fichiers dans le dossier CV
    const files = await readdir(cvDir);
    const cvFiles = files.filter(file => 
      file.toLowerCase().endsWith('.pdf') || 
      file.toLowerCase().endsWith('.doc') || 
      file.toLowerCase().endsWith('.docx')
    );

    if (cvFiles.length === 0) {
      return NextResponse.json({ 
        cv: null,
        message: 'Aucun CV trouvé'
      });
    }

    // Retourner le premier CV trouvé
    const cvFile = cvFiles[0];
    const cvPath = `/cv/${cvFile}`;
    
    return NextResponse.json({
      cv: {
        filename: cvFile,
        path: cvPath,
        uploadedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération du CV:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du CV' },
      { status: 500 }
    );
  }
});

// POST - Uploader un nouveau CV
export const POST = requireAuth(async (request: NextRequest) => {

  try {
    const formData = await request.formData();
    const file = formData.get('cv') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      );
    }

    // Vérifier le type de fichier
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Type de fichier non autorisé. Seuls les fichiers PDF, DOC et DOCX sont acceptés.' },
        { status: 400 }
      );
    }

    // Vérifier la taille du fichier (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Le fichier est trop volumineux. Taille maximale: 10MB' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Créer le dossier CV s'il n'existe pas
    const cvDir = path.join(process.cwd(), 'public', 'cv');
    if (!existsSync(cvDir)) {
      await writeFile(path.join(cvDir, '.gitkeep'), '');
    }

    // Supprimer l'ancien CV s'il existe
    try {
      const existingFiles = await readdir(cvDir);
      for (const existingFile of existingFiles) {
        if (existingFile !== '.gitkeep') {
          await unlink(path.join(cvDir, existingFile));
        }
      }
    } catch (error) {
      // Ignorer les erreurs si le dossier n'existe pas
    }

    // Générer un nom de fichier unique
    const fileExtension = path.extname(file.name);
    const filename = `cv-auriol-lissan${fileExtension}`;
    const filepath = path.join(cvDir, filename);

    // Sauvegarder le nouveau fichier
    await writeFile(filepath, buffer);

    return NextResponse.json({
      success: true,
      cv: {
        filename,
        path: `/cv/${filename}`,
        uploadedAt: new Date().toISOString()
      },
      message: 'CV uploadé avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de l\'upload du CV:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'upload du CV' },
      { status: 500 }
    );
  }
});

// DELETE - Supprimer le CV
export const DELETE = requireAuth(async (request: NextRequest) => {

  try {
    const cvDir = path.join(process.cwd(), 'public', 'cv');
    
    if (!existsSync(cvDir)) {
      return NextResponse.json({ 
        success: true,
        message: 'Aucun CV à supprimer'
      });
    }

    // Supprimer tous les fichiers CV
    const files = await readdir(cvDir);
    for (const file of files) {
      if (file !== '.gitkeep') {
        await unlink(path.join(cvDir, file));
      }
    }

    return NextResponse.json({
      success: true,
      message: 'CV supprimé avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de la suppression du CV:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du CV' },
      { status: 500 }
    );
  }
});
