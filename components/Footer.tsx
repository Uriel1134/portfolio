'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative py-16 overflow-hidden text-white bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Arrière-plan décoratif */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 w-64 h-64 rounded-full left-1/4 bg-gradient-to-r from-blue-500/10 to-violet-500/10 blur-3xl"></div>
        <div className="absolute bottom-0 rounded-full right-1/4 w-80 h-80 bg-gradient-to-l from-purple-500/10 to-pink-500/10 blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl px-6 mx-auto lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="space-y-6">
            {/* Logo avec dégradé */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 shadow-lg bg-gradient-to-br from-blue-600 via-violet-600 to-purple-600 rounded-2xl">
                <span className="text-xl font-bold text-white">AU</span>
              </div>
              <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text">Auriol</h3>
            </div>
            <p className="leading-relaxed text-gray-300">
              Designer UI/UX et développeur passionné par la création d'expériences numériques exceptionnelles qui marquent les esprits.
            </p>
            <div className="flex space-x-3">
              <a href="www.linkedin.com/in/auriol-juliano-uriel-lissan-88913526b" className="flex items-center justify-center w-12 h-12 transition-all duration-300 transform group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/25">
                <i className="text-white transition-transform duration-300 ri-linkedin-fill group-hover:scale-110"></i>
              </a>
              <a href="https://github.com/Uriel1134" className="flex items-center justify-center w-12 h-12 transition-all duration-300 transform group bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 rounded-xl hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-500/25">
                <i className="text-white transition-transform duration-300 ri-github-fill group-hover:scale-110"></i>
              </a>
              <a href="#" className="flex items-center justify-center w-12 h-12 transition-all duration-300 transform group bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 rounded-xl hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-500/25">
                <i className="text-white transition-transform duration-300 ri-dribbble-fill group-hover:scale-110"></i>
              </a>
              <a href="https://wa.me/qr/PHWFBJ53IO4AA1" className="flex items-center justify-center w-12 h-12 transition-all duration-300 transform group bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl hover:-translate-y-1 hover:shadow-lg hover:shadow-green-500/25">
                <i className="text-white transition-transform duration-300 ri-whatsapp-fill group-hover:scale-110"></i>
              </a>
              <a href="https://www.facebook.com/aurioljulianouriel.lissan" className="flex items-center justify-center w-12 h-12 transition-all duration-300 transform group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-400/25">
                <i className="text-white transition-transform duration-300 ri-facebook-fill group-hover:scale-110"></i>
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-bold text-transparent bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text">Navigation</h4>
            <div className="flex flex-col space-y-3">
              <Link href="/" className="flex items-center gap-2 text-gray-300 transition-all duration-300 cursor-pointer hover:text-white hover:translate-x-1 group">
                <i className="transition-colors duration-300 ri-home-line group-hover:text-blue-400"></i>
                Accueil
              </Link>
              <Link href="/about" className="flex items-center gap-2 text-gray-300 transition-all duration-300 cursor-pointer hover:text-white hover:translate-x-1 group">
                <i className="transition-colors duration-300 ri-user-line group-hover:text-violet-400"></i>
                À propos
              </Link>
              <Link href="/projects" className="flex items-center gap-2 text-gray-300 transition-all duration-300 cursor-pointer hover:text-white hover:translate-x-1 group">
                <i className="transition-colors duration-300 ri-folder-line group-hover:text-purple-400"></i>
                Projets
              </Link>
              <Link href="/services" className="flex items-center gap-2 text-gray-300 transition-all duration-300 cursor-pointer hover:text-white hover:translate-x-1 group">
                <i className="transition-colors duration-300 ri-service-line group-hover:text-pink-400"></i>
                Services
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-bold text-transparent bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text">Contact & Collaboration</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600">
                  <i className="text-sm text-white ri-map-pin-line"></i>
                </div>
                <span>Bénin, Afrique de l'Ouest</span>
              </div>
              <Link href="/contact" className="group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-violet-700 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5">
                <i className="transition-transform duration-300 ri-chat-3-line group-hover:scale-110"></i>
                <span>Démarrons un projet</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Section copyright modernisée */}
        <div className="pt-8 mt-12 border-t border-gradient-to-r from-blue-800/30 via-violet-800/30 to-purple-800/30">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-4 text-gray-400">
              <p>&copy; 2024 Noukpo Auriol Juliano U. Lissan. Tous droits réservés.</p>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <i className="text-red-400 ri-heart-fill"></i>
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