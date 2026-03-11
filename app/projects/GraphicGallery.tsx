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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/98 backdrop-blur-xl animate-fade-in" onClick={() => setSelectedProject(null)}>
          <div className="relative w-full h-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-zinc-800 text-white rounded-2xl border border-white/10 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all z-[110] group"
              title="Fermer"
            >
              <i className="ri-close-line text-2xl group-hover:rotate-90 transition-transform duration-300"></i>
            </button>

            {/* Header Info */}
            <div className="absolute top-0 left-0 right-0 p-8 flex flex-col md:flex-row md:items-center justify-between z-[105] bg-gradient-to-b from-black/80 to-transparent">
              <div className="max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-loose mb-2">
                  {selectedProject.title}
                </h2>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 text-[10px] font-bold text-[#D4AF37] bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded uppercase tracking-widest shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                    {selectedProject.year}
                  </span>
                  {selectedProject.category.map((cat, index) => (
                    <span key={index} className="px-3 py-1 text-[10px] font-bold text-white/90 bg-white/10 border border-white/20 rounded uppercase tracking-widest backdrop-blur-md">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Image Container */}
            <div className="relative flex items-center justify-center w-full h-full p-4 md:p-32 overflow-hidden">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="max-w-full max-h-full object-contain shadow-[0_0_100px_rgba(201,168,76,0.15)] animate-scale-in"
              />
            </div>

            {/* Navigation Controls */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : projects.length - 1;
                setSelectedProject(projects[prevIndex]);
              }}
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-black/50 hover:bg-[#C9A84C] text-white hover:text-black rounded-full border border-white/10 transition-all z-[110]"
              title="Précédent"
            >
              <i className="ri-arrow-left-s-line text-3xl"></i>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
                const nextIndex = currentIndex < projects.length - 1 ? currentIndex + 1 : 0;
                setSelectedProject(projects[nextIndex]);
              }}
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-black/50 hover:bg-[#C9A84C] text-white hover:text-black rounded-full border border-white/10 transition-all z-[110]"
              title="Suivant"
            >
              <i className="ri-arrow-right-s-line text-3xl"></i>
            </button>

            {/* Technologies Footer */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-3 z-[105]">
              {selectedProject.tech.map((t, i) => (
                <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 text-white/50 text-[9px] font-bold uppercase tracking-widest rounded-xl">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
