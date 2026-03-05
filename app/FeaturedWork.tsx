'use client';
import { useState } from 'react';
import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';

interface Project {
  title: string;
  description: string;
  longDescription: string;
  image: string;
  category: string[];
  tech: string[];
  year: string;
  figmaLink?: string;
  githubLink?: string;
}

const projects: Project[] = [
  {
    title: "PTCCARE Mobile",
    description: "Application mobile de collecte et de synchronisation des données de santé de la femme enceinte et des enfants de moins de cinq ans.",
    longDescription: "PTCCARE Mobile est une application de santé destinée à faciliter la collecte et la synchronisation des données médicales des femmes enceintes et des enfants de moins de cinq ans. Elle est conçue avec une interface intuitive centrée sur l’agent de santé. L’objectif est d’améliorer le suivi médical et la prise de décision en milieu rural.",
    image: "/images/projects/ptc-care.png",
    category: ["UI/UX Design", "Developpement Mobile"],
    tech: ["Figma", "Flutter", "SQLite"],
    year: "2025",
    figmaLink: "https://www.figma.com/design/jzuKJ4QW621XoTrUaKak2L/Untitled?node-id=0-1&t=b2e3jkVzikw7kkfr-1",
    githubLink: "https://github.com/Uriel1134/ptccare_mobile"
  },
  {
    title: "INSTI METEO",
    description: "Application mobile de suivi des parametres météologiques dans l'Institut National Supérieur de Technologie Industrielle de Lokossa avec un système IOT connecté.",
    longDescription: "INSTI METEO est une application mobile connectée à un système IoT permettant de suivre en temps réel les paramètres météorologiques sur à l’INSTI Lokossa. Elle collecte et affiche des données comme la température, l’humidité et la pression. Le projet vise à sensibiliser et appuyer la recherche locale sur le climat.",
    image: "/images/projects/insti-meteo.png",
    category: ["UI/UX Design", "Developpement Mobile"],
    tech: ["Figma", "Flutter", "Firebase"],
    year: "2025",
    figmaLink: "https://www.figma.com/design/ei17roWQZpZIgHpt7iwbjC/Untitled?node-id=240-139&t=yMXDYzrbkpW3Hkh6-1",
    githubLink: "https://github.com/Uriel1134/INSTI-METEO"
  },
  {
    title: "Bèmi",
    description: "Application mobile qui aide à bien trier tous les types de déchets grâce à l’intelligence artificielle et au QR code.Et à chaque bon geste, tu gagnes des cadeaux, qu’on appelle les “kwètché”.",
    longDescription: "BèmiApp est une application mobile intelligente qui facilite le tri des déchets grâce à la reconnaissance via QR code et à l’intelligence artificielle. Chaque tri correct permet de gagner des récompenses appelées “kwètché”, encourageant ainsi les bons gestes écologiques. L’application allie technologie et écoresponsabilité pour promouvoir un environnement plus propre.",
    image: "/images/projects/Bemi.png",
    category: ["UI/UX Design", "Developpement Mobile"],
    tech: ["Figma", "Flutter", "Laravel", "MySql"],
    year: "2025",
    figmaLink: "https://www.figma.com/design/l7BtDDTC8BzmQvajo2AODG/B%C3%A8mi_APP?node-id=3-191&t=XuM9KKLqd1T7fvXj-1",
    githubLink: "https://github.com/Uriel1134/B-mi_app"
  },
  {
    title: "YÓVÒ GBÈ",
    description: "Application Mobile d'apprentissage linguistique du français à partir du fongbe immersive intégrant des éléments culturels africains avec une approche pédagogique moderne.",
    longDescription: "YÓVÒ GBÈ est une application mobile d’apprentissage du français destinée aux artisans, commerçants et autres personnes parlant le fon. Elle utilise une approche intuitive basée sur l’écoute audio (voix off) et des illustrations visuelles. L’objectif est de faciliter l’inclusion linguistique par un apprentissage pratique et accessible",
    image: "/images/projects/YOVO_GBE.jpg",
    category: ["UI/UX Design", "Développement Web"],
    tech: ["Figma", "Reacte Native", "MySql"],
    year: "2025",
    figmaLink: "https://www.figma.com/design/QOouqiypG7gpfDRCfxk3Nv/YOVO-GBE?node-id=0-1&t=mRGoF5WArPekvPTH-1",
    githubLink: "https://github.com/Uriel1134/yovogbe"
  }
];

