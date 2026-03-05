'use client';

export default function ProjectsHero() {
  return (
    <section className="py-24 bg-black text-white relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="h-px w-12 bg-[#C9A84C]"></div>
          <h1 className="text-4xl lg:text-5xl font-black text-white">
            Mes <span className="text-[#C9A84C]">Projets</span>
          </h1>
          <div className="h-px w-12 bg-[#C9A84C]"></div>
        </div>
        <p className="text-base text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          Découvrez une sélection de mes réalisations récentes, chacune racontant une histoire unique
          de créativité, d&apos;innovation et d&apos;excellence technique.
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-[10px] font-bold uppercase tracking-widest">
          <span className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400">UI/UX Design</span>
          <span className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400">Développement</span>
          <span className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400">Branding</span>
        </div>
      </div>
    </section>
  );
}