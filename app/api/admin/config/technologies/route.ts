import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../../../../../lib/auth';
import { getProjectTechnologies, addProjectTechnology } from '../../../../../lib/data';

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

        const technologies = await getProjectTechnologies();
        return NextResponse.json({ technologies });
    } catch (error) {
        console.error('Erreur API technologies GET:', error);
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
        }

        const token = authHeader.substring(7);
        if (!verifyToken(token)) {
            return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
        }

        const { name, type } = await req.json();
        if (!name) {
            return NextResponse.json({ error: 'Nom requis' }, { status: 400 });
        }

        const success = await addProjectTechnology(name, type || 'common');
        if (success) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: 'Erreur lors de l\'ajout' }, { status: 500 });
        }
    } catch (error) {
        console.error('Erreur API technologies POST:', error);
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
}
