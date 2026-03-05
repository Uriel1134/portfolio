'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from './HeroSection';
import FeaturedWork from './FeaturedWork';
import SectionTitle from '@/components/ui/SectionTitle';
import { Award } from '../types/admin';

export default function Home() {
  const [selectedAward, setSelectedAward] = useState<Award | null>(null);
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);

  // Charger les données du portfolio
  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await fetch('/api/portfolio');
        if (response.ok) {
          const data = await response.json();
          setAwards(data.awards);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  // Affichage de chargement
  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <main>
          <HeroSection />
          <FeaturedWork />

          <section className="py-24 bg-zinc-950">
            <div className="max-w-6xl px-6 mx-auto lg:px-8">
              <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-4 border-[#C9A84C] rounded-full border-t-transparent animate-spin"></div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <HeroSection />
        <FeaturedWork />

        {/* Distinctions Section Redesign */}
        <section className="py-24 bg-zinc-950">
          <div className="max-w-6xl px-6 mx-auto lg:px-8">
            <div className="mb-16 text-center">
              <SectionTitle
                title="Distinctions"
                ghostText="AWARDS"
                align="center"
              />
              <p className="max-w-2xl mx-auto text-base text-gray-400 leading-relaxed -mt-8">
                Mes performances dans les compétitions technologiques témoignent de ma capacité à innover sous pression
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {awards.map((award) => (
                <div
                  key={award.id}
                  className="bg-zinc-900 border border-white/10 rounded-2xl p-6 shadow-2xl hover:border-[#C9A84C]/40 transition-all duration-500 cursor-pointer group"
                  onClick={() => setSelectedAward(award)}
                >
                  <div className="relative mb-6 overflow-hidden aspect-video rounded-xl border border-white/5">
                    <img
                      src={award.image}
                      alt={`${award.title} - ${award.event}`}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden w-full h-full bg-zinc-800 rounded-xl flex items-center justify-center">
                      <i className={`${award.icon} text-6xl text-[#C9A84C]/20`}></i>
                    </div>

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="px-4 py-2 bg-[#C9A84C] text-black text-[10px] font-bold uppercase tracking-widest rounded-lg">
                        Détails
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-full flex items-center justify-center flex-shrink-0 text-[#C9A84C]">
                        <i className={`${award.icon} text-xl`}></i>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-[#C9A84C] transition-colors duration-300">{award.title}</h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#C9A84C] mt-1">{award.date}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="font-bold text-sm text-gray-300 uppercase tracking-tight">{award.event}</p>
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{award.description}</p>
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-600">
                        <i className="ri-map-pin-line text-[#C9A84C]"></i>
                        {award.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedAward && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md transition-all" onClick={() => setSelectedAward(null)}>
                <div className="bg-zinc-900 border border-white/10 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={() => setSelectedAward(null)}
                    className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-zinc-800 text-white rounded-full border border-white/10 hover:border-[#C9A84C] transition-all z-20"
                  >
                    <i className="ri-close-line text-2xl"></i>
                  </button>

                  <div className="p-8 lg:p-12">
                    <div className="flex items-center gap-6 mb-8 border-b border-white/5 pb-8">
                      <div className="w-16 h-16 bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-full flex items-center justify-center text-[#C9A84C]">
                        <i className={`${selectedAward.icon} text-3xl`}></i>
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">{selectedAward.title}</h2>
                        <div className="flex flex-wrap gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                          <span className="flex items-center gap-2">
                            <i className="ri-trophy-line text-[#C9A84C]"></i>
                            {selectedAward.event}
                          </span>
                          <span className="flex items-center gap-2">
                            <i className="ri-calendar-line text-[#C9A84C]"></i>
                            {selectedAward.date}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-10">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">À propos</h3>
                      <p className="text-gray-400 leading-relaxed">{selectedAward.description}</p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Photo du prix</h4>
                        <div className="overflow-hidden rounded-2xl border border-white/5 aspect-video">
                          <img
                            src={selectedAward.image}
                            alt={`${selectedAward.title} - ${selectedAward.event}`}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Certificat</h4>
                        <div className="overflow-hidden rounded-2xl border border-white/5 aspect-video">
                          <img
                            src={selectedAward.certificate}
                            alt={`Certificat - ${selectedAward.title}`}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
