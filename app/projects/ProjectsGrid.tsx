'use client';
import { useState, useEffect } from 'react';
import GraphicGallery from './GraphicGallery';
import BrandingGallery from './BrandingGallery';

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

const projects = [
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
  },
  {
    title: "Climate Insight",
    description: "Plateforme web d’agrégation, d’analyse et de visualisation en temps réel des données climatiques provenant de sources fiables au Bénin.",
    longDescription: "Climate Insight est une plateforme web innovante qui centralise les données climatiques issues de sources fiables au Bénin. Elle permet une analyse approfondie et une visualisation claire des indicateurs environnementaux comme la température, les précipitations ou l’humidité. L’objectif est de fournir aux chercheurs, agriculteurs, décideurs et citoyens des informations précises pour une meilleure adaptation aux enjeux climatiques.",
    image: "/images/projects/Climate Insignt.jpg",
    category: ["UI/UX Design", "Developpement web"],
    tech: ["Figma", "Reacte Js" , "Leaflet", "Chart.js", "PostgreSQL"],
    year: "2025",
    figmaLink: "https://figma.com/climate-insight",
    githubLink: "https://github.com/auriol-lissan/climate-insight"
  },
  {
    title: "Recrutement INSTI",
    description: "Série d'illustrations digitales explorant les thèmes de l'identité africaine moderne et de la transformation digitale.",
    longDescription: "Collection d'œuvres artistiques mêlant techniques traditionnelles et outils numériques pour représenter l'évolution de l'Afrique contemporaine. Exploration visuelle des liens entre tradition et innovation.",
    image: "/images/projects/Recrutement Insti.jpg",
    category: ["UI/UX Design", "Developpement web"],
    tech: ["Figma", "DJANGO", "PostgreSQL"],
    year: "2025",
    figmaLink: "https://figma.com/recrutement-insti",
    githubLink: "https://github.com/auriol-lissan/recrutement-insti"
  }
];

const categories = ["Tous", "UI/UX Design", "Développement Web", "Développement Mobile", "Création Graphique", "Branding"];

export default function ProjectsGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectsData, setProjectsData] = useState<Project[]>(projects);
  const [loading, setLoading] = useState(true);

  // Charger les projets depuis l'API
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
        // Utiliser les données par défaut en cas d'erreur
        setProjectsData(projects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = selectedCategory === "Tous"
    ? projectsData
    : projectsData.filter(project => project.category.includes(selectedCategory));

  // Affichage de chargement
  if (loading) {
    return (
      <div className="max-w-6xl px-6 py-20 mx-auto lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Mes Projets</h1>
          <p className="text-xl text-gray-600">Découvrez mes réalisations et créations</p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl px-6 mx-auto lg:px-8">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Affichage conditionnel selon le type de projet */}
        {selectedCategory === "Création Graphique" ? (
          <GraphicGallery projects={filteredProjects.map(p => ({ ...p, id: p.title }))} />
        ) : selectedCategory === "Branding" ? (
          <BrandingGallery projects={filteredProjects.map(p => ({ ...p, id: p.title }))} />
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="overflow-hidden transition-all duration-500 transform bg-white border border-gray-100 shadow-lg cursor-pointer rounded-2xl hover:shadow-2xl hover:shadow-blue-500/10 group hover:-translate-y-2 hover:border-blue-200"
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:opacity-100"></div>

                {/* Boutons Figma et GitHub en overlay */}
                <div className="absolute flex gap-2 transition-all duration-300 transform translate-y-2 opacity-0 top-4 right-4 group-hover:opacity-100 group-hover:translate-y-0">
                  {project.figmaLink && (
                    <a
                      href={project.figmaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-center w-10 h-10 transition-all duration-300 rounded-full shadow-lg bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-110 hover:shadow-xl group/btn"
                      title="Voir sur Figma"
                    >
                      <svg className="w-5 h-5 text-gray-700 transition-colors duration-300 group-hover/btn:text-purple-600" viewBox="0 0 24 24" fill="currentColor">
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
                      className="flex items-center justify-center w-10 h-10 transition-all duration-300 rounded-full shadow-lg bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-110 hover:shadow-xl group/btn"
                      title="Voir sur GitHub"
                    >
                      <svg className="w-5 h-5 text-gray-700 transition-colors duration-300 group-hover/btn:text-gray-900" viewBox="0 0 24 24" fill="currentColor">
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
                        className="px-3 py-1 text-sm font-medium text-blue-600 transition-colors duration-300 border rounded-full bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200/50 hover:border-blue-300"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-500">{project.year}</span>
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-700">{project.title}</h3>
                <p className="mb-4 leading-relaxed text-gray-600">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="text-xs bg-gray-50 text-gray-600 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-300">
                      {tech}
                    </span>
                  ))}
                </div>
                <button type="button" className="inline-flex items-center font-medium text-blue-600 transition-transform duration-300 hover:text-blue-700 whitespace-nowrap group-hover:translate-x-1">
                  Voir les détails
                  <i className="ml-2 transition-transform duration-300 ri-arrow-right-line group-hover:translate-x-1"></i>
                </button>
              </div>
            </div>
            ))}
          </div>
        )}

        {/* Modal amélioré */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedProject(null)}>
            <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
              <div className="relative">
                {/* Header avec gradient */}
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.category.map((cat, index) => (
                        <span key={index} className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-full bg-gradient-to-r from-blue-100 to-blue-200">
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
                          className="flex items-center justify-center w-10 h-10 transition-all duration-300 bg-white rounded-full shadow-md hover:bg-purple-50 hover:scale-110 hover:shadow-lg group"
                          title="Voir sur Figma"
                        >
                          <svg className="w-5 h-5 text-gray-600 transition-colors duration-300 group-hover:text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.015-4.49-4.491S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148z"/>
                          </svg>
                        </a>
                      )}
                      {selectedProject.githubLink && (
                        <a
                          href={selectedProject.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-10 h-10 transition-all duration-300 bg-white rounded-full shadow-md hover:bg-gray-50 hover:scale-110 hover:shadow-lg group"
                          title="Voir sur GitHub"
                        >
                          <svg className="w-5 h-5 text-gray-600 transition-colors duration-300 group-hover:text-gray-900" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => setSelectedProject(null)}
                        className="flex items-center justify-center w-10 h-10 transition-all duration-300 bg-white rounded-full shadow-md hover:bg-red-50 hover:shadow-lg group"
                        title="Fermer"
                        aria-label="Fermer le modal"
                      >
                        <i className="text-lg text-gray-600 transition-colors duration-300 ri-close-line group-hover:text-red-600"></i>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 text-sm font-medium text-gray-500 bg-white rounded-full">{selectedProject.year}</span>
                  </div>
                  <h2 className="mb-2 text-3xl font-bold text-transparent lg:text-4xl bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text">{selectedProject.title}</h2>
                </div>

                {/* Contenu */}
                <div className="p-6">
                  <p className="mb-8 text-lg leading-relaxed text-gray-600">{selectedProject.longDescription}</p>

                  <div className="mb-8 overflow-hidden shadow-lg aspect-video rounded-2xl">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="mb-3 text-lg font-semibold text-gray-900">Technologies utilisées</h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.tech.map((tech, techIndex) => (
                        <span key={techIndex} className="px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-300 border border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:border-gray-300 hover:shadow-sm">
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




