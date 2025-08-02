import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../../../../../lib/auth';
import { getAward, updateAward, deleteAward } from '../../../../../lib/data';

// GET - Récupérer une distinction spécifique
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
    const award = await getAward(id);
    
    if (!award) {
      return NextResponse.json(
        { error: 'Distinction non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, award });
  } catch (error) {
    console.error('Erreur lors de la récupération de la distinction:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de la distinction' },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour une distinction
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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

    const awardData = await req.json();
    const { id } = await params;

    const updatedAward = await updateAward(id, awardData);
    
    if (!updatedAward) {
      return NextResponse.json(
        { error: 'Distinction non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, award: updatedAward });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la distinction:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de la distinction' },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer une distinction
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
    const deleted = await deleteAward(id);
    
    if (!deleted) {
      return NextResponse.json(
        { error: 'Distinction non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Distinction supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la distinction:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la distinction' },
      { status: 500 }
    );
  }
}
