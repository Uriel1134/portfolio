'use client';

export default function ContactHero() {
  return (
    <section className="py-24 bg-black text-white relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="h-px w-12 bg-[#C9A84C]"></div>
          <h1 className="text-4xl lg:text-5xl font-black text-white">
            Travaillons <span className="text-[#C9A84C]">Ensemble</span>
          </h1>
          <div className="h-px w-12 bg-[#C9A84C]"></div>
        </div>
        <p className="text-base text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Vous avez un projet en tête ? Une idée à explorer ? Je serais ravi d&apos;échanger
          avec vous et de découvrir comment nous pouvons créer quelque chose d&apos;exceptionnel ensemble.
        </p>
      </div>
    </section>
  );
}