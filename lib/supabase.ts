import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Vérification de la configuration (utile pour le build Vercel)
const isConfigured = supabaseUrl && supabaseAnonKey;
const isAdminConfigured = isConfigured && supabaseServiceKey;

if (!isConfigured && process.env.NODE_ENV === 'production') {
    console.warn('⚠️ Supabase client not configured: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is missing.');
}

// Client public (lecture seule côté front)
export const supabase = isConfigured
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null as any;

// Client admin (lecture/écriture côté serveur uniquement)
export const supabaseAdmin = isAdminConfigured
    ? createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    })
    : null as any;
