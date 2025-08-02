'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Award, AWARD_ICONS, AWARD_GRADIENTS, AWARD_BORDER_COLORS, AWARD_BG_COLORS } from '../../types/admin';
import FileUpload from './FileUpload';

interface AwardFormProps {
  award?: Award;
  isEdit?: boolean;
}

export default function AwardForm({ award, isEdit = false }: AwardFormProps) {
  const [formData, setFormData] = useState({
    title: award?.title || '',
    event: award?.event || '',
    description: award?.description || '',
    date: award?.date || '',
    location: award?.location || '',
    image: award?.image || '',
    certificate: award?.certificate || '',
    icon: award?.icon || 'ri-award-line',
    gradient: award?.gradient || 'from-blue-400 to-purple-400',
    borderColor: award?.borderColor || 'border-blue-200',
    bgColor: award?.bgColor || 'bg-blue-50'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('admin-token');
      const url = isEdit ? `/api/admin/awards/${award?.id}` : '/api/admin/awards';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        router.push('/admin/awards');
      } else {
        setError(data.error || 'Erreur lors de la sauvegarde');
      }
    } catch (error) {
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  const colorCombinations = [
    {
      gradient: 'from-yellow-400 to-orange-400',
      borderColor: 'border-yellow-200',
      bgColor: 'bg-yellow-50',
      name: 'Or'
    },
    {
      gradient: 'from-blue-400 to-purple-400',
      borderColor: 'border-blue-200',
      bgColor: 'bg-blue-50',
      name: 'Bleu'
    },
    {
      gradient: 'from-green-400 to-teal-400',
      borderColor: 'border-green-200',
      bgColor: 'bg-green-50',
      name: 'Vert'
    },
    {
      gradient: 'from-red-400 to-pink-400',
      borderColor: 'border-red-200',
      bgColor: 'bg-red-50',
      name: 'Rouge'
    },
    {
      gradient: 'from-purple-400 to-indigo-400',
      borderColor: 'border-purple-200',
      bgColor: 'bg-purple-50',
      name: 'Violet'
    },
    {
      gradient: 'from-indigo-400 to-blue-400',
      borderColor: 'border-indigo-200',
      bgColor: 'bg-indigo-50',
      name: 'Indigo'
    }
  ];

  const handleColorChange = (combination: typeof colorCombinations[0]) => {
    setFormData(prev => ({
      ...prev,
      gradient: combination.gradient,
      borderColor: combination.borderColor,
      bgColor: combination.bgColor
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? 'Modifier la distinction' : 'Nouvelle distinction'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isEdit ? 'Modifiez les informations de la distinction' : 'Ajoutez une nouvelle récompense à votre portfolio'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              <i className="ri-error-warning-line mr-2"></i>
              {error}
            </div>
          )}

          {/* Informations de base */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Informations de base
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Titre de la distinction *
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: 1ère Place, Prix du Public, Finaliste"
                  required
                />
              </div>

              <div>
                <label htmlFor="event" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de l'événement *
                </label>
                <input
                  type="text"
                  id="event"
                  value={formData.event}
                  onChange={(e) => setFormData(prev => ({ ...prev, event: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Hackathon Innovation 2024"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description du projet primé *
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Description du projet ou de la solution qui a été primée"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                  Date *
                </label>
                <input
                  type="text"
                  id="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Décembre 2024"
                  required
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Lieu *
                </label>
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Cotonou, Bénin"
                  required
                />
              </div>
            </div>
          </div>

          {/* Apparence */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Apparence
            </h2>

            {/* Icône */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Icône *
              </label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {AWARD_ICONS.map((icon) => (
                  <label key={icon} className="cursor-pointer">
                    <input
                      type="radio"
                      name="icon"
                      value={icon}
                      checked={formData.icon === icon}
                      onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                      className="sr-only"
                    />
                    <div className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                      formData.icon === icon 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <i className={`${icon} text-xl ${formData.icon === icon ? 'text-blue-600' : 'text-gray-600'}`}></i>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Couleurs */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Couleurs *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {colorCombinations.map((combination, index) => (
                  <label key={index} className="cursor-pointer">
                    <input
                      type="radio"
                      name="colors"
                      checked={formData.gradient === combination.gradient}
                      onChange={() => handleColorChange(combination)}
                      className="sr-only"
                    />
                    <div className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      formData.gradient === combination.gradient 
                        ? 'border-blue-500' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 bg-gradient-to-r ${combination.gradient} rounded-full`}></div>
                        <span className="text-sm font-medium text-gray-700">{combination.name}</span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Aperçu */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Aperçu
              </label>
              <div className={`inline-flex items-center gap-3 p-4 rounded-lg border ${formData.borderColor} ${formData.bgColor}`}>
                <div className={`w-12 h-12 bg-gradient-to-r ${formData.gradient} rounded-full flex items-center justify-center`}>
                  <i className={`${formData.icon} text-xl text-white`}></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{formData.title || 'Titre de la distinction'}</h3>
                  <p className="text-sm text-gray-600">{formData.event || 'Nom de l\'événement'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Médias */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Médias
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FileUpload
                label="Photo du prix/trophée"
                folder="awards"
                currentImage={formData.image}
                onFileSelect={(file, url) => {
                  setFormData(prev => ({ ...prev, image: url }));
                }}
              />

              <FileUpload
                label="Certificat (format 16:9)"
                folder="certificates"
                currentImage={formData.certificate}
                onFileSelect={(file, url) => {
                  setFormData(prev => ({ ...prev, certificate: url }));
                }}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Sauvegarde...
                </>
              ) : (
                <>
                  <i className="ri-save-line"></i>
                  {isEdit ? 'Mettre à jour' : 'Créer la distinction'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
