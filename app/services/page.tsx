'use client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ServicesHero from './ServicesHero';
import ServicesGrid from './ServicesGrid';
import ProcessSection from './ProcessSection';

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <ServicesHero />
        <ServicesGrid />
        <ProcessSection />
      </main>
      <Footer />
    </div>
  );
}