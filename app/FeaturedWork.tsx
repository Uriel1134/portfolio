'use client';
import { useState } from 'react';
import Link from 'next/link';

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
    tech: ["Figma", "Flutter" , "SQLite"],
    year: "2025",
    figmaLink: "https://figma.com/ptccare-mobile",
    githubLink: "https://github.com/auriol-lissan/ptccare-mobile"
  },
  {
    title: "INSTI METEO",
    description: "Application mobile de suivi des parametres météologiques dans l'Institut National Supérieur de Technologie Industrielle de Lokossa avec un système IOT connecté.",
    longDescription: "INSTI METEO est une application mobile connectée à un système IoT permettant de suivre en temps réel les paramètres météorologiques sur à l’INSTI Lokossa. Elle collecte et affiche des données comme la température, l’humidité et la pression. Le projet vise à sensibiliser et appuyer la recherche locale sur le climat.",
    image: "/images/projects/insti-meteo.png",
    category: ["UI/UX Design", "Developpement Mobile"],
    tech: ["Figma", "Flutter" , "Firebase"],
    year: "2025",
    figmaLink: "https://figma.com/insti-meteo",
    githubLink: "https://github.com/auriol-lissan/insti-meteo"
  },
  {
    title: "Bèmi",
    description: "Application mobile qui aide à bien trier tous les types de déchets grâce à l’intelligence artificielle et au QR code.Et à chaque bon geste, tu gagnes des cadeaux, qu’on appelle les “kwètché”.",
    longDescription: "BèmiApp est une application mobile intelligente qui facilite le tri des déchets grâce à la reconnaissance via QR code et à l’intelligence artificielle. Chaque tri correct permet de gagner des récompenses appelées “kwètché”, encourageant ainsi les bons gestes écologiques. L’application allie technologie et écoresponsabilité pour promouvoir un environnement plus propre.",
    image: "/images/projects/Bèmi.png",
    category: ["UI/UX Design", "Developpement Mobile"],
    tech: ["Figma", "Flutter" , "Laravel", "MySql"],
    year: "2025",
    figmaLink: "https://figma.com/bemi-app",
    githubLink: "https://github.com/auriol-lissan/bemi-app"
  },
  {
    title: "YÓVÒ GBÈ",
    description: "Application Mobile d'apprentissage linguistique du français à partir du fongbe immersive intégrant des éléments culturels africains avec une approche pédagogique moderne.",
    longDescription: "YÓVÒ GBÈ est une application mobile d’apprentissage du français destinée aux artisans, commerçants et autres personnes parlant le fon. Elle utilise une approche intuitive basée sur l’écoute audio (voix off) et des illustrations visuelles. L’objectif est de faciliter l’inclusion linguistique par un apprentissage pratique et accessible",
    image: "/images/projects/YOVO GBE.jpg",
    category: ["UI/UX Design", "Développement Web"],
    tech: ["Figma", "Reacte Native" , "MySql"],
    year: "2025",
    figmaLink: "https://figma.com/yovo-gbe",
    githubLink: "https://github.com/auriol-lissan/yovo-gbe"
  }
];

export default function FeaturedWork() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"></div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
              Projets Sélectionnés
            </h2>
            <div className="h-1 w-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"></div>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez quelques-uns de mes projets récents qui illustrent ma passion pour le design et le développement.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group cursor-pointer transform hover:-translate-y-2 border border-gray-100 hover:border-blue-200"
            >
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

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
                      <svg className="w-5 h-5 text-gray-700 group-hover/btn:text-purple-600 transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.015-4.49-4.491S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148z"/>
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
                      <svg className="w-5 h-5 text-gray-700 group-hover/btn:text-gray-900 transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
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
                        className="text-sm font-medium text-blue-600 bg-gradient-to-r from-blue-50 to-blue-100 px-3 py-1 rounded-full border border-blue-200/50 hover:border-blue-300 transition-colors duration-300"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 font-medium">{project.year}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors duration-300">{project.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="text-xs bg-gray-50 text-gray-600 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-300">
                      {tech}
                    </span>
                  ))}
                </div>
                <button type="button" className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center whitespace-nowrap group-hover:translate-x-1 transition-transform duration-300">
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
            className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-violet-700 hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 whitespace-nowrap transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span>Voir tous mes projets</span>
            <i className="ri-arrow-right-line ml-3 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true"></i>
          </Link>
        </div>

        {/* Modal amélioré */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in" onClick={() => setSelectedProject(null)}>
            <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
              <div className="relative">
                {/* Header avec gradient */}
                <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.category.map((cat, index) => (
                        <span key={index} className="text-sm font-medium text-blue-600 bg-gradient-to-r from-blue-100 to-blue-200 px-4 py-2 rounded-full border border-blue-200">
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
                          className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-purple-50 hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg group"
                          title="Voir sur Figma"
                        >
                          <svg className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.015-4.49-4.491S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148z"/>
                          </svg>
                        </a>
                      )}
                      {selectedProject.githubLink && (
                        <a
                          href={selectedProject.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg group"
                          title="Voir sur GitHub"
                        >
                          <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => setSelectedProject(null)}
                        className="w-10 h-10 flex items-center justify-center bg-white hover:bg-red-50 rounded-full transition-all duration-300 shadow-md hover:shadow-lg group"
                        title="Fermer"
                        aria-label="Fermer le modal"
                      >
                        <i className="ri-close-line text-lg text-gray-600 group-hover:text-red-600 transition-colors duration-300"></i>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500 font-medium bg-white px-3 py-1 rounded-full">{selectedProject.year}</span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-2">{selectedProject.title}</h2>
                </div>

                {/* Contenu */}
                <div className="p-6">
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">{selectedProject.longDescription}</p>

                  <div className="aspect-video overflow-hidden rounded-2xl mb-8 shadow-lg">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Technologies utilisées</h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.tech.map((tech, techIndex) => (
                        <span key={techIndex} className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-300">
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



