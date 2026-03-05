'use client';
import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';

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
    <section className="py-24 bg-black">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <SectionTitle
            title="Mon Processus"
            ghostText="PROCESSUS"
            align="center"
          />
          <p className="text-base text-gray-400 max-w-3xl mx-auto leading-relaxed -mt-8">
            Une méthodologie éprouvée pour transformer vos idées en réalisations concrètes,
            avec transparence et collaboration à chaque étape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 flex items-center justify-center bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/20 rounded-full mx-auto group-hover:bg-[#C9A84C] group-hover:text-black transition-all duration-300">
                  <i className={`${step.icon} text-3xl`}></i>
                </div>
                <div className="absolute top-0 right-1/2 translate-x-12 w-8 h-8 flex items-center justify-center bg-[#C9A84C] text-black text-[10px] font-black rounded-full border-4 border-black">
                  {step.number}
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-3 tracking-tight">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Prêt à concrétiser votre vision ?
          </h3>
          <p className="text-base text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Chaque grand projet commence par une conversation. Partageons vos idées
            et explorons ensemble les possibilités infinies du design et de la technologie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#C9A84C] text-black font-bold rounded-xl hover:bg-[#b8973d] transition-all duration-300 text-sm uppercase tracking-widest"
            >
              <span>Démarrer un projet</span>
              <i className="ri-arrow-right-line ml-3"></i>
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:border-[#C9A84C]/60 hover:text-[#C9A84C] transition-all duration-300 text-sm uppercase tracking-widest"
            >
              <span>Voir mes réalisations</span>
              <i className="ri-eye-line ml-3"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
