'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white py-16 overflow-hidden">
      {/* Arrière-plan décoratif */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-violet-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-l from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            {/* Logo avec dégradé */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-600 via-violet-600 to-purple-600 rounded-2xl shadow-lg">
                <span className="text-white font-bold text-xl">AU</span>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Auriol</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Designer UI/UX et développeur passionné par la création d'expériences numériques exceptionnelles qui marquent les esprits.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="group w-12 h-12 flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/25">
                <i className="ri-linkedin-fill text-white group-hover:scale-110 transition-transform duration-300"></i>
              </a>
              <a href="#" className="group w-12 h-12 flex items-center justify-center bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-500/25">
                <i className="ri-github-fill text-white group-hover:scale-110 transition-transform duration-300"></i>
              </a>
              <a href="#" className="group w-12 h-12 flex items-center justify-center bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-500/25">
                <i className="ri-dribbble-fill text-white group-hover:scale-110 transition-transform duration-300"></i>
              </a>
              <a href="#" className="group w-12 h-12 flex items-center justify-center bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-green-500/25">
                <i className="ri-whatsapp-fill text-white group-hover:scale-110 transition-transform duration-300"></i>
              </a>
              <a href="#" className="group w-12 h-12 flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-400/25">
                <i className="ri-facebook-fill text-white group-hover:scale-110 transition-transform duration-300"></i>
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Navigation</h4>
            <div className="flex flex-col space-y-3">
              <Link href="/" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 cursor-pointer group flex items-center gap-2">
                <i className="ri-home-line group-hover:text-blue-400 transition-colors duration-300"></i>
                Accueil
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 cursor-pointer group flex items-center gap-2">
                <i className="ri-user-line group-hover:text-violet-400 transition-colors duration-300"></i>
                À propos
              </Link>
              <Link href="/projects" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 cursor-pointer group flex items-center gap-2">
                <i className="ri-folder-line group-hover:text-purple-400 transition-colors duration-300"></i>
                Projets
              </Link>
              <Link href="/services" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 cursor-pointer group flex items-center gap-2">
                <i className="ri-service-line group-hover:text-pink-400 transition-colors duration-300"></i>
                Services
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">Contact & Collaboration</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg">
                  <i className="ri-map-pin-line text-white text-sm"></i>
                </div>
                <span>Bénin, Afrique de l'Ouest</span>
              </div>
              <Link href="/contact" className="group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-violet-700 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5">
                <i className="ri-chat-3-line group-hover:scale-110 transition-transform duration-300"></i>
                <span>Démarrons un projet</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Section copyright modernisée */}
        <div className="border-t border-gradient-to-r from-blue-800/30 via-violet-800/30 to-purple-800/30 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-gray-400">
              <p>&copy; 2024 Auriol Uriel Lissan. Tous droits réservés.</p>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <i className="ri-heart-fill text-red-400"></i>
                Fait avec passion au Bénin
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Disponible pour collaborer
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}