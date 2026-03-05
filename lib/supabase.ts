import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Vérification de la configuration (utile pour le build Vercel)
const isConfigured = !!(supabaseUrl && supabaseAnonKey);
const isAdminConfigured = !!(isConfigured && supabaseServiceKey);

if (process.env.NODE_ENV !== 'production') {
    console.log('DEBUG SUPABASE CONFIG:', {
        hasUrl: !!supabaseUrl,
        hasAnon: !!supabaseAnonKey,
        hasService: !!supabaseServiceKey,
        isConfigured,
        isAdminConfigured
    });
} else if (!isConfigured) {
    console.warn('⚠️ Supabase client not configured: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is missing.');
}

// Client public (lecture seule côté front)
export const supabase = isConfigured
    ? createClient(supabaseUrl, supabaseAnonKey)
    : new Proxy({}, {
        get: () => { throw new Error('Supabase client used but not configured. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'); }
    }) as any;

// Client admin (lecture/écriture côté serveur uniquement)
export const supabaseAdmin = isAdminConfigured
    ? createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    })
    : new Proxy({}, {
        get: (target, prop) => {
            if (prop === 'then') return undefined; // Avoid issues with async/await
            throw new Error('Supabase Admin client used but not configured. Check SUPABASE_SERVICE_ROLE_KEY.');
        }
    }) as any;
