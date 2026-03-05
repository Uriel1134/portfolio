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
    longDescription: "BèmiApp est une application mobile intelligente qui facilite le tri des déchets grâce à la reconnaissance via QR code et à l’intelligence artificielle. Chaque tri correct permet de gagner des récompenses appelé “kwètché”, encourageant ainsi les bons gestes écologiques. L’application allie technologie et écoresponsabilité pour promouvoir un environnement plus propre.",
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
    figmaLink: "https://www.figma.com/design/QOouqiypG7gpfDRCfxk3Nv/YOVO-GBE?node-id=0-1&t=mRGoF5WArPekyPTH-1",
    githubLink: "https://github.com/Uriel1134/yovogbe"
  },
  {
    title: "Climate Insight",
    description: "Plateforme web d’agrégation, d’analyse et de visualisation en temps réel des données climatiques provenant de sources fiables au Bénin.",
    longDescription: "Climate Insight est une plateforme web innovante qui centralise les données climatiques issues de sources fiables au Bénin. Elle permet une analyse approfondie et une visualisation claire des indicateurs environnementaux comme la température, les précipitations ou l’humidité. L’objectif est de fournir aux chercheurs, agriculteurs, décideurs et citoyens des informations précises pour une meilleure adaptation aux enjeux climatiques.",
    image: "/images/projects/Climate_Insignt.jpg",
    category: ["UI/UX Design", "Developpement web"],
    tech: ["Figma", "Reacte Js", "Leaflet", "Chart.js", "PostgreSQL"],
    year: "2025",
    figmaLink: "https://www.figma.com/design/1eYpWc1gk3bX4mJH3v1u0g/Climate-Insight?node-id=0-1&t=G9NyQQBni4MHfLeu-1",
    githubLink: "https://github.com/Uriel1134/ClimateInsight"
  },
  {
    title: "Recrutement INSTI",
    description: "Série d'illustrations digitales explorant les thèmes de l'identité africaine moderne et de la transformation digitale.",
    longDescription: "Collection d'œuvres artistiques mêlant techniques traditionnelles et outils numériques pour représenter l'évolution de l'Afrique contemporaine. Exploration visuelle des liens entre tradition et innovation.",
    image: "/images/projects/Recrutement_Insti.jpg",
    category: ["UI/UX Design", "Developpement web"],
    tech: ["Figma", "DJANGO", "PostgreSQL"],
    year: "2025",
    figmaLink: "https://www.figma.com/design/l2AjGCNbiFnbMOKYAYRvor/Recrutement-Enseignant-INSTI?node-id=0-1&t=G9NyQQBni4MHfLeu-1",
    githubLink: "https://github.com/Uriel1134/huma"
  }
];

const categories = ["Tous", "UI/UX Design", "Développement Web", "Développement Mobile", "Création Graphique", "Branding"];

export default function ProjectsGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectsData, setProjectsData] = useState<Project[]>(projects);
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
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${selectedCategory === category
                ? 'bg-[#C9A84C] text-black border-[#C9A84C]'
                : 'bg-zinc-900 text-gray-400 border-white/10 hover:border-[#C9A84C]/50 hover:text-white'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {selectedCategory === "Création Graphique" ? (
          <GraphicGallery projects={filteredProjects.map(p => ({ ...p, id: p.title }))} />
        ) : selectedCategory === "Branding" ? (
          <BrandingGallery projects={filteredProjects.map(p => ({ ...p, id: p.title }))} />
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className="overflow-hidden transition-all duration-500 bg-zinc-900 border border-white/10 cursor-pointer rounded-2xl hover:border-[#C9A84C]/40 group"
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                    <div className="px-6 py-3 bg-[#C9A84C] text-black text-xs font-bold uppercase tracking-widest rounded-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
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

                <div className="p-8" onClick={() => setSelectedProject(project)}>
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
                  <p className="mb-6 text-sm text-gray-400 leading-relaxed">{project.description}</p>
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
            ))}
          </div>
        )}

        {selectedProject && (
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
