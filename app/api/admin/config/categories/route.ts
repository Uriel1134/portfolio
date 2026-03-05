import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../../../../../lib/auth';
import { getProjectCategories } from '../../../../../lib/data';

export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
        }

        const token = authHeader.substring(7);
        if (!verifyToken(token)) {
            return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
        }

        const categories = await getProjectCategories();
        return NextResponse.json({ categories });
    } catch (error) {
        console.error('Erreur API categories:', error);
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
}
