'use client';

export default function BrandingHero() {
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
            Branding & Identité Visuelle
          </h1>
          <div className="h-1 w-12 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full"></div>
        </div>
        <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
          Découvrez mes créations d'identité visuelle organisées par entreprise. 
          Chaque projet raconte l'histoire unique d'une marque à travers un design cohérent et impactant.
        </p>
        
        <div className="flex items-center justify-center gap-6 mt-8">
          <div className="flex items-center gap-2 text-blue-200">
            <i className="ri-palette-line text-2xl"></i>
            <span className="font-medium">Identité Visuelle</span>
          </div>
          <div className="flex items-center gap-2 text-violet-200">
            <i className="ri-brush-line text-2xl"></i>
            <span className="font-medium">Design Cohérent</span>
          </div>
          <div className="flex items-center gap-2 text-purple-200">
            <i className="ri-building-line text-2xl"></i>
            <span className="font-medium">Par Entreprise</span>
          </div>
        </div>
      </div>
    </section>
  );
}
