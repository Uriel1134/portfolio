'use client';
import { useCV } from '../../hooks/useCV';

export default function ContactInfo() {
  const { cv } = useCV();
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-2xl mx-auto px-6 lg:px-8">
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-8 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"></div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                Restons Connectés
              </h2>
            </div>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Je suis toujours ouvert aux nouvelles opportunités et collaborations.
              N'hésitez pas à me contacter pour discuter de votre projet !
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-300">
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl shadow-lg">
                <i className="ri-map-pin-line text-xl"></i>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Localisation</h3>
                <p className="text-gray-600">Bénin, Afrique de l'Ouest</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-green-200 transition-all duration-300">
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl shadow-lg">
                <i className="ri-time-line text-xl"></i>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Disponibilité</h3>
                <p className="text-gray-600">Lun - Ven, 9h - 18h GMT</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all duration-300">
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl shadow-lg">
                <i className="ri-chat-3-line text-xl"></i>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Réponse</h3>
                <p className="text-gray-600">Sous 24h en moyenne</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-xl text-white">
            <h3 className="text-xl font-bold mb-4">Mes Réseaux Sociaux</h3>
            <p className="text-blue-100 mb-6">
              Suivez-moi sur les réseaux pour découvrir mes derniers projets et partager sur le design et la tech !
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              <a
                href="#"
                className="flex items-center justify-center space-x-2 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
              >
                <i className="ri-linkedin-fill text-lg"></i>
                <span className="font-medium text-sm">LinkedIn</span>
              </a>

              <a
                href="#"
                className="flex items-center justify-center space-x-2 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
              >
                <i className="ri-github-fill text-lg"></i>
                <span className="font-medium text-sm">GitHub</span>
              </a>

              <a
                href="#"
                className="flex items-center justify-center space-x-2 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
              >
                <i className="ri-dribbble-fill text-lg"></i>
                <span className="font-medium text-sm">Dribbble</span>
              </a>

              <a
                href="#"
                className="flex items-center justify-center space-x-2 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
              >
                <i className="ri-whatsapp-fill text-lg"></i>
                <span className="font-medium text-sm">WhatsApp</span>
              </a>

              <a
                href="#"
                className="flex items-center justify-center space-x-2 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
              >
                <i className="ri-facebook-fill text-lg"></i>
                <span className="font-medium text-sm">Facebook</span>
              </a>
            </div>
          </div>

          {cv && (
            <div className="bg-gradient-to-br from-blue-50 to-violet-50 p-8 rounded-xl shadow-sm border border-blue-200/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg">
                  <i className="ri-file-user-line text-lg"></i>
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  Télécharger mon CV
                </h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Découvrez mon parcours complet, mes expériences et mes réalisations dans un document synthétique.
              </p>
              <a
                href={cv.path}
                download
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-violet-700 hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 whitespace-nowrap transform hover:-translate-y-0.5"
              >
                <i className="ri-download-line mr-3 group-hover:scale-110 transition-transform duration-300"></i>
                <span>Télécharger le CV</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}