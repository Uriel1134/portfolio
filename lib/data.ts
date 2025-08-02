import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Project, Award, AdminData } from '../types/admin';

const DATA_FILE = path.join(process.cwd(), 'data', 'portfolio.json');

// Fonction pour lire les données
export async function readData(): Promise<AdminData> {
  try {
    const fileContent = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Erreur lors de la lecture des données:', error);
    // Retourner des données par défaut si le fichier n'existe pas
    return {
      projects: [],
      awards: [],
      lastUpdated: new Date().toISOString()
    };
  }
}

// Fonction pour écrire les données
export async function writeData(data: AdminData): Promise<void> {
  try {
    data.lastUpdated = new Date().toISOString();
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Erreur lors de l\'écriture des données:', error);
    throw new Error('Impossible de sauvegarder les données');
  }
}

// CRUD pour les projets
export async function getProjects(): Promise<Project[]> {
  const data = await readData();
  return data.projects;
}

export async function getProject(id: string): Promise<Project | null> {
  const data = await readData();
  return data.projects.find(project => project.id === id) || null;
}

export async function createProject(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
  const data = await readData();
  const newProject: Project = {
    ...projectData,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  data.projects.push(newProject);
  await writeData(data);
  return newProject;
}

export async function updateProject(id: string, projectData: Partial<Omit<Project, 'id' | 'createdAt'>>): Promise<Project | null> {
  const data = await readData();
  const projectIndex = data.projects.findIndex(project => project.id === id);
  
  if (projectIndex === -1) {
    return null;
  }
  
  data.projects[projectIndex] = {
    ...data.projects[projectIndex],
    ...projectData,
    updatedAt: new Date().toISOString()
  };
  
  await writeData(data);
  return data.projects[projectIndex];
}

export async function deleteProject(id: string): Promise<boolean> {
  const data = await readData();
  const projectIndex = data.projects.findIndex(project => project.id === id);
  
  if (projectIndex === -1) {
    return false;
  }
  
  data.projects.splice(projectIndex, 1);
  await writeData(data);
  return true;
}

// CRUD pour les distinctions
export async function getAwards(): Promise<Award[]> {
  const data = await readData();
  return data.awards;
}

export async function getAward(id: string): Promise<Award | null> {
  const data = await readData();
  return data.awards.find(award => award.id === id) || null;
}

export async function createAward(awardData: Omit<Award, 'id' | 'createdAt' | 'updatedAt'>): Promise<Award> {
  const data = await readData();
  const newAward: Award = {
    ...awardData,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  data.awards.push(newAward);
  await writeData(data);
  return newAward;
}

export async function updateAward(id: string, awardData: Partial<Omit<Award, 'id' | 'createdAt'>>): Promise<Award | null> {
  const data = await readData();
  const awardIndex = data.awards.findIndex(award => award.id === id);
  
  if (awardIndex === -1) {
    return null;
  }
  
  data.awards[awardIndex] = {
    ...data.awards[awardIndex],
    ...awardData,
    updatedAt: new Date().toISOString()
  };
  
  await writeData(data);
  return data.awards[awardIndex];
}

export async function deleteAward(id: string): Promise<boolean> {
  const data = await readData();
  const awardIndex = data.awards.findIndex(award => award.id === id);
  
  if (awardIndex === -1) {
    return false;
  }
  
  data.awards.splice(awardIndex, 1);
  await writeData(data);
  return true;
}

// Fonction pour obtenir les statistiques
export async function getStats() {
  const data = await readData();
  return {
    totalProjects: data.projects.length,
    totalAwards: data.awards.length,
    lastUpdated: data.lastUpdated,
    projectsByCategory: data.projects.reduce((acc, project) => {
      project.category.forEach(cat => {
        acc[cat] = (acc[cat] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>),
    projectsByYear: data.projects.reduce((acc, project) => {
      acc[project.year] = (acc[project.year] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  };
}
