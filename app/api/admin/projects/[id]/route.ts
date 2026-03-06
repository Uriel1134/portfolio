import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../../../../../lib/auth';
import { getProject, updateProject, deleteProject } from '../../../../../lib/data';

// GET - Récupérer un projet spécifique
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Vérification d'authentification
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Token d\'authentification requis' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json(
        { error: 'Token invalide' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const project = await getProject(id);

    if (!project) {
      return NextResponse.json(
        { error: 'Projet non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error('Erreur lors de la récupération du projet:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du projet' },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour un projet
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    // Vérification d'authentification
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Token d\'authentification requis' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json(
        { error: 'Token invalide' },
        { status: 401 }
      );
    }

    const projectData = await req.json();

    const updatedProject = await updateProject(id, projectData);

    if (!updatedProject) {
      return NextResponse.json(
        { error: 'Projet non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, project: updatedProject });
  } catch (error: any) {
    console.error(`Erreur API PUT /api/admin/projects/${id}:`, error);

    // Extraction du message d'erreur
    let errorMessage = 'Erreur inconnue';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'object' && error !== null) {
      errorMessage = error.message || error.details || JSON.stringify(error);
    }

    // Détection spécifique de l'erreur UUID pour aider l'utilisateur
    if (errorMessage.includes('invalid input syntax for type uuid')) {
      errorMessage = `ID invalide (${id}). Le système attend un UUID mais a reçu un slug. Veuillez rafraîchir la liste des projets.`;
    }

    return NextResponse.json(
      { error: `DEBUG SUPABASE: Erreur lors de la mise à jour du projet: ${errorMessage}` },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un projet
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Vérification d'authentification
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Token d\'authentification requis' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json(
        { error: 'Token invalide' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const deleted = await deleteProject(id);

    if (!deleted) {
      return NextResponse.json(
        { error: 'Projet non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Projet supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du projet:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du projet' },
      { status: 500 }
    );
  }
}
