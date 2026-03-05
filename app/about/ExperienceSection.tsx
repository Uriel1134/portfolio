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
    <section className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-[#C9A84C]"></div>
                <h2 className="text-3xl font-bold text-white">Ma Vision &amp; Mes Valeurs</h2>
              </div>
            </div>

            <div className="space-y-6">
              {values.map((value, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#C9A84C]/10 text-[#C9A84C] rounded-xl flex-shrink-0 border border-[#C9A84C]/20">
                    <i className={`${value.icon} text-lg`}></i>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1">{value.title}</h3>
                    <p className="text-sm text-gray-400">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-zinc-900 p-8 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Mon Parcours</h3>
              <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                Passionné par le design et la technologie depuis mes débuts, j&apos;ai développé
                une expertise multidisciplinaire qui me permet d&apos;aborder chaque projet avec
                une vision holistique.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Basé au Bénin, je puise dans la richesse culturelle africaine pour apporter
                une perspective unique à mes créations.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#C9A84C] text-black font-semibold rounded-xl hover:bg-[#b8973d] transition-all duration-200 text-sm"
                >
                  Voir mes projets
                  <i className="ri-arrow-right-line"></i>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-transparent border border-white/20 text-white font-semibold rounded-xl hover:border-[#C9A84C]/50 hover:text-[#C9A84C] transition-all duration-200 text-sm"
                >
                  <i className="ri-chat-3-line"></i>
                  Me contacter
                </Link>
              </div>
            </div>

            <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/30 p-8 rounded-xl">
              <h3 className="text-base font-bold text-white mb-3">Prêt à collaborer ?</h3>
              <p className="text-sm text-gray-400 mb-4">
                Que vous ayez un projet en tête ou simplement envie d&apos;échanger sur le design et la tech,
                je serais ravi de discuter avec vous.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center text-[#C9A84C] font-semibold text-sm"
              >
                Démarrons la conversation
                <i className="ri-arrow-right-line ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}