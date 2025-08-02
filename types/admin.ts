// Types pour le système d'administration du portfolio

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  images?: string[]; // Nouvelles images multiples pour créations graphiques/branding
  companyName?: string; // Nom de l'entreprise pour regroupement
  category: string[];
  tech: string[];
  year: string;
  figmaLink?: string;
  githubLink?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Award {
  id: string;
  title: string;
  event: string;
  description: string;
  date: string;
  location: string;
  image: string;
  certificate: string;
  icon: string;
  gradient: string;
  borderColor: string;
  bgColor: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin';
  createdAt: string;
}

export interface AdminData {
  projects: Project[];
  awards: Award[];
  lastUpdated: string;
}

// Types pour les formulaires
export interface ProjectFormData {
  title: string;
  description: string;
  longDescription: string;
  category: string[];
  tech: string[];
  year: string;
  figmaLink?: string;
  githubLink?: string;
}

export interface AwardFormData {
  title: string;
  event: string;
  description: string;
  date: string;
  location: string;
  icon: string;
  gradient: string;
  borderColor: string;
  bgColor: string;
}

// Types pour les uploads
export interface UploadResponse {
  success: boolean;
  filename?: string;
  url?: string;
  error?: string;
}

// Constantes pour les catégories et technologies
export const PROJECT_CATEGORIES = [
  'UI/UX Design',
  'Développement Web',
  'Développement Mobile',
  'Création Graphique',
  'Branding',
  'Art Digital'
] as const;

export const COMMON_TECHNOLOGIES = [
  'React',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'HTML/CSS',
  'Tailwind CSS',
  'Node.js',
  'Flutter',
  'React Native',
  'Figma',
  'Adobe XD',
  'Photoshop',
  'Illustrator',
  'Firebase',
  'MongoDB',
  'PostgreSQL',
  'MySQL',
  'SQLite',
  'Laravel',
  'Django',
  'Express.js',
  'Vue.js',
  'Angular',
  'Python',
  'Java',
  'C#',
  'PHP'
] as const;

export const GRAPHIC_TECHNOLOGIES = [
  'Photoshop',
  'Illustrator',
  'InDesign',
  'After Effects',
  'Premiere Pro',
  'Figma',
  'Adobe XD',
  'Canva',
  'CorelDRAW',
  'Sketch',
  'Procreate',
  'Blender',
  'Cinema 4D'
] as const;

export const AWARD_ICONS = [
  'ri-medal-line',
  'ri-award-line',
  'ri-star-line',
  'ri-trophy-line',
  'ri-gift-line',
  'ri-crown-line'
] as const;

export const AWARD_GRADIENTS = [
  'from-yellow-400 to-orange-400',
  'from-blue-400 to-purple-400',
  'from-green-400 to-teal-400',
  'from-red-400 to-pink-400',
  'from-purple-400 to-indigo-400',
  'from-indigo-400 to-blue-400'
] as const;

export const AWARD_BORDER_COLORS = [
  'border-yellow-200',
  'border-blue-200',
  'border-green-200',
  'border-red-200',
  'border-purple-200',
  'border-indigo-200'
] as const;

export const AWARD_BG_COLORS = [
  'bg-yellow-50',
  'bg-blue-50',
  'bg-green-50',
  'bg-red-50',
  'bg-purple-50',
  'bg-indigo-50'
] as const;

export type ProjectCategory = typeof PROJECT_CATEGORIES[number];
export type Technology = typeof COMMON_TECHNOLOGIES[number];
export type AwardIcon = typeof AWARD_ICONS[number];
export type AwardGradient = typeof AWARD_GRADIENTS[number];
export type AwardBorderColor = typeof AWARD_BORDER_COLORS[number];
export type AwardBgColor = typeof AWARD_BG_COLORS[number];
