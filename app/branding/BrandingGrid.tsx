'use client';
import { useState, useEffect } from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  category: string[];
  tech: string[];
  year: string;
  figmaLink?: string;
  githubLink?: string;
  company?: string; // Nom de l'entreprise extrait du titre
}

interface CompanyGroup {
  company: string;
  projects: Project[];
  totalProjects: number;
}

export default function BrandingGrid() {
  const [brandingProjects, setBrandingProjects] = useState<Project[]>([]);
  const [companyGroups, setCompanyGroups] = useState<CompanyGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Charger les projets de branding depuis l'API
  useEffect(() => {
    const fetchBrandingProjects = async () => {
      try {
        const response = await fetch('/api/portfolio');
        if (response.ok) {
          const data = await response.json();
          const brandingOnly = data.projects.filter((project: Project) => 
            project.category.includes('Branding')
          );
          
          setBrandingProjects(brandingOnly);
          groupProjectsByCompany(brandingOnly);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des projets de branding:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrandingProjects();
  }, []);

  // Grouper les projets par entreprise
  const groupProjectsByCompany = (projects: Project[]) => {
    const groups: { [key: string]: Project[] } = {};
    
    projects.forEach(project => {
      // Extraire le nom de l'entreprise du titre (première partie avant " - " ou utiliser le titre complet)
      const company = project.title.split(' - ')[0] || project.title.split(' ')[0] || 'Divers';
      
      if (!groups[company]) {
        groups[company] = [];
      }
      groups[company].push(project);
    });

    const companyGroupsArray = Object.entries(groups).map(([company, projects]) => ({
      company,
      projects,
      totalProjects: projects.length
    })).sort((a, b) => b.totalProjects - a.totalProjects); // Trier par nombre de projets

    setCompanyGroups(companyGroupsArray);
  };

  if (loading) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 text-blue-600">
              <i className="ri-loader-4-line animate-spin text-2xl"></i>
              <span className="text-lg font-medium">Chargement des projets de branding...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (companyGroups.length === 0) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl p-12 shadow-sm border">
            <i className="ri-palette-line text-6xl text-gray-300 mb-6"></i>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Aucun projet de branding</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Les projets de branding apparaîtront ici une fois ajoutés depuis l'interface d'administration.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"></div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
              Projets par Entreprise
            </h2>
            <div className="h-1 w-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"></div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {brandingProjects.length} projet{brandingProjects.length > 1 ? 's' : ''} de branding pour {companyGroups.length} entreprise{companyGroups.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Grille des entreprises */}
        <div className="space-y-16">
          {companyGroups.map((group, groupIndex) => (
            <div key={group.company} className="bg-white rounded-2xl p-8 shadow-sm border">
              {/* En-tête de l'entreprise */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl">
                    <i className="ri-building-line text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{group.company}</h3>
                    <p className="text-gray-600">
                      {group.totalProjects} création{group.totalProjects > 1 ? 's' : ''} réalisée{group.totalProjects > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                  #{groupIndex + 1}
                </div>
              </div>

              {/* Galerie des projets de l'entreprise */}
              <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                {group.projects.map((project) => (
                  <div
                    key={project.id}
                    className="group break-inside-avoid cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      {/* Image en taille réelle */}
                      {project.image ? (
                        <div className="relative">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {/* Overlay avec titre */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-3">
                              <h4 className="text-white font-bold text-sm mb-1 drop-shadow-lg">
                                {project.title}
                              </h4>
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
                      ) : (
                        <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <i className="ri-image-line text-4xl text-gray-400"></i>
                        </div>
                      )}

                      {/* Titre fixe en bas */}
                      <div className="p-3 bg-white">
                        <h4 className="font-semibold text-gray-900 text-sm text-center group-hover:text-blue-600 transition-colors duration-300 line-clamp-1">
                          {project.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de détail du projet */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedProject(null)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{selectedProject.title}</h3>
                  <p className="text-gray-600">{selectedProject.year}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                  title="Fermer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              {selectedProject.image && (
                <div className="mb-6 rounded-xl overflow-hidden">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-auto"
                  />
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Description</h4>
                  <p className="text-gray-600 leading-relaxed">{selectedProject.longDescription}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Outils utilisés</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Catégories</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.category.map((cat, index) => (
                      <span key={index} className="px-3 py-1 bg-violet-50 text-violet-700 rounded-full text-sm font-medium">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
