'use client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AboutHero from './AboutHero';
import SkillsSection from './SkillsSection';
import ExperienceSection from './ExperienceSection';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <AboutHero />
        <SkillsSection />
        <ExperienceSection />
      </main>
      <Footer />
    </div>
  );
}