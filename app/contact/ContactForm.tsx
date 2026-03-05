'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    budget: '',
    message: '',
    services: [] as string[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const services = [
    'UI/UX Design',
    'Développement Web',
    'Développement Mobile',
    'Design Graphique',
    'Branding',
    'Consultation'
  ];

  const budgetRanges = [
    'Moins de 5000€',
    '5000€ - 15000€',
    '15000€ - 30000€',
    '30000€ - 50000€',
    'Plus de 50000€',
    'À discuter'
  ];

  const handleServiceChange = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.message.length > 500) {
      setSubmitStatus('Le message ne peut pas dépasser 500 caractères.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          subject: formData.subject,
          budget: formData.budget,
          message: formData.message,
          services: formData.services
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus(data.message || 'Message envoyé avec succès ! Je vous répondrai rapidement.');
        setFormData({
          name: '',
          email: '',
          company: '',
          subject: '',
          budget: '',
          message: '',
          services: []
        });
      } else {
        setSubmitStatus(data.error || 'Une erreur est survenue. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setSubmitStatus('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-black">
      <div className="max-w-2xl px-6 mx-auto lg:px-8">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#C9A84C]"></div>
            <h2 className="text-3xl font-bold text-white">
              Parlez-moi de votre projet
            </h2>
          </div>
          <p className="text-base text-gray-400 leading-relaxed">
            Plus vous me donnez de détails, mieux je pourrai vous accompagner dans la réussite de votre projet.
          </p>
        </div>

        <form id="contact-form" onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="block mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Nom complet *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 text-sm bg-white/5 border border-white/10 text-white rounded-xl focus:ring-1 focus:ring-[#C9A84C] focus:border-[#C9A84C] focus:outline-none transition-all"
                placeholder="Votre nom"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 text-sm bg-white/5 border border-white/10 text-white rounded-xl focus:ring-1 focus:ring-[#C9A84C] focus:border-[#C9A84C] focus:outline-none transition-all"
                placeholder="votre@email.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="company" className="block mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Entreprise
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              className="w-full px-4 py-3 text-sm bg-white/5 border border-white/10 text-white rounded-xl focus:ring-1 focus:ring-[#C9A84C] focus:border-[#C9A84C] focus:outline-none transition-all"
              placeholder="Nom de votre entreprise"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Sujet *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              value={formData.subject}
              onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
              className="w-full px-4 py-3 text-sm bg-white/5 border border-white/10 text-white rounded-xl focus:ring-1 focus:ring-[#C9A84C] focus:border-[#C9A84C] focus:outline-none transition-all"
              placeholder="En quelques mots, votre projet"
            />
          </div>

          <div>
            <label className="block mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Services souhaités
            </label>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {services.map((service) => (
                <label key={service} className="flex items-center space-x-2 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      name="services"
                      value={service}
                      checked={formData.services.includes(service)}
                      onChange={() => handleServiceChange(service)}
                      className="w-5 h-5 border-white/10 bg-white/5 rounded text-[#C9A84C] focus:ring-[#C9A84C] focus:ring-offset-black transition-all cursor-pointer"
                    />
                  </div>
                  <span className="text-xs text-gray-400 group-hover:text-white transition-colors">{service}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="budget" className="block mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Budget estimé
            </label>
            <div className="relative">
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                className="w-full px-4 py-3 pr-10 text-sm bg-white/5 border border-white/10 text-white rounded-xl appearance-none focus:ring-1 focus:ring-[#C9A84C] focus:border-[#C9A84C] focus:outline-none transition-all"
              >
                <option value="" className="bg-zinc-900">Sélectionnez une fourchette</option>
                {budgetRanges.map((range) => (
                  <option key={range} value={range} className="bg-zinc-900">{range}</option>
                ))}
              </select>
              <i className="absolute text-gray-500 transform -translate-y-1/2 ri-arrow-down-s-line right-4 top-1/2 pointer-events-none"></i>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              maxLength={500}
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              className="w-full px-4 py-3 text-sm bg-white/5 border border-white/10 text-white rounded-xl resize-none focus:ring-1 focus:ring-[#C9A84C] focus:border-[#C9A84C] focus:outline-none transition-all"
              placeholder="Décrivez votre projet, vos objectifs, vos contraintes..."
            />
            <div className="flex justify-end mt-2">
              <p className="text-[10px] text-gray-600 uppercase tracking-tighter">
                {formData.message.length}/500 caractères
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-8 py-4 bg-[#C9A84C] text-black font-bold rounded-xl hover:bg-[#b8973d] transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm uppercase tracking-widest"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <i className="mr-3 ri-loader-4-line animate-spin text-lg"></i>
                Envoi en cours...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <i className="mr-3 ri-send-plane-line text-lg"></i>
                Envoyer le message
              </span>
            )}
          </button>

          {submitStatus && (
            <div className={`p-4 rounded-xl text-center text-sm border ${submitStatus.includes('succès')
                ? 'bg-green-500/10 text-green-400 border-green-500/20'
                : 'bg-red-500/10 text-red-400 border-red-500/20'
              }`}>
              {submitStatus}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
