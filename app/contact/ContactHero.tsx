'use client';

export default function ContactHero() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-900 via-violet-900 to-purple-900 text-white relative overflow-hidden">
      {/* Arrière-plan décoratif */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-20 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-violet-400/20 rounded-full blur-3xl animate-pulse [animation-duration:4s]"></div>
        <div className="absolute bottom-20 -right-40 w-96 h-96 bg-gradient-to-l from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse [animation-duration:6s] [animation-delay:2s]"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="h-1 w-12 bg-gradient-to-r from-blue-400 to-violet-400 rounded-full"></div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
            Travaillons Ensemble
          </h1>
          <div className="h-1 w-12 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full"></div>
        </div>
        <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
          Vous avez un projet en tête ? Une idée à explorer ? Je serais ravi d'échanger
          avec vous et de découvrir comment nous pouvons créer quelque chose d'exceptionnel ensemble.
        </p>
      </div>
    </section>
  );
}