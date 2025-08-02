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
    <section className="py-24 bg-white">
      <div className="max-w-2xl px-6 mx-auto lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-8 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"></div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
              Parlez-moi de votre projet
            </h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Plus vous me donnez de détails, mieux je pourrai vous accompagner dans la réussite de votre projet.
          </p>
        </div>

        <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-semibold text-gray-700">
                Nom complet *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Votre nom"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-700">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="votre@email.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="company" className="block mb-2 text-sm font-semibold text-gray-700">
              Entreprise
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={(e) => setFormData(prev => ({...prev, company: e.target.value}))}
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nom de votre entreprise"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block mb-2 text-sm font-semibold text-gray-700">
              Sujet *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              value={formData.subject}
              onChange={(e) => setFormData(prev => ({...prev, subject: e.target.value}))}
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="En quelques mots, votre projet"
            />
          </div>

          <div>
            <label className="block mb-3 text-sm font-semibold text-gray-700">
              Services souhaités
            </label>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {services.map((service) => (
                <label key={service} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="services"
                    value={service}
                    checked={formData.services.includes(service)}
                    onChange={() => handleServiceChange(service)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{service}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="budget" className="block mb-2 text-sm font-semibold text-gray-700">
              Budget estimé
            </label>
            <div className="relative">
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={(e) => setFormData(prev => ({...prev, budget: e.target.value}))}
                className="w-full px-4 py-3 pr-8 text-sm bg-white border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Sélectionnez une fourchette</option>
                {budgetRanges.map((range) => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
              <i className="absolute text-gray-400 transform -translate-y-1/2 ri-arrow-down-s-line right-3 top-1/2"></i>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block mb-2 text-sm font-semibold text-gray-700">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              maxLength={500}
              value={formData.message}
              onChange={(e) => setFormData(prev => ({...prev, message: e.target.value}))}
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Décrivez votre projet, vos objectifs, vos contraintes..."
            />
            <p className="mt-1 text-xs text-gray-500">
              {formData.message.length}/500 caractères
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-violet-700 hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <i className="mr-3 ri-loader-4-line animate-spin text-lg"></i>
                Envoi en cours...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <i className="mr-3 ri-send-plane-line text-lg group-hover:translate-x-1 transition-transform duration-300"></i>
                Envoyer le message
              </span>
            )}
          </button>

          {submitStatus && (
            <div className={`p-4 rounded-lg ${
              submitStatus.includes('succès') 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {submitStatus}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}