export default function FeaturedWork() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="py-24 bg-black">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="mb-16 text-center">
          <SectionTitle
            title="Mes Projets"
            ghostText="PROJETS"
            align="center"
          />
          <p className="text-base text-gray-400 max-w-2xl mx-auto -mt-8">
            Découvrez quelques-uns de mes projets récents qui illustrent ma passion pour le design et le développement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-zinc-900 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-[#C9A84C]/10 transition-all duration-500 group cursor-pointer transform hover:-translate-y-1 border border-white/10 hover:border-[#C9A84C]/30"
            >
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Boutons Figma et GitHub en overlay */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  {project.figmaLink && (
                    <a
                      href={project.figmaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl group/btn"
                      title="Voir sur Figma"
                    >
                      <svg className="w-5 h-5 text-gray-700 group-hover/btn:text-[#C9A84C] transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.015-4.49-4.491S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148z" />
                      </svg>
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl group/btn"
                      title="Voir sur GitHub"
                    >
                      <svg className="w-5 h-5 text-gray-700 group-hover/btn:text-[#C9A84C] transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              <div className="p-6" onClick={() => setSelectedProject(project)}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex flex-wrap gap-2">
                    {project.category.map((category, index) => (
                      <span
                        key={index}
                        className="text-xs font-medium text-[#C9A84C] bg-[#C9A84C]/10 px-3 py-1 rounded-full border border-[#C9A84C]/20"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 font-medium">{project.year}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#C9A84C] transition-colors duration-300">{project.title}</h3>
                <p className="text-gray-400 mb-4 leading-relaxed text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="text-xs bg-white/5 text-gray-400 px-3 py-1.5 rounded-lg border border-white/10">
                      {tech}
                    </span>
                  ))}
                </div>
                <button type="button" className="text-[#C9A84C] font-medium inline-flex items-center whitespace-nowrap text-sm">
                  Voir les détails
                  <i className="ri-arrow-right-line ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bouton Voir tous les projets */}
        <div className="text-center mt-16">
          <Link
            href="/projects"
            className="group inline-flex items-center justify-center px-7 py-3.5 bg-[#C9A84C] text-black font-semibold rounded-xl hover:bg-[#b8973d] transition-all duration-200 text-sm"
          >
            <span>Voir tous mes projets</span>
            <i className="ri-arrow-right-line ml-3 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true"></i>
          </Link>
        </div>

        {/* Modal amélioré */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in" onClick={() => setSelectedProject(null)}>
            <div className="bg-zinc-900 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/10" onClick={(e) => e.stopPropagation()}>
              <div className="relative">
                {/* Header avec gradient */}
                <div className="bg-zinc-900 p-6 border-b border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.category.map((cat, index) => (
                        <span key={index} className="text-xs font-medium text-[#C9A84C] bg-[#C9A84C]/10 px-4 py-2 rounded-full border border-[#C9A84C]/20">
                          {cat}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      {/* Boutons Figma et GitHub dans le modal */}
                      {selectedProject.figmaLink && (
                        <a
                          href={selectedProject.figmaLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-200 group"
                          title="Voir sur Figma"
                        >
                          <svg className="w-5 h-5 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.015-4.49-4.491S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148z" />
                          </svg>
                        </a>
                      )}
                      {selectedProject.githubLink && (
                        <a
                          href={selectedProject.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-200 group"
                          title="Voir sur GitHub"
                        >
                          <svg className="w-5 h-5 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => setSelectedProject(null)}
                        className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-red-500/20 rounded-full transition-all duration-200"
                        title="Fermer"
                        aria-label="Fermer le modal"
                      >
                        <i className="ri-close-line text-lg text-gray-300 hover:text-white transition-colors duration-200"></i>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500 font-medium bg-white/10 px-3 py-1 rounded-full">{selectedProject.year}</span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
                </div>

                {/* Contenu */}
                <div className="p-6 bg-zinc-900">
                  <p className="text-sm text-gray-400 mb-8 leading-relaxed">{selectedProject.longDescription}</p>

                  <div className="aspect-video overflow-hidden rounded-2xl mb-8 shadow-lg">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-[#C9A84C] uppercase tracking-widest mb-3">Technologies utilisées</h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.tech.map((tech, techIndex) => (
                        <span key={techIndex} className="bg-white/5 text-gray-300 px-4 py-2 rounded-xl text-sm font-medium border border-white/10">
                          {tech}
                        </span>
                      ))}
                    </div>
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



