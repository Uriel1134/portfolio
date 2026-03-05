import { supabaseAdmin } from './supabase';
import { Project, Award } from '../types/admin';

// Helper pour mapper les données Supabase (snake_case) vers les types TS (camelCase)
function mapProject(row: Record<string, any> | null): Project | null {
  if (!row) return null;
  try {
    return {
      id: row.id as string,
      title: row.title as string,
      description: row.description as string,
      longDescription: row.long_description as string,
      image: row.image as string,
      images: (row.images as string[]) || [],
      companyName: row.company_name as string | undefined,
      category: (row.category as string[]) || [],
      tech: (row.tech as string[]) || [],
      year: row.year as string,
      figmaLink: row.figma_link as string | undefined,
      githubLink: row.github_link as string | undefined,
      createdAt: row.created_at as string,
      updatedAt: row.updated_at as string,
    };
  } catch (err) {
    console.error('Erreur de mapping projet:', err, row);
    return null;
  }
}

function mapAward(row: Record<string, any> | null): Award | null {
  if (!row) return null;
  try {
    return {
      id: row.id as string,
      title: row.title as string,
      event: row.event as string,
      description: row.description as string,
      date: row.date as string,
      location: row.location as string,
      image: row.image as string,
      certificate: row.certificate as string,
      icon: row.icon as string,
      gradient: row.gradient as string,
      borderColor: row.border_color as string,
      bgColor: row.bg_color as string,
      createdAt: row.created_at as string,
      updatedAt: row.updated_at as string,
    };
  } catch (err) {
    console.error('Erreur de mapping award:', err, row);
    return null;
  }
}

// ── PROJETS ──────────────────────────────────────────────────────────────────

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabaseAdmin
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Erreur getProjects:', error);
    throw new Error(error.message);
  }
  return (data || []).map(row => mapProject(row)).filter(Boolean) as Project[];
}

export async function getProject(id: string): Promise<Project | null> {
  const { data, error } = await supabaseAdmin
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();
  if (error) {
    console.error(`Erreur getProject(${id}):`, error);
    return null;
  }
  return mapProject(data);
}

export async function createProject(
  projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Project> {
  const payload = {
    title: projectData.title,
    description: projectData.description,
    long_description: projectData.longDescription,
    image: projectData.image || '/images/projects/default-project.jpg',
    images: projectData.images || [],
    company_name: projectData.companyName || null,
    category: projectData.category,
    tech: projectData.tech,
    year: projectData.year.toString(),
    figma_link: projectData.figmaLink || null,
    github_link: projectData.githubLink || null,
  };

  const { data, error } = await supabaseAdmin
    .from('projects')
    .insert(payload)
    .select()
    .single();

  if (error) {
    console.error('Erreur createProject:', error, payload);
    throw new Error(error.message);
  }
  const result = mapProject(data);
  if (!result) throw new Error('Erreur de mapping après création');
  return result;
}

export async function updateProject(
  id: string,
  projectData: Partial<Omit<Project, 'id' | 'createdAt'>>
): Promise<Project | null> {
  const update: Record<string, any> = { updated_at: new Date().toISOString() };
  if (projectData.title !== undefined) update.title = projectData.title;
  if (projectData.description !== undefined) update.description = projectData.description;
  if (projectData.longDescription !== undefined) update.long_description = projectData.longDescription;
  if (projectData.image !== undefined) update.image = projectData.image;
  if (projectData.images !== undefined) update.images = projectData.images;
  if (projectData.companyName !== undefined) update.company_name = projectData.companyName;
  if (projectData.category !== undefined) update.category = projectData.category;
  if (projectData.tech !== undefined) update.tech = projectData.tech;
  if (projectData.year !== undefined) update.year = projectData.year.toString();
  if (projectData.figmaLink !== undefined) update.figma_link = projectData.figmaLink;
  if (projectData.githubLink !== undefined) update.github_link = projectData.githubLink;

  const { data, error } = await supabaseAdmin
    .from('projects')
    .update(update)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Erreur updateProject(${id}):`, error, update);
    return null;
  }
  return mapProject(data);
}

export async function deleteProject(id: string): Promise<boolean> {
  const { error } = await supabaseAdmin.from('projects').delete().eq('id', id);
  return !error;
}

// ── DISTINCTIONS ─────────────────────────────────────────────────────────────

export async function getAwards(): Promise<Award[]> {
  const { data, error } = await supabaseAdmin
    .from('awards')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Erreur getAwards:', error);
    throw new Error(error.message);
  }
  return (data || []).map(row => mapAward(row)).filter(Boolean) as Award[];
}

export async function getAward(id: string): Promise<Award | null> {
  const { data, error } = await supabaseAdmin
    .from('awards')
    .select('*')
    .eq('id', id)
    .single();
  if (error) return null;
  return mapAward(data);
}

export async function createAward(
  awardData: Omit<Award, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Award> {
  const payload = {
    title: awardData.title,
    event: awardData.event,
    description: awardData.description,
    date: awardData.date,
    location: awardData.location,
    image: awardData.image || '/images/awards/placeholder-trophy.svg',
    certificate: awardData.certificate || '/images/certificates/placeholder-certificate.svg',
    icon: awardData.icon || 'ri-award-line',
    gradient: awardData.gradient || 'from-blue-400 to-purple-400',
    border_color: awardData.borderColor || 'border-blue-200',
    bg_color: awardData.bgColor || 'bg-blue-50',
  };

  const { data, error } = await supabaseAdmin
    .from('awards')
    .insert(payload)
    .select()
    .single();

  if (error) {
    console.error('Erreur createAward:', error, payload);
    throw new Error(error.message);
  }
  const result = mapAward(data);
  if (!result) throw new Error('Erreur de mapping après création award');
  return result;
}

export async function updateAward(
  id: string,
  awardData: Partial<Omit<Award, 'id' | 'createdAt'>>
): Promise<Award | null> {
  const update: Record<string, any> = { updated_at: new Date().toISOString() };
  if (awardData.title !== undefined) update.title = awardData.title;
  if (awardData.event !== undefined) update.event = awardData.event;
  if (awardData.description !== undefined) update.description = awardData.description;
  if (awardData.date !== undefined) update.date = awardData.date;
  if (awardData.location !== undefined) update.location = awardData.location;
  if (awardData.image !== undefined) update.image = awardData.image;
  if (awardData.certificate !== undefined) update.certificate = awardData.certificate;
  if (awardData.icon !== undefined) update.icon = awardData.icon;
  if (awardData.gradient !== undefined) update.gradient = awardData.gradient;
  if (awardData.borderColor !== undefined) update.border_color = awardData.borderColor;
  if (awardData.bgColor !== undefined) update.bg_color = awardData.bgColor;

  const { data, error } = await supabaseAdmin
    .from('awards')
    .update(update)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Erreur updateAward(${id}):`, error, update);
    return null;
  }
  return mapAward(data);
}

export async function deleteAward(id: string): Promise<boolean> {
  const { error } = await supabaseAdmin.from('awards').delete().eq('id', id);
  return !error;
}

// ── STATISTIQUES ─────────────────────────────────────────────────────────────

export async function getStats() {
  const [projects, awards] = await Promise.all([getProjects(), getAwards()]);

  return {
    totalProjects: projects.length,
    totalAwards: awards.length,
    lastUpdated: new Date().toISOString(),
    projectsByCategory: projects.reduce((acc, project) => {
      project.category.forEach(cat => {
        acc[cat] = (acc[cat] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>),
    projectsByYear: projects.reduce((acc, project) => {
      acc[project.year] = (acc[project.year] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
  };
}
