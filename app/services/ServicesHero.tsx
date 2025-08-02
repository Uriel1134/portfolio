'use client';
import Link from 'next/link';

export default function ServicesHero() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-blue-400 to-violet-400 rounded-full"></div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              Mes Services
            </h1>
            <div className="h-1 w-12 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full"></div>
          </div>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
            De la conception à la réalisation, je vous accompagne dans la création 
            d'expériences numériques exceptionnelles qui marquent les esprits.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-violet-700 hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 whitespace-nowrap transform hover:-translate-y-0.5"
          >
            <span>Démarrer un projet</span>
            <i className="ri-arrow-right-line ml-3 group-hover:translate-x-1 transition-transform duration-300"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}