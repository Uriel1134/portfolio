'use client';
import { useState, useEffect } from 'react';
import GraphicGallery from './GraphicGallery';
import BrandingGallery from './BrandingGallery';

interface Project {
  id: string; // Ajout de l'id pour les clés
  title: string;
  description: string;
  longDescription: string;
  image: string;
  category: string[];
  tech: string[];
  year: string;
  figmaLink?: string;
  githubLink?: string;
  createdAt?: string; // Ajout de createdAt pour le tri et badge
}

const categories = ["Tous", "UI/UX Design", "Développement Web", "Développement Mobile", "Création Graphique", "Branding"];

export default function ProjectsGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/portfolio');
        if (response.ok) {
          const data = await response.json();
          setProjectsData(data.projects);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des projets:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = selectedCategory === "Tous"
    ? projectsData
    : projectsData.filter(project => project.category.includes(selectedCategory));

  if (loading) {
    return (
      <div className="max-w-6xl px-6 py-24 mx-auto lg:px-8 bg-black">
        <div className="flex items-center justify-center h-64">
          <div className="w-10 h-10 border-2 border-[#C9A84C]/50 rounded-full border-t-[#C9A84C] animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-6xl px-6 mx-auto lg:px-8">
        {/* Filters Container */}
        <div className="mb-16">
          <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-2 md:gap-3 max-w-4xl mx-auto">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-3 md:px-6 md:py-2.5 rounded-xl md:rounded-full text-[10px] md:text-xs font-bold uppercase tracking-[0.12em] transition-all duration-300 border w-full md:w-auto ${selectedCategory === category
                  ? 'bg-[#C9A84C] text-black border-[#C9A84C] shadow-[0_0_20px_rgba(201,168,76,0.2)]'
                  : 'bg-zinc-900/30 text-gray-400 border-white/5 hover:border-[#C9A84C]/30 hover:text-white backdrop-blur-sm'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {selectedCategory === "Tous" ? (
          <div className="space-y-32">
            {/* Digital Projects Section */}
            {projectsData.filter(p => p.category.some(c => ["UI/UX Design", "Développement Web", "Développement Mobile"].includes(c))).length > 0 && (
              <div>
                <div className="flex items-center gap-4 mb-12">
                  <div className="h-px w-12 bg-[#C9A84C]"></div>
                  <h2 className="text-2xl font-black text-white uppercase tracking-tight">Projets Digitaux</h2>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {projectsData
                    .filter(p => p.category.some(c => ["UI/UX Design", "Développement Web", "Développement Mobile"].includes(c)))
                    .map((project, index) => (
                      <ProjectCard key={index} project={project} onOpenDetails={() => setSelectedProject(project)} />
                    ))}
                </div>
              </div>
            )}

            {/* Branding Section */}
            {projectsData.filter(p => p.category.includes("Branding")).length > 0 && (
              <div>
                <div className="flex items-center gap-4 mb-12">
                  <div className="h-px w-12 bg-[#C9A84C]"></div>
                  <h2 className="text-2xl font-black text-white uppercase tracking-tight">Identités Visuelles</h2>
                </div>
                <BrandingGallery projects={projectsData.filter(p => p.category.includes("Branding")).map(p => ({ ...p, id: p.id || p.title }))} hideHeader />
              </div>
            )}

            {/* Graphic Design Section */}
            {projectsData.filter(p => p.category.includes("Création Graphique")).length > 0 && (
              <div>
                <div className="flex items-center gap-4 mb-12">
                  <div className="h-px w-12 bg-[#C9A84C]"></div>
                  <h2 className="text-2xl font-black text-white uppercase tracking-tight">Design Graphique</h2>
                </div>
                <GraphicGallery projects={projectsData.filter(p => p.category.includes("Création Graphique")).map(p => ({ ...p, id: p.id || p.title }))} />
              </div>
            )}
          </div>
        ) : selectedCategory === "Création Graphique" ? (
          <GraphicGallery projects={filteredProjects.map(p => ({ ...p, id: p.id || p.title }))} />
        ) : selectedCategory === "Branding" ? (
          <BrandingGallery projects={filteredProjects.map(p => ({ ...p, id: p.id || p.title }))} />
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={index} project={project} onOpenDetails={() => setSelectedProject(project)} />
            ))}
          </div>
        )}

        {selectedProject && selectedProject.category.some(c => ["UI/UX Design", "Développement Web", "Développement Mobile"].includes(c)) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm transition-all" onClick={() => setSelectedProject(null)}>
            <div className="bg-zinc-900 border border-white/10 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-zinc-800 text-white rounded-full border border-white/10 hover:border-red-500/50 hover:text-red-500 transition-all z-20"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:p-12">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.category.map((cat, index) => (
                      <span key={index} className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#C9A84C] border border-[#C9A84C]/30 rounded-full">
                        {cat}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-500 block mb-2">{selectedProject.year}</span>
                  <h2 className="text-3xl lg:text-4xl font-black text-white mb-6 uppercase tracking-tight">{selectedProject.title}</h2>

                  <div className="space-y-6">
                    <p className="text-gray-400 leading-relaxed">{selectedProject.longDescription}</p>
                    <div className="pt-8 border-t border-white/5">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech.map((tech, techIndex) => (
                          <span key={techIndex} className="px-4 py-2 text-xs font-medium text-gray-300 bg-white/5 border border-white/5 rounded-xl">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-8">
                      {selectedProject.figmaLink && (
                        <a
                          href={selectedProject.figmaLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-6 py-3 bg-zinc-800 border border-white/10 text-white rounded-xl hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all text-xs font-bold uppercase tracking-widest"
                        >
                          <i className="ri-figma-line text-lg"></i>
                          Voir Prototype
                        </a>
                      )}
                      {selectedProject.githubLink && (
                        <a
                          href={selectedProject.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-6 py-3 bg-zinc-800 border border-white/10 text-white rounded-xl hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all text-xs font-bold uppercase tracking-widest"
                        >
                          <i className="ri-github-line text-lg"></i>
                          Voir Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-8 lg:p-12 lg:pl-0">
                  <div className="sticky top-0 h-full max-h-[600px] overflow-hidden rounded-2xl border border-white/5">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// Helper Component for Project Cards
function ProjectCard({ project, onOpenDetails }: { project: Project, onOpenDetails: () => void }) {
  return (
    <div
      className="overflow-hidden transition-all duration-500 bg-zinc-900 border border-white/10 cursor-pointer rounded-2xl hover:border-[#C9A84C]/40 group"
    >
      <div className="relative overflow-hidden aspect-video">
        <img
          src={project.image}
          alt={project.title}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
        />

        {/* Badge Nouveau */}
        {project.createdAt && (new Date().getTime() - new Date(project.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000) && (
          <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#C9A84C] text-black text-[10px] font-black uppercase tracking-widest rounded-lg shadow-xl animate-pulse">
            Nouveau
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center">
          <div
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails();
            }}
            className="px-6 py-3 bg-[#C9A84C] text-black text-xs font-bold uppercase tracking-widest rounded-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            Voir le Projet
          </div>
        </div>

        <div className="absolute flex gap-2 top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.figmaLink && (
            <a
              href={project.figmaLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-10 h-10 flex items-center justify-center bg-zinc-900/90 backdrop-blur-sm border border-white/10 text-white rounded-full hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all"
              title="Voir sur Figma"
            >
              <i className="ri-figma-line text-lg"></i>
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-10 h-10 flex items-center justify-center bg-zinc-900/90 backdrop-blur-sm border border-white/10 text-white rounded-full hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all"
              title="Voir sur GitHub"
            >
              <i className="ri-github-line text-lg"></i>
            </a>
          )}
        </div>
      </div>

      <div className="p-8" onClick={onOpenDetails}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-wrap gap-2">
            {project.category.map((category, index) => (
              <span
                key={index}
                className="px-3 py-1 text-[10px] font-bold uppercase tracking-tighter text-[#C9A84C] bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-lg"
              >
                {category}
              </span>
            ))}
          </div>
          <span className="text-xs font-medium text-gray-500">{project.year}</span>
        </div>
        <h3 className="mb-3 text-xl font-bold text-white group-hover:text-[#C9A84C] transition-colors duration-300">{project.title}</h3>
        <p className="mb-6 text-sm text-gray-400 leading-relaxed line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((tech, techIndex) => (
            <span key={techIndex} className="text-[10px] font-medium bg-white/5 text-gray-500 px-2.5 py-1 rounded border border-white/5">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex items-center text-xs font-bold uppercase tracking-widest text-[#C9A84C] group-hover:gap-2 transition-all">
          Détails du projet
          <i className="ri-arrow-right-line ml-1"></i>
        </div>
      </div>
    </div>
  );
}
