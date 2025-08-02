import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '../../../../lib/auth';
import { getProjects, createProject } from '../../../../lib/data';

// GET - Récupérer tous les projets
export const GET = requireAuth(async (req: NextRequest) => {
  try {
    const projects = await getProjects();
    return NextResponse.json({ success: true, projects });
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des projets' },
      { status: 500 }
    );
  }
});

// POST - Créer un nouveau projet
export const POST = requireAuth(async (req: NextRequest) => {
  try {
    const projectData = await req.json();
    
    // Validation des données requises
    if (!projectData.title || !projectData.description || !projectData.longDescription) {
      return NextResponse.json(
        { error: 'Titre, description et description longue sont requis' },
        { status: 400 }
      );
    }

    if (!projectData.category || !Array.isArray(projectData.category) || projectData.category.length === 0) {
      return NextResponse.json(
        { error: 'Au moins une catégorie est requise' },
        { status: 400 }
      );
    }

    if (!projectData.tech || !Array.isArray(projectData.tech) || projectData.tech.length === 0) {
      return NextResponse.json(
        { error: 'Au moins une technologie est requise' },
        { status: 400 }
      );
    }

    if (!projectData.year) {
      return NextResponse.json(
        { error: 'L\'année est requise' },
        { status: 400 }
      );
    }

    // Définir une image par défaut si non fournie
    if (!projectData.image) {
      projectData.image = '/images/projects/default-project.jpg';
    }

    const newProject = await createProject(projectData);
    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création du projet:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du projet' },
      { status: 500 }
    );
  }
});
