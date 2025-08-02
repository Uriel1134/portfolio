'use client';

export default function ProjectsHero() {
  return (
    <section className="py-20 text-white bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900">
      <div className="max-w-6xl px-6 mx-auto text-center lg:px-8">
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="w-12 h-1 rounded-full bg-gradient-to-r from-blue-400 to-violet-400"></div>
          <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text">
            Mes Projets
          </h1>
          <div className="w-12 h-1 rounded-full bg-gradient-to-r from-violet-400 to-purple-400"></div>
        </div>
        <p className="max-w-3xl mx-auto mb-8 text-xl text-gray-200">
          Découvrez une sélection de mes réalisations récentes, chacune racontant une histoire unique 
          de créativité, d'innovation et d'excellence technique.
        </p>
        <div className="flex justify-center gap-6 text-sm">
          <span className="px-4 py-2 rounded-full bg-blue-600/30">UI/UX Design</span>
          <span className="px-4 py-2 rounded-full bg-green-600/30">Développement</span>
          <span className="px-4 py-2 rounded-full bg-purple-600/30">Branding</span>
        </div>
      </div>
    </section>
  );
}