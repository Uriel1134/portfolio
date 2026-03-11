'use client';
import { useState, useCallback, useEffect } from 'react';

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

interface GalleryImage {
  url: string;
  projectTitle: string;
  projectId: string;
  year: string;
  tech: string[];
}

interface CompanyGroup {
  company: string;
  images: GalleryImage[];
  totalImages: number;
}

interface BrandingGalleryProps {
  projects: Project[];
  hideHeader?: boolean;
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

export default function BrandingGallery({ projects, hideHeader }: BrandingGalleryProps) {
  const [activeGroupIndex, setActiveGroupIndex] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  // Group projects and flatten images by company
  const groupImagesByCompany = useCallback((projects: Project[]): CompanyGroup[] => {
    const groups: { [key: string]: GalleryImage[] } = {};

    projects.forEach(project => {
      const company = extractCompanyName(project);
      if (!groups[company]) {
        groups[company] = [];
      }

      // Add main image
      if (project.image) {
        groups[company].push({
          url: project.image,
          projectTitle: project.title,
          projectId: project.id,
          year: project.year,
          tech: project.tech
        });
      }

      // Add auxiliary images
      if (project.images && project.images.length > 0) {
        project.images.forEach(imgUrl => {
          // Avoid duplicating main image
          if (imgUrl !== project.image) {
            groups[company].push({
              url: imgUrl,
              projectTitle: project.title,
              projectId: project.id,
              year: project.year,
              tech: project.tech
            });
          }
        });
      }
    });

    return Object.entries(groups).map(([company, images]) => ({
      company,
      images,
      totalImages: images.length
    })).sort((a, b) => b.totalImages - a.totalImages);
  }, []);

  const companyGroups = groupImagesByCompany(projects);

  const openLightbox = (groupIndex: number, imageIndex: number) => {
    setActiveGroupIndex(groupIndex);
    setActiveImageIndex(imageIndex);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setActiveGroupIndex(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = useCallback(() => {
    if (activeGroupIndex === null) return;
    const group = companyGroups[activeGroupIndex];
    setActiveImageIndex((prev) => (prev + 1) % group.images.length);
  }, [activeGroupIndex, companyGroups]);

  const prevImage = useCallback(() => {
    if (activeGroupIndex === null) return;
    const group = companyGroups[activeGroupIndex];
    setActiveImageIndex((prev) => (prev - 1 + group.images.length) % group.images.length);
  }, [activeGroupIndex, companyGroups]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeGroupIndex === null) return;
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeGroupIndex, nextImage, prevImage]);

  if (projects.length === 0) {
    return (
      <div className="text-center py-24">
        <i className="ri-building-line text-6xl text-zinc-800 mb-6"></i>
        <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">Aucun projet de branding</p>
      </div>
    );
  }

  const activeGroup = activeGroupIndex !== null ? companyGroups[activeGroupIndex] : null;
  const activeImage = activeGroup ? activeGroup.images[activeImageIndex] : null;

  const renderContent = () => {
    return (
      <div className="space-y-24">
        {companyGroups.map((group, groupIdx) => (
          <div key={group.company} className="relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 flex items-center justify-center bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/20 rounded-2xl">
                  <i className="ri-building-line text-3xl"></i>
                </div>
                <div>
                  <h4 className="text-2xl font-black text-white uppercase tracking-tight">{group.company}</h4>
                  <p className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
                    {group.totalImages} élément{group.totalImages > 1 ? 's' : ''} graphique{group.totalImages > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
              {group.images.map((img, imgIdx) => (
                <div
                  key={`${img.projectId}-${imgIdx}`}
                  className="group break-inside-avoid cursor-pointer"
                  onClick={() => openLightbox(groupIdx, imgIdx)}
                >
                  <div className="relative bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 hover:border-[#C9A84C]/40 transition-all duration-500 shadow-xl group/card">
                    <img
                      src={img.url}
                      alt={`${img.projectTitle}`}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-6 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-[#C9A84C] text-[9px] font-bold uppercase tracking-widest mb-1 italic">
                          {img.projectTitle}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-white font-bold text-xs uppercase tracking-tight">
                            Cliquez pour agrandir
                          </span>
                          <i className="ri-zoom-in-line text-[#C9A84C] text-xl"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {activeGroup && activeImage && (
          <div className="fixed inset-0 bg-black/98 flex items-center justify-center p-4 z-[100] backdrop-blur-xl animate-fade-in" onClick={closeLightbox}>
            <div className="relative w-full h-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>

              {/* Header / Info */}
              <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-10 bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-1 bg-[#C9A84C]"></div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight leading-none">
                      {activeGroup.company}
                    </h2>
                    <p className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest mt-1">
                      {activeImage.projectTitle} • {activeImage.year}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="hidden md:flex flex-col items-end">
                    <span className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Image</span>
                    <span className="text-white font-black text-xl leading-none">
                      {activeImageIndex + 1} <span className="text-white/20">/</span> {activeGroup.images.length}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={closeLightbox}
                    className="w-12 h-12 flex items-center justify-center bg-zinc-800 text-white rounded-2xl border border-white/10 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all group"
                  >
                    <i className="ri-close-line text-2xl group-hover:rotate-90 transition-transform duration-300"></i>
                  </button>
                </div>
              </div>

              {/* Main Image */}
              <div className="relative flex items-center justify-center w-full h-full p-4 md:p-32 overflow-hidden">
                <img
                  src={activeImage.url}
                  alt={activeImage.projectTitle}
                  className="max-w-full max-h-full object-contain shadow-[0_0_100px_rgba(201,168,76,0.15)] animate-scale-in"
                />
              </div>

              {/* Navigation Controls */}
              <button
                onClick={prevImage}
                className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-black/50 hover:bg-[#C9A84C] text-white hover:text-black rounded-full border border-white/10 transition-all z-20"
                title="Précédent"
              >
                <i className="ri-arrow-left-s-line text-3xl"></i>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-black/50 hover:bg-[#C9A84C] text-white hover:text-black rounded-full border border-white/10 transition-all z-20"
                title="Suivant"
              >
                <i className="ri-arrow-right-s-line text-3xl"></i>
              </button>

              {/* Technologies Footer */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-3 z-[105]">
                {activeImage.tech.map((t, i) => (
                  <span key={i} className="px-4 py-2 bg-white/10 border border-white/20 text-white/90 text-[9px] font-bold uppercase tracking-widest rounded-xl backdrop-blur-md shadow-xl">
                    {t}
                  </span>
                ))}
              </div>

              {/* Mobile Index */}
              <div className="absolute bottom-6 md:hidden text-white/60 text-xs font-bold tracking-[0.3em] uppercase">
                {activeImageIndex + 1} / {activeGroup.images.length}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (!hideHeader) {
    return (
      <>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#C9A84C]"></div>
            <h3 className="text-xl font-bold text-[#C9A84C] uppercase tracking-widest">
              Identités Visuelles
            </h3>
            <div className="h-px w-8 bg-[#C9A84C]"></div>
          </div>
          <p className="text-sm text-gray-500">
            Découvrez nos créations groupées par entreprise pour une vision globale de chaque marque.
          </p>
        </div>
        {renderContent()}
      </>
    );
  }

  return renderContent();
}
