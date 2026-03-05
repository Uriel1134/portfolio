import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../../../../lib/auth';
import { supabaseAdmin } from '../../../../lib/supabase';

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const authHeader = request.headers.get('authorization');
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

    // Récupérer les données du formulaire
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'misc';

    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      );
    }

    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Seules les images sont autorisées' },
        { status: 400 }
      );
    }

    // Vérifier la taille (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Fichier trop volumineux (max 5MB)' },
        { status: 400 }
      );
    }

    // Générer un nom de fichier unique
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `${folder}/${timestamp}_${originalName}`;

    // Convertir le fichier en buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload vers Supabase Storage (Bucket 'portfolio')
    const { data, error } = await supabaseAdmin
      .storage
      .from('portfolio')
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: true
      });

    if (error) {
      console.error('Erreur Supabase Storage:', error);
      return NextResponse.json(
        { error: `Erreur lors de l'upload: ${error.message}` },
        { status: 500 }
      );
    }

    // Récupérer l'URL publique
    const { data: { publicUrl } } = supabaseAdmin
      .storage
      .from('portfolio')
      .getPublicUrl(fileName);

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: fileName,
      size: file.size,
      type: file.type
    });

  } catch (error) {
    console.error('Erreur lors de l\'upload:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'upload du fichier' },
      { status: 500 }
    );
  }
}
