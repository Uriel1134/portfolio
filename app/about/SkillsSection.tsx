'use client';

const skills = [
  {
    category: "UI/UX Design",
    items: ["Design Thinking", "Prototypage", "Wireframing", "Tests Utilisateurs", "Design Systems", "Accessibilité"],
    color: "blue"
  },
  {
    category: "Développement",
    items: ["Flutter", "React", "JavaScript", "HTML/CSS", "Responsive Design", "Git"],
    color: "green"
  },
  {
    category: "Design Graphique",
    items: ["Identité Visuelle", "Branding", "Affiches", "Illustrations", "Print Design", "Typography"],
    color: "purple"
  }
];

const tools = [
  { name: "Figma", icon: "ri-palette-line", category: "Design" },
  { name: "Adobe Photoshop", icon: "ri-image-edit-line", category: "Design" },
  { name: "Adobe Illustrator", icon: "ri-pen-nib-line", category: "Design" },
  { name: "VS Code", icon: "ri-code-line", category: "Dev" },
  { name: "Flutter", icon: "ri-smartphone-line", category: "Dev" },
  { name: "Git", icon: "ri-git-branch-line", category: "Dev" }
];

export default function SkillsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"></div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
              Compétences & Expertise
            </h2>
            <div className="h-1 w-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"></div>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed">
            Une palette complète de compétences pour donner vie à vos projets
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {skills.map((skill, index) => (
            <div key={index} className="group p-8 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg">
                  <i className={`${skill.color === 'blue' ? 'ri-palette-line' : skill.color === 'green' ? 'ri-code-s-slash-line' : 'ri-brush-line'} text-lg`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{skill.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item, itemIndex) => (
                  <span
                    key={itemIndex}
                    className="px-3 py-2 bg-gray-50 text-gray-700 text-sm rounded-full border border-gray-200 hover:border-blue-300 hover:text-blue-700 transition-all duration-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-1 w-8 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"></div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Outils & Technologies
            </h3>
            <div className="h-1 w-8 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {tools.map((tool, index) => (
            <div key={index} className="group text-center p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-blue-200 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <i className={`${tool.icon} text-xl`}></i>
              </div>
              <h4 className="font-semibold text-gray-900 text-sm group-hover:text-blue-700 transition-colors duration-300">{tool.name}</h4>
              <p className="text-xs text-gray-500 mt-1">{tool.category}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}