
'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useCV } from '../hooks/useCV';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cv } = useCV();

  return (
    <header className="fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 z-50">
      <nav className="px-6 lg:px-12 py-5">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group admin-access">
            <div className="w-10 h-10 flex items-center justify-center bg-[#C9A84C] rounded-xl group-hover:bg-[#b8973d] transition-all duration-300">
              <span className="text-black font-bold text-sm">AU</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-white text-base tracking-tight">Auriol Uriel</div>
              <div className="text-xs text-gray-500 -mt-0.5">Creative Developer</div>
            </div>
          </Link>

          {/* Navigation desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {[
              { label: 'Accueil', href: '/' },
              { label: 'À propos', href: '/about' },
              { label: 'Projets', href: '/projects' },
              { label: 'Services', href: '/services' },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="px-5 py-2 text-gray-400 hover:text-white rounded-lg transition-all duration-200 text-sm font-medium"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Boutons */}
          <div className="hidden md:flex items-center gap-3">
            {cv && (
              <a
                href={cv.path}
                download
                className="px-5 py-2.5 bg-transparent border border-white/20 text-white rounded-lg hover:border-[#C9A84C]/60 hover:text-[#C9A84C] transition-all duration-200 text-sm font-medium flex items-center gap-2"
              >
                <i className="ri-download-line"></i>
                CV
              </a>
            )}
            <Link href="/contact" className="px-6 py-2.5 bg-[#C9A84C] text-black rounded-lg hover:bg-[#b8973d] transition-all duration-200 font-semibold text-sm flex items-center gap-2">
              Collaborons
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>

          {/* Menu mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center border border-white/20 rounded-lg transition-all duration-200"
          >
            <div className="flex flex-col gap-1">
              <div className={`w-4 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
              <div className={`w-4 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-4 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
            </div>
          </button>
        </div>

        {/* Menu mobile panel */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 p-5 bg-zinc-900 rounded-2xl border border-white/10 mx-2">
            <div className="flex flex-col gap-1">
              {[
                { label: 'Accueil', href: '/' },
                { label: 'À propos', href: '/about' },
                { label: 'Projets', href: '/projects' },
                { label: 'Services', href: '/services' },
              ].map(({ label, href }) => (
                <Link key={href} href={href} className="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 font-medium text-sm">
                  {label}
                </Link>
              ))}
              <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                {cv && (
                  <a href={cv.path} download className="flex items-center justify-center gap-2 px-4 py-3 border border-white/20 text-white rounded-xl font-medium text-sm hover:border-[#C9A84C]/60 hover:text-[#C9A84C] transition-all duration-200">
                    <i className="ri-download-line"></i>
                    Télécharger CV
                  </a>
                )}
                <Link href="/contact" className="flex items-center justify-center gap-2 px-4 py-3 bg-[#C9A84C] text-black rounded-xl font-semibold text-sm hover:bg-[#b8973d] transition-all duration-200">
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
