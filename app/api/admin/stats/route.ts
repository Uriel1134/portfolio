import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '../../../../lib/auth';
import { getStats } from '../../../../lib/data';

// GET - Récupérer les statistiques du portfolio
export const GET = requireAuth(async (req: NextRequest) => {
  try {
    const stats = await getStats();
    return NextResponse.json({ success: true, stats });
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des statistiques' },
      { status: 500 }
    );
  }
});
