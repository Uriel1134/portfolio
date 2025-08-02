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
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="space-y-16">
          {services.map((service, index) => (
            <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}>
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className={`w-16 h-16 flex items-center justify-center bg-${service.color}-600 text-white rounded-2xl mb-6`}>
                  <i className={`${service.icon} text-2xl`}></i>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  {service.description}
                </p>
                
                <div className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <div className={`w-2 h-2 bg-${service.color}-600 rounded-full`}></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button className={`inline-flex items-center px-6 py-3 bg-${service.color}-600 text-white font-semibold rounded-lg hover:bg-${service.color}-700 transition-colors whitespace-nowrap cursor-pointer`}>
                  En savoir plus
                  <i className="ri-arrow-right-line ml-2"></i>
                </button>
              </div>
              
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-80 object-cover rounded-2xl shadow-2xl"
                  />
                  <div className={`absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-${service.color}-400 to-${service.color}-600 rounded-full opacity-20 blur-xl`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}