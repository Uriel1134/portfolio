'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  const stats = [
    { number: '50+', label: 'Projets livrés' },
    { number: '3+', label: "Ans d'expérience" },
    { number: '100%', label: 'Satisfaction' },
  ];

  return (
    <section className="relative min-h-screen bg-black flex flex-col justify-center overflow-hidden">

      {/* Background Decorative Elements (Optionnel, subtil) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C9A84C]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

      <div className="relative w-full px-6 lg:px-12 pt-32 pb-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-8 items-center">

          {/* === Colonne gauche : texte === */}
          <div className="space-y-10 z-10">

            {/* Titre principal */}
            <div className="space-y-2">
              <h1 className="text-4xl lg:text-[60px] font-black text-white leading-[1.1] tracking-tight">
                <span className="block lg:inline">Designer UI/UX &</span><br className="hidden lg:block" />
                <span className="block lg:inline text-[#C9A84C]">Développeur web mobile</span>
              </h1>
            </div>

            {/* Accroche */}
            <p className="text-lg lg:text-xl text-gray-400 leading-relaxed max-w-2xl">
              Je m'appelle <strong className="text-white font-semibold">Auriol Uriel Lissan</strong>. Je conçois des expériences numériques mémorables qui fusionnent <span className="text-white font-medium">design d'exception</span> et <span className="text-white font-medium">performance technique</span> pour donner vie à vos idées les plus ambitieuses.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#C9A84C] text-black font-bold rounded-xl hover:bg-[#b8973d] transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-[#C9A84C]/10"
              >
                Voir mes projets
                <i className="ri-arrow-right-line text-lg"></i>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent text-white font-bold rounded-xl border border-white/10 hover:border-[#C9A84C]/40 hover:text-[#C9A84C] transition-all duration-300 backdrop-blur-sm"
              >
                <i className="ri-chat-1-line text-lg"></i>
                Discutons de votre projet
              </Link>
            </div>
          </div>

          {/* === Colonne droite : photo agrandie === */}
          <div className="relative flex justify-center lg:justify-end items-end flex-shrink-0">
            <div className="relative w-full max-w-[550px] lg:max-w-[650px] transform lg:translate-x-12 translate-y-0 min-w-[300px]">
              <Image
                src="/images/hero/profile-photo.png"
                alt="Auriol Uriel Lissan — Designer UI/UX et Développeur"
                width={800}
                height={1000}
                className="w-full h-auto object-contain z-10"
                priority
              />
            </div>
          </div>

        </div>
      </div>

      {/* === Barre de statistiques en bas === */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-[#C9A84C]/20 bg-black py-6 lg:py-10 z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4 lg:px-12">
          <div className="grid grid-cols-3 gap-0 items-center divide-x divide-[#C9A84C]/20">
            {stats.map(({ number, label }) => (
              <div key={label} className="flex flex-col items-center text-center gap-1 lg:gap-2 px-3 sm:px-6">
                <div className="text-xl sm:text-2xl lg:text-4xl font-black text-[#C9A84C] tracking-tighter">{number}</div>
                <div className="text-[8px] sm:text-[10px] lg:text-xs text-gray-400 font-bold uppercase tracking-widest max-w-[80px] sm:max-w-[120px] leading-tight font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
