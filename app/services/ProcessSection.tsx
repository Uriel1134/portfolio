'use client';
import Link from 'next/link';

const steps = [
  {
    number: "01",
    title: "Découverte",
    description: "Analyse de vos besoins, objectifs et contraintes pour définir la stratégie optimale.",
    icon: "ri-search-line"
  },
  {
    number: "02",
    title: "Conception",
    description: "Création des maquettes, prototypes et validation des concepts avec votre équipe.",
    icon: "ri-pencil-ruler-line"
  },
  {
    number: "03",
    title: "Développement",
    description: "Réalisation technique avec suivi régulier et tests de qualité continus.",
    icon: "ri-code-s-slash-line"
  },
  {
    number: "04",
    title: "Livraison",
    description: "Mise en ligne, formation et accompagnement pour un lancement réussi.",
    icon: "ri-rocket-line"
  }
];

export default function ProcessSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"></div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
              Mon Processus de Travail
            </h2>
            <div className="h-1 w-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"></div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une méthodologie éprouvée pour transformer vos idées en réalisations concrètes,
            avec transparence et collaboration à chaque étape.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 flex items-center justify-center bg-blue-600 text-white rounded-full mx-auto mb-4">
                  <i className={`${step.icon} text-2xl`}></i>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center bg-purple-600 text-white text-sm font-bold rounded-full">
                  {step.number}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Prêt à concrétiser votre vision ?
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Chaque grand projet commence par une conversation. Partageons vos idées 
            et explorons ensemble les possibilités infinies du design et de la technologie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-50 hover:shadow-lg transition-all duration-300 whitespace-nowrap transform hover:-translate-y-0.5"
            >
              <span>Démarrer un projet</span>
              <i className="ri-arrow-right-line ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
            </Link>
            <Link
              href="/projects"
              className="group inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 whitespace-nowrap transform hover:-translate-y-0.5"
            >
              <span>Voir mes réalisations</span>
              <i className="ri-eye-line ml-2 group-hover:scale-110 transition-transform duration-300"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}