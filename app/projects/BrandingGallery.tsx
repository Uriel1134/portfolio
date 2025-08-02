'use client';
import { useState } from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  images?: string[];
  companyName?: string;
  category: string[];
  tech: string[];
  year: string;
}

interface CompanyGroup {
  company: string;
  projects: Project[];
  totalProjects: number;
}

interface BrandingGalleryProps {
  projects: Project[];
}

// Fonction pour extraire le nom de l'entreprise
const extractCompanyName = (project: Project): string => {
  // Utiliser le champ companyName en priorité
  if (project.companyName && project.companyName.trim()) {
    return project.companyName.trim();
  }

  // Sinon, extraire du titre (pour compatibilité avec anciens projets)
  const title = project.title;
  const patterns = [
    // "Logo Correction Juste" -> "Correction Juste"
    /^(?:Logo|Affiche|Bannière|Flyer|Carte de visite|Identité visuelle)\s+(.+)$/i,
    // "Correction Juste - Logo" -> "Correction Juste"
    /^(.+?)\s*-\s*(?:Logo|Affiche|Bannière|Flyer|Carte de visite|Identité visuelle)/i,
    // "Logo pour Correction Juste" -> "Correction Juste"
    /^(?:Logo|Affiche|Bannière|Flyer|Carte de visite|Identité visuelle)\s+pour\s+(.+)$/i,
    // "Correction Juste (Logo)" -> "Correction Juste"
    /^(.+?)\s*\([^)]*\)$/,
  ];

  for (const pattern of patterns) {
    const match = title.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }

  // Si aucun pattern ne correspond, utiliser le premier mot ou les deux premiers mots
  const words = title.split(' ');
  if (words.length >= 2) {
    return words.slice(0, 2).join(' ');
  }

  return words[0] || 'Divers';
};

export default function BrandingGallery({ projects }: BrandingGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Grouper les projets par entreprise
  const groupProjectsByCompany = (projects: Project[]): CompanyGroup[] => {
    const groups: { [key: string]: Project[] } = {};
    
    projects.forEach(project => {
      const company = extractCompanyName(project);

      if (!groups[company]) {
        groups[company] = [];
      }
      groups[company].push(project);
    });

    return Object.entries(groups).map(([company, projects]) => ({
      company,
      projects,
      totalProjects: projects.length
    })).sort((a, b) => b.totalProjects - a.totalProjects);
  };

  const companyGroups = groupProjectsByCompany(projects);

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <i className="ri-building-line text-6xl text-gray-300 mb-4"></i>
        <p className="text-gray-500">Aucun projet de branding pour le moment</p>
      </div>
    );
  }

  return (
    <>
      {/* Titre de section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="h-1 w-8 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"></div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Projets de Branding par Entreprise
          </h3>
          <div className="h-1 w-8 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"></div>
        </div>
        <p className="text-gray-600">
          {projects.length} projet{projects.length > 1 ? 's' : ''} pour {companyGroups.length} entreprise{companyGroups.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Groupes d'entreprises */}
      <div className="space-y-16">
        {companyGroups.map((group, groupIndex) => (
          <div key={group.company} className="bg-white rounded-2xl p-6 shadow-sm border">
            {/* En-tête de l'entreprise */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg">
                  <i className="ri-building-line text-lg"></i>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{group.company}</h4>
                  <p className="text-gray-600 text-sm">
                    {group.totalProjects} création{group.totalProjects > 1 ? 's' : ''} réalisée{group.totalProjects > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                #{groupIndex + 1}
              </div>
            </div>

            {/* Galerie des projets de l'entreprise */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
              {group.projects.map((project) => {
                // Utiliser toutes les images du projet (images multiples + image principale)
                const allImages = project.images && project.images.length > 0
                  ? project.images
                  : project.image ? [project.image] : [];

                return allImages.map((imageUrl, imageIndex) => (
                  <div
                    key={`${project.id}-${imageIndex}`}
                    className="group break-inside-avoid cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="relative bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      {/* Image en taille réelle */}
                      <div className="relative">
                        <img
                          src={imageUrl}
                          alt={`${project.title} - Image ${imageIndex + 1}`}
                          className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Overlay avec titre */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-3">
                            <h5 className="text-white font-bold text-sm mb-1 drop-shadow-lg">
                              {project.title}
                              {allImages.length > 1 && (
                                <span className="text-white/80 text-xs ml-2">
                                  ({imageIndex + 1}/{allImages.length})
                                </span>
                              )}
                            </h5>
                            <div className="flex items-center gap-2">
                              <span className="text-white/90 text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                                {project.year}
                              </span>
                              {project.tech.slice(0, 1).map((tech, index) => (
                                <span key={index} className="text-white/90 text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Titre fixe en bas */}
                      <div className="p-3 bg-white">
                        <h5 className="font-semibold text-gray-900 text-sm text-center group-hover:text-blue-600 transition-colors duration-300 line-clamp-1">
                          {project.title}
                          {allImages.length > 1 && (
                            <span className="text-gray-500 text-xs ml-1">
                              ({imageIndex + 1}/{allImages.length})
                            </span>
                          )}
                        </h5>
                      </div>
                    </div>
                  </div>
                ));
              }).flat()}
            </div>
          </div>
        ))}
      </div>

      {/* Modal de vue détaillée */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50" onClick={() => setSelectedProject(null)}>
          <div className="relative max-w-7xl max-h-[95vh] w-full" onClick={(e) => e.stopPropagation()}>
            {/* Bouton fermer */}
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 w-12 h-12 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-sm"
              title="Fermer"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>

            {/* Image en pleine taille */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
              {selectedProject.image && (
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-auto max-h-[85vh] object-contain"
                />
              )}
              
              {/* Informations en overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="text-white">
                  <h2 className="text-3xl font-bold mb-2 drop-shadow-lg">{selectedProject.title}</h2>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                      {selectedProject.year}
                    </span>
                    <div className="flex items-center gap-2">
                      {selectedProject.tech.map((tech, index) => (
                        <span key={index} className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedProject.category.map((cat, index) => (
                      <span key={index} className="bg-blue-500/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation entre images */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
                  const prevIndex = currentIndex > 0 ? currentIndex - 1 : projects.length - 1;
                  setSelectedProject(projects[prevIndex]);
                }}
                className="w-12 h-12 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-sm"
                title="Image précédente"
              >
                <i className="ri-arrow-left-line text-xl"></i>
              </button>
            </div>
            
            <div className="absolute top-1/2 -translate-y-1/2 right-4">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
                  const nextIndex = currentIndex < projects.length - 1 ? currentIndex + 1 : 0;
                  setSelectedProject(projects[nextIndex]);
                }}
                className="w-12 h-12 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-sm"
                title="Image suivante"
              >
                <i className="ri-arrow-right-line text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
