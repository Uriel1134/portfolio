'use client';
import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';

export default function ServicesHero() {
  return (
    <section className="py-24 bg-black text-white relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 text-center">
        <div className="mb-10">
          <SectionTitle
            title="Mes Services"
            ghostText="SERVICES"
            align="center"
          />
        </div>
        <p className="text-base text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed text-center">
          De la conception à la réalisation, je vous accompagne dans la création
          d&apos;expériences numériques exceptionnelles qui marquent les esprits.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center px-8 py-4 bg-[#C9A84C] text-black font-bold rounded-xl hover:bg-[#b8973d] transition-all duration-300 text-sm uppercase tracking-widest"
        >
          <span>Démarrer un projet</span>
          <i className="ri-arrow-right-line ml-3"></i>
        </Link>
      </div>
    </section>
  );
}