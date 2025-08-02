'use client';
import { useState } from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string[];
  tech: string[];
  year: string;
}

interface GraphicGalleryProps {
  projects: Project[];
}

export default function GraphicGallery({ projects }: GraphicGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (projects.length === 0) {
    return (
      <div className="py-12 text-center">
        <i className="mb-4 text-6xl text-gray-300 ri-image-line"></i>
        <p className="text-gray-500">Aucune création graphique pour le moment</p>
      </div>
    );
  }

  return (
    <>
      {/* Galerie en masonry */}
      <div className="gap-6 space-y-6 columns-1 md:columns-2 lg:columns-3 xl:columns-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="cursor-pointer group break-inside-avoid"
            onClick={() => setSelectedProject(project)}
          >
            <div className="relative overflow-hidden transition-all duration-300 transform bg-white shadow-sm rounded-xl hover:shadow-xl hover:-translate-y-1">
              {/* Image en taille réelle */}
              {project.image ? (
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-auto transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay avec titre */}
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/70 via-transparent to-transparent group-hover:opacity-100">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="mb-1 text-lg font-bold text-white drop-shadow-lg">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 text-sm rounded-full text-white/90 bg-white/20 backdrop-blur-sm">
                          {project.year}
                        </span>
                        {project.tech.slice(0, 2).map((tech, index) => (
                          <span key={index} className="px-2 py-1 text-xs rounded-full text-white/90 bg-white/20 backdrop-blur-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center aspect-square bg-gradient-to-br from-gray-100 to-gray-200">
                  <i className="text-4xl text-gray-400 ri-image-line"></i>
                </div>
              )}
              
              {/* Titre fixe en bas */}
              <div className="p-4 bg-white">
                <h3 className="font-bold text-center text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
                  {project.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de vue détaillée */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90" onClick={() => setSelectedProject(null)}>
          <div className="relative max-w-7xl max-h-[95vh] w-full" onClick={(e) => e.stopPropagation()}>
            {/* Bouton fermer */}
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute z-10 flex items-center justify-center w-12 h-12 text-white transition-colors rounded-full top-4 right-4 bg-black/50 hover:bg-black/70 backdrop-blur-sm"
              title="Fermer"
            >
              <i className="text-2xl ri-close-line"></i>
            </button>

            {/* Image en pleine taille */}
            <div className="relative overflow-hidden bg-white shadow-2xl rounded-2xl">
              {selectedProject.image && (
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-auto max-h-[85vh] object-contain"
                />
              )}
              
              {/* Informations en overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="text-white">
                  <h2 className="mb-2 text-3xl font-bold drop-shadow-lg">{selectedProject.title}</h2>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/20 backdrop-blur-sm">
                      {selectedProject.year}
                    </span>
                    <div className="flex items-center gap-2">
                      {selectedProject.tech.map((tech, index) => (
                        <span key={index} className="px-3 py-1 text-sm rounded-full bg-white/20 backdrop-blur-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedProject.category.map((cat, index) => (
                      <span key={index} className="px-3 py-1 text-sm font-medium rounded-full bg-blue-500/80 backdrop-blur-sm">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation entre images */}
            <div className="absolute -translate-y-1/2 top-1/2 left-4">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
                  const prevIndex = currentIndex > 0 ? currentIndex - 1 : projects.length - 1;
                  setSelectedProject(projects[prevIndex]);
                }}
                className="flex items-center justify-center w-12 h-12 text-white transition-colors rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm"
                title="Image précédente"
              >
                <i className="text-xl ri-arrow-left-line"></i>
              </button>
            </div>
            
            <div className="absolute -translate-y-1/2 top-1/2 right-4">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
                  const nextIndex = currentIndex < projects.length - 1 ? currentIndex + 1 : 0;
                  setSelectedProject(projects[nextIndex]);
                }}
                className="flex items-center justify-center w-12 h-12 text-white transition-colors rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm"
                title="Image suivante"
              >
                <i className="text-xl ri-arrow-right-line"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
