'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from './HeroSection';
import FeaturedWork from './FeaturedWork';
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
      <div className="min-h-screen">
        <Header />
        <main>
          <HeroSection />
          <FeaturedWork />
          
          {/* Section distinctions avec chargement */}
          <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="max-w-6xl px-6 mx-auto lg:px-8">
              <div className="mb-16 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-yellow-800 border border-yellow-300 rounded-full bg-gradient-to-r from-yellow-100 to-orange-100">
                  <i className="text-yellow-600 ri-trophy-line"></i>
                  Distinctions & Récompenses
                </div>
                <h2 className="mb-4 text-4xl font-bold text-gray-900">
                  Reconnu dans les <span className="text-blue-600">Hackathons</span>
                </h2>
                <p className="max-w-2xl mx-auto text-xl text-gray-600">
                  Mes performances dans les compétitions technologiques témoignent de ma capacité à innover sous pression
                </p>
              </div>
              
              <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturedWork />

        {/* Distinctions Section améliorée */}
        <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-6xl px-6 mx-auto lg:px-8">
            <div className="mb-16 text-center">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-1 rounded-full bg-gradient-to-r from-blue-500 to-violet-500"></div>
                <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text">
                  Reconnu dans les Hackathons
                </h2>
                <div className="w-12 h-1 rounded-full bg-gradient-to-r from-violet-500 to-purple-500"></div>
              </div>
              <p className="max-w-2xl mx-auto text-xl text-gray-600">
                Mes performances dans les compétitions technologiques témoignent de ma capacité à innover sous pression
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {awards.map((award) => (
                <div 
                  key={award.id}
                  className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 border ${award.borderColor} cursor-pointer transform hover:-translate-y-2 group`}
                  onClick={() => setSelectedAward(award)}
                >
                  {/* Image du prix/trophée */}
                  <div className="relative mb-6 overflow-hidden aspect-video rounded-xl">
                    <img
                      src={award.image}
                      alt={`${award.title} - ${award.event}`}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        // Fallback vers l'icône si l'image n'existe pas
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    {/* Fallback icon */}
                    <div className={`hidden w-full h-full bg-gradient-to-r ${award.gradient} rounded-xl flex items-center justify-center`}>
                      <i className={`${award.icon} text-6xl text-white`}></i>
                    </div>
                    
                    {/* Overlay avec bouton voir */}
                    <div className="absolute inset-0 flex items-end justify-center pb-4 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:opacity-100">
                      <button 
                        type="button"
                        className="px-4 py-2 font-medium text-gray-800 transition-colors duration-300 rounded-lg bg-white/90 backdrop-blur-sm hover:bg-white"
                      >
                        Voir les détails
                      </button>
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 bg-gradient-to-r ${award.gradient} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <i className={`${award.icon} text-xl text-white`}></i>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-700">{award.title}</h3>
                        <p className="text-sm text-gray-500">{award.date}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="font-medium text-gray-700">{award.event}</p>
                      <p className="text-sm text-gray-600">{award.description}</p>
                      <p className="flex items-center gap-1 text-xs text-gray-500">
                        <i className="ri-map-pin-line"></i>
                        {award.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal pour afficher les détails du prix */}
            {selectedAward && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedAward(null)}>
                <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
                  <div className="relative">
                    {/* Header */}
                    <div className={`${selectedAward.bgColor} p-6 border-b border-gray-100`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-16 h-16 bg-gradient-to-r ${selectedAward.gradient} rounded-full flex items-center justify-center`}>
                            <i className={`${selectedAward.icon} text-2xl text-white`}></i>
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold text-gray-900 lg:text-3xl">{selectedAward.title}</h2>
                            <p className="text-gray-600">{selectedAward.event}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedAward(null)}
                          className="flex items-center justify-center w-10 h-10 transition-all duration-300 bg-white rounded-full shadow-md hover:bg-red-50 hover:shadow-lg group"
                          title="Fermer"
                          aria-label="Fermer le modal"
                        >
                          <i className="text-lg text-gray-600 transition-colors duration-300 ri-close-line group-hover:text-red-600"></i>
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <i className="text-gray-500 ri-calendar-line"></i>
                          <span className="text-gray-700">{selectedAward.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <i className="text-gray-500 ri-map-pin-line"></i>
                          <span className="text-gray-700">{selectedAward.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Contenu */}
                    <div className="p-6">
                      <div className="mb-6">
                        <h3 className="mb-2 text-lg font-semibold text-gray-900">Description</h3>
                        <p className="leading-relaxed text-gray-600">{selectedAward.description}</p>
                      </div>

                      {/* Images - Photo du prix et certificat */}
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Photo du prix/trophée */}
                        <div className="space-y-3">
                          <h4 className="font-medium text-gray-900">Photo du prix</h4>
                          <div className="overflow-hidden shadow-lg aspect-video rounded-xl">
                            <img
                              src={selectedAward.image}
                              alt={`${selectedAward.title} - ${selectedAward.event}`}
                              className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                            />
                          </div>
                        </div>

                        {/* Certificat */}
                        <div className="space-y-3">
                          <h4 className="font-medium text-gray-900">Certificat</h4>
                          <div className="overflow-hidden shadow-lg aspect-video rounded-xl">
                            <img
                              src={selectedAward.certificate}
                              alt={`Certificat - ${selectedAward.title}`}
                              className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                            />
                          </div>
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
