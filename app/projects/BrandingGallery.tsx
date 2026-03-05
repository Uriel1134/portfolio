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

const extractCompanyName = (project: Project): string => {
  if (project.companyName && project.companyName.trim()) {
    return project.companyName.trim();
  }
  const title = project.title;
  const patterns = [
    /^(?:Logo|Affiche|Bannière|Flyer|Carte de visite|Identité visuelle)\s+(.+)$/i,
    /^(.+?)\s*-\s*(?:Logo|Affiche|Bannière|Flyer|Carte de visite|Identité visuelle)/i,
    /^(?:Logo|Affiche|Bannière|Flyer|Carte de visite|Identité visuelle)\s+pour\s+(.+)$/i,
    /^(.+?)\s*\([^)]*\)$/,
  ];
  for (const pattern of patterns) {
    const match = title.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  const words = title.split(' ');
  if (words.length >= 2) {
    return words.slice(0, 2).join(' ');
  }
  return words[0] || 'Divers';
};

export default function BrandingGallery({ projects }: BrandingGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
      <div className="text-center py-24">
        <i className="ri-building-line text-6xl text-zinc-800 mb-6"></i>
        <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">Aucun projet de branding</p>
      </div>
    );
  }

  return (
    <>
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="h-px w-8 bg-[#C9A84C]"></div>
          <h3 className="text-xl font-bold text-[#C9A84C] uppercase tracking-widest">
            Projets de Branding
          </h3>
          <div className="h-px w-8 bg-[#C9A84C]"></div>
        </div>
        <p className="text-sm text-gray-500">
          {projects.length} projet{projects.length > 1 ? 's' : ''} pour {companyGroups.length} entreprise{companyGroups.length > 1 ? 's' : ''}
        </p>
      </div>

      <div className="space-y-20">
        {companyGroups.map((group, groupIndex) => (
          <div key={group.company} className="bg-zinc-900 border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/20 rounded-xl">
                  <i className="ri-building-line text-2xl"></i>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white uppercase tracking-tight">{group.company}</h4>
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">
                    {group.totalProjects} création{group.totalProjects > 1 ? 's' : ''} réalisée{group.totalProjects > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <div className="text-[10px] font-black text-[#C9A84C] bg-[#C9A84C]/5 border border-[#C9A84C]/20 px-3 py-1 rounded-full">
                #{groupIndex + 1}
              </div>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {group.projects.map((project) => {
                const allImages = project.images && project.images.length > 0
                  ? project.images
                  : project.image ? [project.image] : [];

                return allImages.map((imageUrl, imageIndex) => (
                  <div
                    key={`${project.id}-${imageIndex}`}
                    className="group break-inside-avoid cursor-pointer mb-6"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="relative bg-black rounded-xl overflow-hidden border border-white/5 hover:border-[#C9A84C]/40 transition-all duration-500">
                      <img
                        src={imageUrl}
                        alt={`${project.title} - Image ${imageIndex + 1}`}
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 w-full">
                          <h5 className="text-white font-bold text-[10px] mb-2 uppercase tracking-wide">
                            {project.title}
                          </h5>
                          <span className="text-[#C9A84C] text-[9px] font-bold uppercase tracking-widest border border-[#C9A84C]/30 px-2 py-0.5 rounded">
                            {project.year}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ));
              }).flat()}
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center p-4 z-50 backdrop-blur-md" onClick={() => setSelectedProject(null)}>
          <div className="relative max-w-7xl max-h-[95vh] w-full" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute -top-16 right-0 w-12 h-12 flex items-center justify-center bg-zinc-800 text-white rounded-full border border-white/10 hover:border-[#C9A84C] transition-all"
              title="Fermer"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>

            <div className="relative bg-zinc-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-auto max-h-[80vh] object-contain mx-auto"
              />
              <div className="bg-zinc-800/80 backdrop-blur-xl border-t border-white/10 p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">{selectedProject.title}</h2>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-3 py-1 bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest rounded">
                        {selectedProject.year}
                      </span>
                      {selectedProject.tech.map((tech, index) => (
                        <span key={index} className="px-3 py-1 bg-white/5 border border-white/10 text-gray-400 text-[10px] font-bold uppercase tracking-widest rounded">
                          {tech}
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
