'use client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ContactHero from './ContactHero';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <ContactHero />
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          <ContactForm />
          <ContactInfo />
        </div>
      </main>
      <Footer />
    </div>
  );
}