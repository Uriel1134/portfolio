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
      <div className="py-24 text-center">
        <i className="ri-image-line text-6xl text-zinc-800 mb-6 font-thin"></i>
        <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">Aucune création graphique</p>
      </div>
    );
  }

  return (
    <>
      <div className="gap-6 space-y-6 columns-1 md:columns-2 lg:columns-3 xl:columns-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="cursor-pointer group break-inside-avoid mb-6"
            onClick={() => setSelectedProject(project)}
          >
            <div className="relative overflow-hidden transition-all duration-500 bg-zinc-900 border border-white/5 rounded-2xl hover:border-[#C9A84C]/40 group">
              {project.image ? (
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-auto transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-black/60 group-hover:opacity-100 flex items-center justify-center">
                    <div className="p-4 text-center">
                      <h3 className="mb-2 text-xs font-bold text-white uppercase tracking-widest">
                        {project.title}
                      </h3>
                      <span className="px-2 py-1 text-[9px] font-bold text-[#C9A84C] border border-[#C9A84C]/30 rounded uppercase tracking-widest">
                        {project.year}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center aspect-square bg-zinc-800">
                  <i className="text-4xl text-zinc-700 ri-image-line"></i>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md" onClick={() => setSelectedProject(null)}>
          <div className="relative max-w-7xl max-h-[95vh] w-full" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute -top-16 right-0 w-12 h-12 flex items-center justify-center bg-zinc-800 text-white rounded-full border border-white/10 hover:border-[#C9A84C] transition-all"
              title="Fermer"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>

            <div className="relative overflow-hidden bg-zinc-900 shadow-2xl rounded-3xl border border-white/10">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-auto max-h-[85vh] object-contain mx-auto"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-zinc-800/80 backdrop-blur-xl border-t border-white/10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">{selectedProject.title}</h2>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 text-[10px] font-bold text-[#C9A84C] bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded uppercase tracking-widest">
                        {selectedProject.year}
                      </span>
                      {selectedProject.category.map((cat, index) => (
                        <span key={index} className="px-3 py-1 text-[10px] font-bold text-gray-400 bg-white/5 border border-white/10 rounded uppercase tracking-widest">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
                        const prevIndex = currentIndex > 0 ? currentIndex - 1 : projects.length - 1;
                        setSelectedProject(projects[prevIndex]);
                      }}
                      className="w-12 h-12 flex items-center justify-center bg-zinc-700/50 hover:bg-zinc-700 text-white rounded-xl border border-white/5"
                    >
                      <i className="ri-arrow-left-line text-xl"></i>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
                        const nextIndex = currentIndex < projects.length - 1 ? currentIndex + 1 : 0;
                        setSelectedProject(projects[nextIndex]);
                      }}
                      className="w-12 h-12 flex items-center justify-center bg-zinc-700/50 hover:bg-zinc-700 text-white rounded-xl border border-white/5"
                    >
                      <i className="ri-arrow-right-line text-xl"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
