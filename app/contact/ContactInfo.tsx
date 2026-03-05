'use client';
import { useCV } from '../../hooks/useCV';

export default function ContactInfo() {
  const { cv } = useCV();
  return (
    <section className="py-20 bg-zinc-950">
      <div className="max-w-2xl px-6 mx-auto lg:px-8">
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#C9A84C]"></div>
              <h2 className="text-3xl font-bold text-white">
                Restons Connectés
              </h2>
            </div>
            <p className="mb-8 text-base leading-relaxed text-gray-400">
              Je suis toujours ouvert aux nouvelles opportunités et collaborations.
              N&apos;hésitez pas à me contacter pour discuter de votre projet !
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center p-6 space-x-4 transition-all duration-300 bg-zinc-900 border border-white/10 rounded-xl hover:border-[#C9A84C]/30">
              <div className="flex items-center justify-center w-12 h-12 text-[#C9A84C] bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-xl">
                <i className="text-xl ri-map-pin-line"></i>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Localisation</h3>
                <p className="text-sm text-gray-400">Bénin, Afrique de l&apos;Ouest</p>
              </div>
            </div>

            <div className="flex items-center p-6 space-x-4 transition-all duration-300 bg-zinc-900 border border-white/10 rounded-xl hover:border-[#C9A84C]/30">
              <div className="flex items-center justify-center w-12 h-12 text-[#C9A84C] bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-xl">
                <i className="text-xl ri-time-line"></i>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Disponibilité</h3>
                <p className="text-sm text-gray-400">Lun - Ven, 9h - 18h GMT</p>
              </div>
            </div>

            <div className="flex items-center p-6 space-x-4 transition-all duration-300 bg-zinc-900 border border-white/10 rounded-xl hover:border-[#C9A84C]/30">
              <div className="flex items-center justify-center w-12 h-12 text-[#C9A84C] bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-xl">
                <i className="text-xl ri-chat-3-line"></i>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Réponse</h3>
                <p className="text-sm text-gray-400">Sous 24h en moyenne</p>
              </div>
            </div>
          </div>

          <div className="p-8 border bg-zinc-900 border-white/10 rounded-xl">
            <h3 className="mb-4 text-xl font-bold text-white">Mes Réseaux Sociaux</h3>
            <p className="mb-6 text-sm text-gray-400">
              Suivez-moi sur les réseaux pour découvrir mes derniers projets et partager sur le design et la tech !
            </p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {[
                { label: 'LinkedIn', icon: 'ri-linkedin-fill', href: 'www.linkedin.com/in/auriol-juliano-uriel-lissan-88913526b' },
                { label: 'GitHub', icon: 'ri-github-fill', href: 'https://github.com/Uriel1134' },
                { label: 'Dribbble', icon: 'ri-dribbble-fill', href: '#' },
                { label: 'WhatsApp', icon: 'ri-whatsapp-fill', href: 'https://wa.me/qr/PHWFBJ53IO4AA1' },
                { label: 'Facebook', icon: 'ri-facebook-fill', href: 'https://www.facebook.com/aurioljulianouriel.lissan' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex flex-col items-center justify-center p-3 transition-all duration-200 border bg-white/5 border-white/10 rounded-xl hover:bg-[#C9A84C]/10 hover:border-[#C9A84C]/30 group"
                >
                  <i className={`${social.icon} text-lg mb-1 text-gray-400 group-hover:text-[#C9A84C]`}></i>
                  <span className="text-[10px] font-medium text-gray-500 group-hover:text-[#C9A84C]">{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          {cv && (
            <div className="p-8 border bg-zinc-900 border-white/10 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 text-[#C9A84C] bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-lg">
                  <i className="text-lg ri-file-user-line"></i>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Télécharger mon CV
                </h3>
              </div>
              <p className="mb-6 text-sm leading-relaxed text-gray-400">
                Découvrez mon parcours complet, mes expériences et mes réalisations dans un document synthétique.
              </p>
              <a
                href={cv.path}
                download
                className="inline-flex items-center justify-center px-8 py-3 bg-[#C9A84C] text-black font-bold rounded-xl hover:bg-[#b8973d] transition-all duration-200 text-sm"
              >
                <i className="mr-3 ri-download-line font-black"></i>
                <span>Télécharger le CV</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
