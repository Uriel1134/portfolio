'use client';

const services = [
  {
    title: "Design UI/UX",
    description: "Conception d'interfaces utilisateur intuitives et d'expériences engageantes",
    features: [
      "Recherche utilisateur & personas",
      "Wireframes & prototypes",
      "Design d'interface moderne",
      "Tests d'utilisabilité",
      "Design system & guidelines",
      "Optimisation mobile-first"
    ],
    image: "https://readdy.ai/api/search-image?query=Modern%20UI%2FUX%20design%20workspace%20with%20Figma%20interface%2C%20wireframes%20and%20prototypes%20on%20screen%2C%20clean%20desk%20setup%20with%20design%20tools%2C%20contemporary%20workspace%20for%20digital%20designer%2C%20professional%20design%20environment&width=600&height=400&seq=uiux-service&orientation=landscape",
    color: "blue",
    icon: "ri-palette-line"
  },
  {
    title: "Développement Front-End",
    description: "Développement d'applications web et mobile performantes et élégantes",
    features: [
      "Applications React & Vue.js",
      "Développement mobile Flutter",
      "Sites web responsive",
      "Optimisation performances",
      "Intégrations API",
      "Maintenance & support"
    ],
    image: "https://readdy.ai/api/search-image?query=Modern%20web%20development%20setup%20with%20code%20editor%2C%20multiple%20screens%20showing%20React%20and%20Flutter%20development%2C%20clean%20coding%20workspace%2C%20professional%20developer%20environment%2C%20contemporary%20tech%20setup&width=600&height=400&seq=dev-service&orientation=landscape",
    color: "green",
    icon: "ri-code-line"
  },
  {
    title: "Design Graphique",
    description: "Création d'identités visuelles fortes et de supports de communication impactants",
    features: [
      "Identité visuelle & branding",
      "Logo & charte graphique",
      "Affiches & supports print",
      "Illustrations personnalisées",
      "Packaging & merchandising",
      "Communications digitales"
    ],
    image: "https://readdy.ai/api/search-image?query=Professional%20graphic%20design%20workspace%20with%20Adobe%20Creative%20Suite%2C%20brand%20identity%20projects%2C%20logo%20designs%20on%20screen%2C%20print%20materials%20and%20color%20palettes%2C%20creative%20design%20studio%20environment&width=600&height=400&seq=graphic-service&orientation=landscape",
    color: "purple",
    icon: "ri-image-line"
  }
];

export default function ServicesGrid() {
  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="space-y-24">
          {services.map((service, index) => (
            <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}>
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="w-14 h-14 flex items-center justify-center bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/20 rounded-xl mb-6">
                  <i className={`${service.icon} text-2xl`}></i>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  {service.title}
                </h2>
                <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full"></div>
                      <span className="text-gray-400 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="inline-flex items-center px-6 py-3 bg-transparent border border-white/20 text-white font-semibold rounded-xl hover:border-[#C9A84C]/60 hover:text-[#C9A84C] transition-all duration-200 text-sm uppercase tracking-wider">
                  En savoir plus
                  <i className="ri-arrow-right-line ml-3"></i>
                </button>
              </div>

              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-[#C9A84C]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="relative w-full h-80 object-cover rounded-2xl border border-white/10"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
