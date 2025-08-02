'use client';
import Link from 'next/link';

export default function ExperienceSection() {
  const values = [
    {
      title: "Centré Utilisateur",
      description: "Chaque décision de design est guidée par les besoins réels des utilisateurs.",
      icon: "ri-user-heart-line"
    },
    {
      title: "Innovation Durable",
      description: "Créer des solutions qui perdurent et s'adaptent aux évolutions futures.",
      icon: "ri-leaf-line"
    },
    {
      title: "Excellence Créative",
      description: "Allier esthétique raffinée et fonctionnalité optimale dans chaque création.",
      icon: "ri-star-line"
    },
    {
      title: "Collaboration",
      description: "Travailler en étroite collaboration pour co-créer des expériences exceptionnelles.",
      icon: "ri-team-line"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-1 w-8 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"></div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                  Ma Vision & Mes Valeurs
                </h2>
              </div>
            </div>
            
            <div className="space-y-8">
              {values.map((value, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl flex-shrink-0 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
                    <i className={`${value.icon} text-xl`}></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Mon Parcours
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Passionné par le design et la technologie depuis mes débuts, j'ai développé 
                une expertise multidisciplinaire qui me permet d'aborder chaque projet avec 
                une vision holistique. De la conception d'interfaces utilisateur au développement 
                d'applications mobiles, en passant par la création d'identités visuelles, 
                chaque expérience enrichit ma capacité à créer des solutions innovantes.
              </p>
              <p className="text-gray-600 mb-6">
                Basé au Bénin, je puise dans la richesse culturelle africaine pour apporter 
                une perspective unique à mes créations, tout en restant connecté aux tendances 
                globales du design et de la technologie.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/projects"
                  className="group inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-violet-700 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 whitespace-nowrap transform hover:-translate-y-0.5"
                >
                  <span>Voir mes projets</span>
                  <i className="ri-arrow-right-line ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                </Link>
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center px-6 py-3 bg-white/90 backdrop-blur-sm border-2 border-violet-300 text-violet-700 font-bold rounded-xl hover:bg-violet-50 hover:border-violet-400 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300 whitespace-nowrap transform hover:-translate-y-0.5"
                >
                  <i className="ri-chat-3-line mr-2 group-hover:scale-110 transition-transform duration-300"></i>
                  <span>Me contacter</span>
                </Link>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-xl text-white">
              <h3 className="text-xl font-bold mb-4">Prêt à collaborer ?</h3>
              <p className="mb-4">
                Que vous ayez un projet en tête ou simplement envie d'échanger sur le design et la tech, 
                je serais ravi de discuter avec vous.
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center text-white hover:text-blue-200 font-medium cursor-pointer whitespace-nowrap"
              >
                Démarrons la conversation
                <i className="ri-chat-3-line ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}