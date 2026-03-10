'use client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AboutHero from './AboutHero';
import SkillsSection from './SkillsSection';
import ExperienceSection from './ExperienceSection';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-32 lg:pt-12 bg-black">
        <AboutHero />
        <SkillsSection />
        <ExperienceSection />
      </main>
      <Footer />
    </div>
  );
}