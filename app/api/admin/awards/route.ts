import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '../../../../lib/auth';
import { getAwards, createAward } from '../../../../lib/data';

// GET - Récupérer toutes les distinctions
export const GET = requireAuth(async (req: NextRequest) => {
  try {
    const awards = await getAwards();
    return NextResponse.json({ success: true, awards });
  } catch (error) {
    console.error('Erreur lors de la récupération des distinctions:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des distinctions' },
      { status: 500 }
    );
  }
});

// POST - Créer une nouvelle distinction
export const POST = requireAuth(async (req: NextRequest) => {
  try {
    const awardData = await req.json();
    
    // Validation des données requises
    if (!awardData.title || !awardData.event || !awardData.description) {
      return NextResponse.json(
        { error: 'Titre, événement et description sont requis' },
        { status: 400 }
      );
    }

    if (!awardData.date || !awardData.location) {
      return NextResponse.json(
        { error: 'Date et lieu sont requis' },
        { status: 400 }
      );
    }

    // Définir des valeurs par défaut si non fournies
    if (!awardData.image) {
      awardData.image = '/images/awards/placeholder-trophy.svg';
    }

    if (!awardData.certificate) {
      awardData.certificate = '/images/certificates/placeholder-certificate.svg';
    }

    if (!awardData.icon) {
      awardData.icon = 'ri-award-line';
    }

    if (!awardData.gradient) {
      awardData.gradient = 'from-blue-400 to-purple-400';
    }

    if (!awardData.borderColor) {
      awardData.borderColor = 'border-blue-200';
    }

    if (!awardData.bgColor) {
      awardData.bgColor = 'bg-blue-50';
    }

    const newAward = await createAward(awardData);
    return NextResponse.json({ success: true, award: newAward }, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création de la distinction:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de la distinction' },
      { status: 500 }
    );
  }
});
