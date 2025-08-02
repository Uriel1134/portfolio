'use client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BrandingHero from './BrandingHero';
import BrandingGrid from './BrandingGrid';

export default function BrandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <BrandingHero />
        <BrandingGrid />
      </main>
      <Footer />
    </div>
  );
}
