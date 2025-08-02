'use client';

export default function AboutHero() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-violet-50 relative overflow-hidden">
      {/* Arrière-plan décoratif */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-20 -left-40 w-80 h-80 bg-gradient-to-r from-blue-200/30 to-violet-200/30 rounded-full blur-3xl animate-pulse [animation-duration:4s]"></div>
        <div className="absolute bottom-20 -right-40 w-96 h-96 bg-gradient-to-l from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse [animation-duration:6s] [animation-delay:2s]"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="space-y-6">
              <h1 className="text-5xl font-bold leading-tight">
                <span className="block text-gray-900">Bonjour, je suis</span>
                <span className="block bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                  Auriol Uriel Lissan
                </span>
              </h1>

              <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"></div>
                <p className="text-lg font-medium text-gray-600">Designer & Développeur passionné</p>
              </div>
            </div>

            <p className="text-xl text-gray-600 mb-6 leading-relaxed mt-8">
              Designer UI/UX passionné, développeur web et mobile, et créatif graphique basé au Bénin.
              Je crée des expériences numériques qui allient esthétique, fonctionnalité et impact humain.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Mon approche se concentre sur la compréhension profonde des besoins utilisateurs pour
              concevoir des solutions élégantes qui font vraiment la différence. Chaque projet est
              une opportunité de créer quelque chose de meaningful et durable.
            </p>

            <div className="flex flex-wrap gap-3">
              {[
                { skill: 'UI/UX Designer', icon: 'ri-palette-line' },
                { skill: 'Développeur Web & Mobile', icon: 'ri-code-s-slash-line' },
                { skill: 'Graphiste', icon: 'ri-brush-line' },
                { skill: 'IA Enthousiaste', icon: 'ri-robot-line' }
              ].map(({ skill, icon }, index) => (
                <div
                  key={skill}
                  className="group px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-gray-200/60 text-gray-700 rounded-xl font-semibold text-sm shadow-sm hover:shadow-md hover:border-blue-300/60 hover:text-blue-700 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-center gap-2">
                    <i className={`${icon} group-hover:scale-110 transition-transform duration-300`} aria-hidden="true"></i>
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
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-30 blur-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}