'use client';
import SectionTitle from '@/components/ui/SectionTitle';

const skills = [
  {
    category: "UI/UX Design",
    items: ["Design Thinking", "Prototypage", "Wireframing", "Tests Utilisateurs", "Design Systems", "Accessibilité"],
    icon: "ri-palette-line"
  },
  {
    category: "Développement",
    items: ["Flutter", "React", "JavaScript", "HTML/CSS", "Responsive Design", "Git"],
    icon: "ri-code-s-slash-line"
  },
  {
    category: "Design Graphique",
    items: ["Identité Visuelle", "Branding", "Affiches", "Illustrations", "Print Design", "Typography"],
    icon: "ri-brush-line"
  }
];

const tools = [
  { name: "Figma", icon: "ri-palette-line", category: "Design" },
  { name: "Adobe Photoshop", icon: "ri-image-edit-line", category: "Design" },
  { name: "Adobe Illustrator", icon: "ri-pen-nib-line", category: "Design" },
  { name: "VS Code", icon: "ri-code-line", category: "Dev" },
  { name: "Flutter", icon: "ri-smartphone-line", category: "Dev" },
  { name: "Git", icon: "ri-git-branch-line", category: "Dev" },
];

export default function SkillsSection() {
  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <SectionTitle
            title="Compétences & Expertise"
            ghostText="EXPERTISE"
            align="center"
          />
          <p className="text-base text-gray-400 -mt-8">Une palette complète de compétences pour donner vie à vos projets</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {skills.map((skill, index) => (
            <div key={index} className="p-6 rounded-xl bg-zinc-900 border border-white/10 hover:border-[#C9A84C]/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 flex items-center justify-center bg-[#C9A84C]/10 text-[#C9A84C] rounded-lg border border-[#C9A84C]/20">
                  <i className={`${skill.icon} text-base`}></i>
                </div>
                <h3 className="text-base font-bold text-white">{skill.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item, itemIndex) => (
                  <span
                    key={itemIndex}
                    className="px-3 py-1.5 bg-white/5 text-gray-400 text-xs rounded-lg border border-white/10"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-px w-8 bg-[#C9A84C]"></div>
            <h3 className="text-xl font-bold text-white">Outils &amp; Technologies</h3>
            <div className="h-px w-8 bg-[#C9A84C]"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {tools.map((tool, index) => (
            <div key={index} className="group text-center p-5 bg-zinc-900 border border-white/10 rounded-xl hover:border-[#C9A84C]/30 transition-all duration-300 hover:-translate-y-0.5">
              <div className="w-10 h-10 flex items-center justify-center bg-[#C9A84C]/10 text-[#C9A84C] rounded-lg mx-auto mb-3">
                <i className={`${tool.icon} text-lg`}></i>
              </div>
              <h4 className="font-semibold text-white text-xs">{tool.name}</h4>
              <p className="text-xs text-gray-600 mt-0.5">{tool.category}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}