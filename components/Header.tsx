
'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useCV } from '../hooks/useCV';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cv } = useCV();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 z-50 shadow-sm">
      <nav className="px-6 lg:px-12 py-5">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo redesigné avec dégradé coloré */}
          <Link href="/" className="flex items-center gap-4 group admin-access">
            <div className="relative">
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-600 via-violet-600 to-purple-600 rounded-2xl group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300 group-hover:scale-105">
                <span className="text-white font-bold text-xl">AU</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-gray-900 text-xl tracking-tight group-hover:text-blue-700 transition-colors duration-300">Auriol Uriel</div>
              <div className="text-sm text-gray-500 -mt-1">Creative Developer</div>
            </div>
          </Link>
          
          {/* Navigation moderne avec effets colorés */}
          <div className="hidden lg:flex items-center bg-gray-50/80 rounded-2xl p-2">
            <Link href="/" className="px-6 py-2.5 text-gray-700 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all duration-300 whitespace-nowrap cursor-pointer font-medium text-sm relative group">
              Accueil
              <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500 group-hover:w-8 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300 rounded-full"></div>
            </Link>
            <Link href="/about" className="px-6 py-2.5 text-gray-700 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all duration-300 whitespace-nowrap cursor-pointer font-medium text-sm relative group">
              À propos
              <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500 group-hover:w-8 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300 rounded-full"></div>
            </Link>
            <Link href="/projects" className="px-6 py-2.5 text-gray-700 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all duration-300 whitespace-nowrap cursor-pointer font-medium text-sm relative group">
              Projets
              <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500 group-hover:w-8 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300 rounded-full"></div>
            </Link>
            <Link href="/services" className="px-6 py-2.5 text-gray-700 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all duration-300 whitespace-nowrap cursor-pointer font-medium text-sm relative group">
              Services
              <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500 group-hover:w-8 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300 rounded-full"></div>
            </Link>
          </div>

          {/* Boutons CV et contact */}
          <div className="hidden md:flex items-center gap-3">
            {cv && (
              <a
                href={cv.path}
                download
                className="px-6 py-3 bg-white border-2 border-violet-300 text-violet-700 rounded-2xl hover:bg-violet-50 hover:border-violet-400 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300 whitespace-nowrap font-semibold text-sm flex items-center gap-2 transform hover:-translate-y-0.5"
              >
                <i className="ri-download-line"></i>
                CV
              </a>
            )}
            <Link href="/contact" className="px-8 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-2xl hover:from-blue-700 hover:to-violet-700 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 whitespace-nowrap cursor-pointer font-semibold text-sm flex items-center gap-2 transform hover:-translate-y-0.5">
              Collaborons
              <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform duration-300"></i>
            </Link>
          </div>

          {/* Menu mobile avec accent coloré */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-12 h-12 flex items-center justify-center hover:bg-blue-50 rounded-2xl transition-all duration-300 cursor-pointer group"
          >
            <div className="flex flex-col gap-1">
              <div className={`w-5 h-0.5 bg-gray-700 group-hover:bg-blue-600 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
              <div className={`w-5 h-0.5 bg-gray-700 group-hover:bg-blue-600 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-5 h-0.5 bg-gray-700 group-hover:bg-blue-600 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
            </div>
          </button>
        </div>

        {/* Menu mobile avec couleurs */}
        {isMenuOpen && (
          <div className="lg:hidden mt-6 p-6 bg-white/95 backdrop-blur-xl rounded-3xl border border-gray-200/50 mx-4 shadow-2xl">
            <div className="flex flex-col gap-2">
              <Link href="/" className="px-6 py-4 text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-2xl transition-all duration-300 cursor-pointer font-medium">
                Accueil
              </Link>
              <Link href="/about" className="px-6 py-4 text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-2xl transition-all duration-300 cursor-pointer font-medium">
                À propos
              </Link>
              <Link href="/projects" className="px-6 py-4 text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-2xl transition-all duration-300 cursor-pointer font-medium">
                Projets
              </Link>
              <Link href="/services" className="px-6 py-4 text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-2xl transition-all duration-300 cursor-pointer font-medium">
                Services
              </Link>
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                {cv && (
                  <a
                    href={cv.path}
                    download
                    className="flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-violet-300 text-violet-700 rounded-2xl font-semibold hover:bg-violet-50 hover:border-violet-400 transition-all duration-300"
                  >
                    <i className="ri-download-line"></i>
                    Télécharger CV
                  </a>
                )}
                <Link href="/contact" className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-2xl font-semibold cursor-pointer hover:from-blue-700 hover:to-violet-700 transition-all duration-300">
                  Collaborons
                  <i className="ri-arrow-right-line"></i>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

