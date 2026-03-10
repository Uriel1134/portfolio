'use client';

export default function AboutHero() {
  return (
    <section className="pt-12 lg:pt-16 pb-24 lg:pb-32 bg-black relative">
      <div className="relative z-0 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="order-1 lg:order-1">
            <div className="space-y-10 lg:space-y-12">
              <div className="space-y-4 lg:space-y-6">
                <p className="text-xs lg:text-sm font-semibold text-[#C9A84C] uppercase tracking-[0.4em]">À propos</p>
                <h1 className="text-3xl lg:text-6xl font-black leading-tight text-white tracking-tight">
                  Salut, je suis<br />
                  <span className="text-[#C9A84C]">Auriol Uriel Lissan</span>
                </h1>

                <div className="flex items-center gap-4 mt-6 lg:mt-8">
                  <div className="h-px w-12 lg:w-16 bg-[#C9A84C]"></div>
                  <p className="text-base lg:text-lg font-medium text-gray-400">Designer &amp; Développeur passionné</p>
                </div>
              </div>

              <div className="space-y-6 lg:space-y-8 max-w-xl">
                <p className="text-lg lg:text-xl text-gray-300 leading-relaxed font-light">
                  Designer UI/UX passionné, développeur web et mobile, et créatif graphique basé au Bénin.
                  Je crée des expériences numériques qui allient <span className="text-white font-medium">esthétique</span>,
                  <span className="text-white font-medium"> fonctionnalité</span> et <span className="text-white font-medium">impact humain</span>.
                </p>
                <p className="text-base lg:text-lg text-gray-500 leading-relaxed">
                  Mon approche se concentre sur la compréhension profonde des besoins utilisateurs pour
                  concevoir des solutions élégantes qui font vraiment la différence.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 lg:gap-3 pt-4 lg:pt-6">
                {[
                  { skill: 'UI/UX Designer', icon: 'ri-palette-line' },
                  { skill: 'Développeur Web & Mobile', icon: 'ri-code-s-slash-line' },
                  { skill: 'Graphiste', icon: 'ri-brush-line' },
                  { skill: 'IA Enthousiaste', icon: 'ri-robot-line' }
                ].map(({ skill, icon }) => (
                  <div
                    key={skill}
                    className="px-4 lg:px-5 py-2 lg:py-3 bg-white/5 border border-white/10 text-gray-300 rounded-xl font-medium text-xs lg:text-base hover:border-[#C9A84C]/40 hover:text-[#C9A84C] transition-all duration-300 cursor-default"
                  >
                    <div className="flex items-center gap-2 lg:gap-3">
                      <i className={`${icon} text-[#C9A84C]/70`} aria-hidden="true"></i>
                      {skill}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end order-2 lg:order-2 mt-12 lg:mt-0">
            <div className="relative">
              <img
                src="/images/about/222A0006.png"
                alt="Portrait de Auriol Uriel Lissan"
                className="w-full max-w-[320px] lg:max-w-[480px] h-auto object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}