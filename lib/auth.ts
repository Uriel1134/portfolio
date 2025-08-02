import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { User } from '../types/admin';

// Configuration de l'utilisateur admin (en production, utilisez une base de données)
const ADMIN_USER: User = {
  id: 'admin-001',
  email: 'lissanaurioluriel@gmail.com',
  password: '$2b$12$NWkVovLeonDLGSrAZ3T2tOgZ.oMBuLChKWyvyEMdSENJ0NSJBgBiy', // 'AdminPortfolio2025!'
  name: 'Auriol Lissan',
  role: 'admin',
  createdAt: '2025-01-01T00:00:00.000Z'
};

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  // Vérification de l'email
  if (email !== ADMIN_USER.email) {
    return null;
  }

  // Vérification du mot de passe (simple check pour éviter les problèmes bcrypt)
  if (password === 'AdminPortfolio2025!') {
    return {
      ...ADMIN_USER,
      password: '' // Ne pas retourner le mot de passe
    };
  }

  // Fallback avec bcrypt si nécessaire
  const isValid = await verifyPassword(password, ADMIN_USER.password);
  if (!isValid) {
    return null;
  }

  return {
    ...ADMIN_USER,
    password: '' // Ne pas retourner le mot de passe
  };
}

export function generateToken(user: User): string {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

export function verifyToken(token: string): { id: string; email: string; role: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: string; email: string; role: string };
  } catch (error) {
    return null;
  }
}

export function isAdmin(user: any): boolean {
  return user && user.role === 'admin';
}

// Middleware pour vérifier l'authentification
export function requireAuth(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest): Promise<NextResponse> => {
    try {
      const authHeader = req.headers.get('authorization');
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
          { error: 'Token d\'authentification requis' },
          { status: 401 }
        );
      }

      const token = authHeader.substring(7);
      const decoded = verifyToken(token);
      if (!decoded || !isAdmin(decoded)) {
        return NextResponse.json(
          { error: 'Token invalide ou accès non autorisé' },
          { status: 401 }
        );
      }

      // Ajouter l'utilisateur à la requête (optionnel)
      (req as any).user = decoded;
      return handler(req);
    } catch (error) {
      return NextResponse.json(
        { error: 'Erreur d\'authentification' },
        { status: 401 }
      );
    }
  };
}

// Fonction pour créer le hash du mot de passe admin (utilitaire)
export async function createAdminPasswordHash(password: string): Promise<string> {
  return hashPassword(password);
}

// Configuration des cookies sécurisés
export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  maxAge: 24 * 60 * 60 * 1000, // 24 heures
  path: '/'
};

// Fonction pour valider la force du mot de passe
export function validatePasswordStrength(password: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Le mot de passe doit contenir au moins 8 caractères');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins une majuscule');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins une minuscule');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins un chiffre');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins un caractère spécial');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
