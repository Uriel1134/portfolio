'use client';

export default function AboutHero() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="space-y-6">
              <p className="text-sm font-semibold text-[#C9A84C] uppercase tracking-widest">À propos</p>
              <h1 className="text-4xl lg:text-5xl font-black leading-tight text-white">
                Bonjour, je suis<br />
                <span className="text-[#C9A84C]">Auriol Uriel Lissan</span>
              </h1>

              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-[#C9A84C]"></div>
                <p className="text-sm font-medium text-gray-400">Designer &amp; Développeur passionné</p>
              </div>
            </div>

            <p className="text-base text-gray-400 mb-6 leading-relaxed mt-8">
              Designer UI/UX passionné, développeur web et mobile, et créatif graphique basé au Bénin.
              Je crée des expériences numériques qui allient esthétique, fonctionnalité et impact humain.
            </p>
            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
              Mon approche se concentre sur la compréhension profonde des besoins utilisateurs pour
              concevoir des solutions élégantes qui font vraiment la différence.
            </p>

            <div className="flex flex-wrap gap-2">
              {[
                { skill: 'UI/UX Designer', icon: 'ri-palette-line' },
                { skill: 'Développeur Web & Mobile', icon: 'ri-code-s-slash-line' },
                { skill: 'Graphiste', icon: 'ri-brush-line' },
                { skill: 'IA Enthousiaste', icon: 'ri-robot-line' }
              ].map(({ skill, icon }) => (
                <div
                  key={skill}
                  className="px-4 py-2 bg-white/5 border border-white/10 text-gray-300 rounded-xl font-medium text-sm hover:border-[#C9A84C]/40 hover:text-[#C9A84C] transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <i className={icon} aria-hidden="true"></i>
                    {skill}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <img
                src="/images/about/222A0006.jpg"
                alt="Mon espace de travail créatif"
                className="w-96 h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}