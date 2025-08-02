'use client';
import { useCV } from '../../hooks/useCV';

export default function ContactInfo() {
  const { cv } = useCV();
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-2xl px-6 mx-auto lg:px-8">
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-1 rounded-full bg-gradient-to-r from-blue-500 to-violet-500"></div>
              <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text">
                Restons Connectés
              </h2>
            </div>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              Je suis toujours ouvert aux nouvelles opportunités et collaborations.
              N'hésitez pas à me contacter pour discuter de votre projet !
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center p-6 space-x-4 transition-all duration-300 bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md hover:border-blue-200">
              <div className="flex items-center justify-center w-12 h-12 text-white shadow-lg bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl">
                <i className="text-xl ri-map-pin-line"></i>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Localisation</h3>
                <p className="text-gray-600">Bénin, Afrique de l'Ouest</p>
              </div>
            </div>

            <div className="flex items-center p-6 space-x-4 transition-all duration-300 bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md hover:border-green-200">
              <div className="flex items-center justify-center w-12 h-12 text-white shadow-lg bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl">
                <i className="text-xl ri-time-line"></i>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Disponibilité</h3>
                <p className="text-gray-600">Lun - Ven, 9h - 18h GMT</p>
              </div>
            </div>

            <div className="flex items-center p-6 space-x-4 transition-all duration-300 bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md hover:border-purple-200">
              <div className="flex items-center justify-center w-12 h-12 text-white shadow-lg bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl">
                <i className="text-xl ri-chat-3-line"></i>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Réponse</h3>
                <p className="text-gray-600">Sous 24h en moyenne</p>
              </div>
            </div>
          </div>

          <div className="p-8 text-white bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
            <h3 className="mb-4 text-xl font-bold">Mes Réseaux Sociaux</h3>
            <p className="mb-6 text-blue-100">
              Suivez-moi sur les réseaux pour découvrir mes derniers projets et partager sur le design et la tech !
            </p>
            
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              <a
                href="www.linkedin.com/in/auriol-juliano-uriel-lissan-88913526b"
                className="flex items-center justify-center p-3 space-x-2 transition-colors rounded-lg cursor-pointer bg-white/10 hover:bg-white/20"
              >
                <i className="text-lg ri-linkedin-fill"></i>
                <span className="text-sm font-medium">LinkedIn</span>
              </a>

              <a
                href="https://github.com/Uriel1134"
                className="flex items-center justify-center p-3 space-x-2 transition-colors rounded-lg cursor-pointer bg-white/10 hover:bg-white/20"
              >
                <i className="text-lg ri-github-fill"></i>
                <span className="text-sm font-medium">GitHub</span>
              </a>

              <a
                href="#"
                className="flex items-center justify-center p-3 space-x-2 transition-colors rounded-lg cursor-pointer bg-white/10 hover:bg-white/20"
              >
                <i className="text-lg ri-dribbble-fill"></i>
                <span className="text-sm font-medium">Dribbble</span>
              </a>

              <a
                href="https://wa.me/qr/PHWFBJ53IO4AA1"
                className="flex items-center justify-center p-3 space-x-2 transition-colors rounded-lg cursor-pointer bg-white/10 hover:bg-white/20"
              >
                <i className="text-lg ri-whatsapp-fill"></i>
                <span className="text-sm font-medium">WhatsApp</span>
              </a>

              <a
                href="https://www.facebook.com/aurioljulianouriel.lissan"
                className="flex items-center justify-center p-3 space-x-2 transition-colors rounded-lg cursor-pointer bg-white/10 hover:bg-white/20"
              >
                <i className="text-lg ri-facebook-fill"></i>
                <span className="text-sm font-medium">Facebook</span>
              </a>
            </div>
          </div>

          {cv && (
            <div className="p-8 border shadow-sm bg-gradient-to-br from-blue-50 to-violet-50 rounded-xl border-blue-200/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 text-white rounded-lg bg-gradient-to-r from-blue-600 to-violet-600">
                  <i className="text-lg ri-file-user-line"></i>
                </div>
                <h3 className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text">
                  Télécharger mon CV
                </h3>
              </div>
              <p className="mb-6 leading-relaxed text-gray-600">
                Découvrez mon parcours complet, mes expériences et mes réalisations dans un document synthétique.
              </p>
              <a
                href={cv.path}
                download
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-violet-700 hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 whitespace-nowrap transform hover:-translate-y-0.5"
              >
                <i className="mr-3 transition-transform duration-300 ri-download-line group-hover:scale-110"></i>
                <span>Télécharger le CV</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}