'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative py-16 overflow-hidden text-white bg-zinc-950 border-t border-white/10">

      <div className="relative max-w-6xl px-6 mx-auto lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-[#C9A84C] rounded-xl">
                <span className="text-sm font-bold text-black">AU</span>
              </div>
              <h3 className="text-xl font-bold text-white">Auriol</h3>
            </div>
            <p className="leading-relaxed text-gray-400 text-sm">
              Designer UI/UX et développeur passionné par la création d&apos;expériences numériques exceptionnelles qui marquent les esprits.
            </p>
            <div className="flex space-x-2">
              <a href="www.linkedin.com/in/auriol-juliano-uriel-lissan-88913526b" className="flex items-center justify-center w-10 h-10 transition-all duration-300 bg-white/5 border border-white/10 hover:border-[#C9A84C]/50 hover:text-[#C9A84C] rounded-xl">
                <i className="ri-linkedin-fill text-sm"></i>
              </a>
              <a href="https://github.com/Uriel1134" className="flex items-center justify-center w-10 h-10 transition-all duration-300 bg-white/5 border border-white/10 hover:border-[#C9A84C]/50 hover:text-[#C9A84C] rounded-xl">
                <i className="ri-github-fill text-sm"></i>
              </a>
              <a href="#" className="flex items-center justify-center w-10 h-10 transition-all duration-300 bg-white/5 border border-white/10 hover:border-[#C9A84C]/50 hover:text-[#C9A84C] rounded-xl">
                <i className="ri-dribbble-fill text-sm"></i>
              </a>
              <a href="https://wa.me/qr/PHWFBJ53IO4AA1" className="flex items-center justify-center w-10 h-10 transition-all duration-300 bg-white/5 border border-white/10 hover:border-[#C9A84C]/50 hover:text-[#C9A84C] rounded-xl">
                <i className="ri-whatsapp-fill text-sm"></i>
              </a>
              <a href="https://www.facebook.com/aurioljulianouriel.lissan" className="flex items-center justify-center w-10 h-10 transition-all duration-300 bg-white/5 border border-white/10 hover:border-[#C9A84C]/50 hover:text-[#C9A84C] rounded-xl">
                <i className="ri-facebook-fill text-sm"></i>
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-semibold text-[#C9A84C] uppercase tracking-widest">Navigation</h4>
            <div className="flex flex-col space-y-3">
              <Link href="/" className="text-gray-400 hover:text-white transition-all duration-200 text-sm">Accueil</Link>
              <Link href="/about" className="text-gray-400 hover:text-white transition-all duration-200 text-sm">À propos</Link>
              <Link href="/projects" className="text-gray-400 hover:text-white transition-all duration-200 text-sm">Projets</Link>
              <Link href="/services" className="text-gray-400 hover:text-white transition-all duration-200 text-sm">Services</Link>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-semibold text-[#C9A84C] uppercase tracking-widest">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <i className="ri-map-pin-line text-[#C9A84C]"></i>
                <span>Bénin, Afrique de l&apos;Ouest</span>
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-3 bg-[#C9A84C] text-black font-semibold rounded-xl hover:bg-[#b8973d] transition-all duration-200 text-sm">
                <i className="ri-chat-3-line"></i>
                Démarrons un projet
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 mt-12 border-t border-white/10">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-gray-600 text-sm">&copy; 2024 Noukpo Auriol Juliano U. Lissan. Tous droits réservés.</p>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <i className="text-[#C9A84C] ri-heart-fill text-xs"></i>
                Fait avec passion au Bénin
              </span>
              <span className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full animate-pulse"></div>
                Disponible pour collaborer
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}