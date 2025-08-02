
'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Arrière-plan avec couleurs plus vives */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-20 -left-40 w-80 h-80 bg-gradient-to-r from-blue-200/40 to-violet-200/40 rounded-full blur-3xl animate-pulse [animation-duration:4s]"></div>
        <div className="absolute bottom-20 -right-40 w-96 h-96 bg-gradient-to-l from-purple-200/40 to-pink-200/40 rounded-full blur-3xl animate-pulse [animation-duration:6s] [animation-delay:2s]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-indigo-100/30 to-cyan-100/30 rounded-full blur-3xl animate-pulse [animation-duration:8s] [animation-delay:1s]"></div>
        
        {/* Grille avec accent coloré */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:80px_80px] opacity-60"></div>
      </div>

      <div className="relative px-6 pt-20 mx-auto max-w-7xl lg:px-12 lg:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center min-h-[calc(100vh-8rem)]">
          
          <div className="space-y-8 text-left lg:col-span-7 lg:space-y-12">
            
            {/* Badge status avec couleur vibrante */}
            {/* <div className="inline-flex items-center px-4 py-2.5 bg-white/90 backdrop-blur-sm border border-blue-200/60 rounded-full shadow-lg hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 group">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-2.5 h-2.5 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full"></div>
                  <div className="absolute inset-0 w-2.5 h-2.5 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full animate-ping"></div>
                </div>
                <span className="text-sm font-semibold text-gray-800">Disponible pour collaborer</span>
              </div>
            </div> */}

            {/* Titre avec dégradé coloré prononcé */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[0.9] tracking-tight">
                <span className="block text-gray-900">Design &</span>
                <span className="block text-transparent bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text">
                  Innovation
                </span>
              </h1>
              
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="w-12 h-1 rounded-full bg-gradient-to-r from-blue-500 to-violet-500"></div>
                <p className="text-lg font-medium text-gray-600 lg:text-xl">Créateur d'expériences digitales</p>
              </div>
            </div>

            <p className="max-w-2xl text-lg font-light leading-relaxed text-gray-600 lg:text-xl">
              Je transforme vos idées en réalités digitales exceptionnelles. 
              <span className="font-semibold text-transparent bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text"> Passionné par l'innovation</span> et 
              <span className="font-semibold text-transparent bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text"> centré sur l'expérience utilisateur</span>.
            </p>

            {/* Compétences avec design épuré */}
            <div className="flex flex-wrap gap-3">
              {[
                { skill: 'UI/UX Design', icon: 'ri-palette-line' },
                { skill: 'Développement', icon: 'ri-code-s-slash-line' },
                { skill: 'Mobile Apps', icon: 'ri-smartphone-line' },
                { skill: 'Branding', icon: 'ri-brush-line' }
              ].map(({ skill, icon }, index) => (
                <div
                  key={skill}
                  className="group px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-gray-200/60 text-gray-700 rounded-xl font-semibold text-sm shadow-sm hover:shadow-md hover:border-blue-300/60 hover:text-blue-700 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-center gap-2">
                    <i className={`${icon} group-hover:scale-110 transition-transform duration-300`} aria-hidden="true"></i>
                    {skill}
                  </div>
                </div>
              ))}
            </div>

            {/* Boutons CTA avec couleurs attractives */}
            <div className="flex flex-col gap-4 pt-6 sm:flex-row">
              <Link 
                href="/projects" 
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-violet-700 hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 whitespace-nowrap transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span>Découvrir mes créations</span>
                <i className="ml-3 transition-transform duration-300 ri-arrow-right-line group-hover:translate-x-1" aria-hidden="true"></i>
              </Link>
              <Link 
                href="/contact" 
                className="group inline-flex items-center justify-center px-8 py-4 bg-white/90 backdrop-blur-sm border-2 border-violet-300 text-violet-700 font-bold rounded-xl hover:bg-violet-50 hover:border-violet-400 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300 whitespace-nowrap transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
              >
                <i className="mr-3 transition-transform duration-300 ri-chat-3-line group-hover:scale-110" aria-hidden="true"></i>
                <span>Démarrons un projet</span>
              </Link>
            </div>

            {/* Statistiques avec accents colorés */}
            <div className="flex items-center gap-6 pt-4 lg:gap-8">
              {[
                { number: '50+', label: 'Projets réalisés', color: 'text-blue-600' },
                { number: '3+', label: 'Années d\'expérience', color: 'text-violet-600' },
                { number: '100%', label: 'Satisfaction client', color: 'text-purple-600' }
              ].map(({ number, label, color }, index) => (
                <div key={label} className="relative text-center">
                  <div className={`text-xl lg:text-2xl font-black ${color}`}>{number}</div>
                  <div className="mb-10 text-xs font-medium text-gray-600 lg:text-sm">{label}</div>
                  {index < 2 && <div className="absolute hidden w-px h-8 ml-6 -mt-6 sm:block bg-gradient-to-b from-blue-300 to-violet-300 lg:ml-8"></div>}
                </div>
              ))}
            </div>
          </div>

          {/* Photo de profil avec effets colorés */}
          <div className="relative order-first lg:col-span-5 lg:order-last">
            <div className="relative max-w-md mx-auto lg:max-w-lg">
              
              {/* Effets d'arrière-plan colorés */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 lg:w-96 h-80 lg:h-96 bg-gradient-to-br from-blue-200/30 via-violet-200/40 to-purple-200/30 rounded-full -z-10 blur-3xl animate-pulse [animation-duration:5s]"></div>
              
              <div className="aspect-[4/5] relative flex items-end justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/hero/profile-photo.png"
                    alt="Auriol Uriel Lissan - Designer & Développeur"
                    fill
                    className="object-contain object-bottom transition-all duration-500 transform filter drop-shadow-2xl hover:drop-shadow-3xl hover:scale-105"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  />
                  
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-blue-50/5 via-transparent to-transparent"></div>
                </div>
              </div>

              {/* Badge nom avec gradient */}
              <div className="absolute z-10 transform -translate-x-1/2 -bottom-6 left-1/2">
                <div className="bg-white/95 backdrop-blur-lg px-6 py-3 rounded-2xl shadow-xl border border-blue-200/60 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 w-[270px] sm:w-[320px] md:w-[370px]">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-green-500"></div>
                      <div className="absolute inset-0 w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 animate-ping"></div>
                    </div>
                    <div className="text-center">
                      <div className="text-base font-black text-gray-900 lg:text-lg">Noukpo Auriol Juliano U. LISSAN</div>
                      <div className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent text-sm font-medium -mt-0.5">Creative Developer</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Éléments décoratifs colorés */}
              <div className="absolute top-1/4 -right-8 w-16 h-16 bg-gradient-to-br from-blue-300/40 to-violet-300/30 rounded-full blur-xl animate-bounce [animation-duration:3s] [animation-delay:1s]"></div>
              <div className="absolute bottom-1/3 -left-8 w-20 h-20 bg-gradient-to-tl from-purple-200/50 to-pink-200/40 rounded-full blur-2xl animate-bounce [animation-duration:4s] [animation-delay:2s]"></div>
            </div>
          </div>
        </div>

        {/* Indicateur de défilement avec couleur */}
        // <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce [animation-duration:2s]">
        //   <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-blue-600 uppercase">
        //     <span>Découvrir</span>
        //   </div>
        //   <div className="flex justify-center w-5 h-8 overflow-hidden border-2 border-blue-300 rounded-full">
        //     <div className="w-0.5 h-2 bg-gradient-to-b from-blue-500 to-violet-500 rounded-full mt-1.5 animate-bounce [animation-duration:1.5s]"></div>
        //   </div>
        // </div>
      </div>
    </section>
  );
}


