'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Project, PROJECT_CATEGORIES, COMMON_TECHNOLOGIES, GRAPHIC_TECHNOLOGIES } from '../../types/admin';
import FileUpload from './FileUpload';
import MultipleFileUpload from './MultipleFileUpload';

interface ProjectFormProps {
  project?: Project;
  isEdit?: boolean;
}

export default function ProjectForm({ project, isEdit = false }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    longDescription: project?.longDescription || '',
    category: project?.category || [],
    tech: project?.tech || [],
    year: project?.year || new Date().getFullYear().toString(),
    figmaLink: project?.figmaLink || '',
    githubLink: project?.githubLink || '',
    image: project?.image || '',
    images: project?.images || [],
    companyName: project?.companyName || ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [customTech, setCustomTech] = useState('');
  const router = useRouter();

  // Détermine si c'est un projet graphique
  const isGraphicProject = formData.category.some(cat =>
    ['Création Graphique', 'Branding', 'Art Digital'].includes(cat)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('admin-token');
      const url = isEdit ? `/api/admin/projects/${project?.id}` : '/api/admin/projects';
      const method = isEdit ? 'PUT' : 'POST';

      // Pour les projets graphiques, on génère des descriptions automatiques
      const submitData = {
        ...formData,
        description: isGraphicProject && !formData.description
          ? `Création graphique - ${formData.title}`
          : formData.description,
        longDescription: isGraphicProject
          ? `Création graphique réalisée en ${formData.year}. Outils utilisés: ${formData.tech.join(', ')}.`
          : formData.longDescription
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (data.success) {
        router.push('/admin/projects');
      } else {
        setError(data.error || 'Erreur lors de la sauvegarde');
      }
    } catch (error) {
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category: string) => {
    setFormData(prev => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter(c => c !== category)
        : [...prev.category, category]
    }));
  };

  const handleTechChange = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      tech: prev.tech.includes(tech)
        ? prev.tech.filter(t => t !== tech)
        : [...prev.tech, tech]
    }));
  };

  const addCustomTech = () => {
    if (customTech.trim() && !formData.tech.includes(customTech.trim())) {
      setFormData(prev => ({
        ...prev,
        tech: [...prev.tech, customTech.trim()]
      }));
      setCustomTech('');
    }
  };

  const removeTech = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      tech: prev.tech.filter(t => t !== tech)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <i className={`${isEdit ? 'ri-edit-line' : 'ri-add-line'} text-white text-xl`}></i>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isEdit ? 'Modifier le projet' : 'Nouveau projet'}
              </h1>
              <p className="text-gray-600 mt-1">
                {isEdit ? 'Modifiez les informations du projet' : 'Ajoutez un nouveau projet à votre portfolio'}
              </p>
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              <i className="ri-error-warning-line mr-2"></i>
              {error}
            </div>
          )}

          {/* Informations de base */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Informations de base
              </h2>
              {isGraphicProject && (
                <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  <i className="ri-palette-line"></i>
                  <span>Mode création graphique</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  {isGraphicProject ? 'Nom du projet/création *' : 'Titre du projet *'}
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={isGraphicProject ? "Ex: Logo, Affiche Nouvel An, Carte de visite..." : "Ex: Application mobile innovante"}
                  required
                />
              </div>

              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                  Année *
                </label>
                <input
                  type="number"
                  id="year"
                  value={formData.year}
                  onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="2020"
                  max="2030"
                  required
                />
              </div>
            </div>

            {/* Champ entreprise pour projets graphiques */}
            {isGraphicProject && (
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de l'entreprise/client *
                </label>
                <input
                  type="text"
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Correction Juste, TechCorp, Restaurant Le Bon Goût..."
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Ce nom sera utilisé pour regrouper vos créations par entreprise dans le portfolio
                </p>
              </div>
            )}

            {!isGraphicProject && (
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description courte *
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Description courte qui apparaîtra sur les cartes de projet"
                  required
                />
              </div>
            )}

            {!isGraphicProject && (
              <div>
                <label htmlFor="longDescription" className="block text-sm font-medium text-gray-700 mb-2">
                  Description détaillée *
                </label>
                <textarea
                  id="longDescription"
                  value={formData.longDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, longDescription: e.target.value }))}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Description détaillée qui apparaîtra dans le modal"
                  required
                />
              </div>
            )}
          </div>

          {/* Catégories */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Catégories *
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {PROJECT_CATEGORIES.map((category) => (
                <label key={category} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.category.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{category}</span>
                </label>
              ))}
            </div>
            {formData.category.length === 0 && (
              <p className="text-sm text-red-600">Sélectionnez au moins une catégorie</p>
            )}
          </div>

          {/* Technologies */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              {isGraphicProject ? 'Outils utilisés *' : 'Technologies *'}
            </h2>

            {/* Technologies selon le type de projet */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(isGraphicProject ? GRAPHIC_TECHNOLOGIES : COMMON_TECHNOLOGIES).map((tech) => (
                <label key={tech} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.tech.includes(tech)}
                    onChange={() => handleTechChange(tech)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{tech}</span>
                </label>
              ))}
            </div>

            {/* Ajouter une technologie personnalisée */}
            <div className="flex gap-2">
              <input
                type="text"
                value={customTech}
                onChange={(e) => setCustomTech(e.target.value)}
                placeholder={isGraphicProject
                  ? "Ajouter un outil personnalisé"
                  : "Ajouter une technologie personnalisée"
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomTech())}
              />
              <button
                type="button"
                onClick={addCustomTech}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Ajouter
              </button>
            </div>

            {/* Technologies sélectionnées */}
            {formData.tech.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Technologies sélectionnées:</p>
                <div className="flex flex-wrap gap-2">
                  {formData.tech.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTech(tech)}
                        className="text-blue-600 hover:text-blue-800"
                        title={`Supprimer ${tech}`}
                        aria-label={`Supprimer ${tech}`}
                      >
                        <i className="ri-close-line text-sm"></i>
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {formData.tech.length === 0 && (
              <p className="text-sm text-red-600">Sélectionnez au moins une technologie</p>
            )}
          </div>

          {/* Liens et médias */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              {isGraphicProject ? 'Image de la création' : 'Liens et médias'}
            </h2>

            {!isGraphicProject && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="figmaLink" className="block text-sm font-medium text-gray-700 mb-2">
                    Lien Figma
                  </label>
                  <input
                    type="url"
                    id="figmaLink"
                    value={formData.figmaLink}
                    onChange={(e) => setFormData(prev => ({ ...prev, figmaLink: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://figma.com/..."
                  />
                </div>

                <div>
                  <label htmlFor="githubLink" className="block text-sm font-medium text-gray-700 mb-2">
                    Lien GitHub
                  </label>
                  <input
                    type="url"
                    id="githubLink"
                    value={formData.githubLink}
                    onChange={(e) => setFormData(prev => ({ ...prev, githubLink: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>
            )}

            {isGraphicProject ? (
              <MultipleFileUpload
                label="Images de vos créations *"
                folder="projects"
                currentImages={formData.images}
                onImagesSelect={(images) => {
                  setFormData(prev => ({
                    ...prev,
                    images,
                    // Garder la première image comme image principale pour la compatibilité
                    image: images.length > 0 ? images[0] : ''
                  }));
                }}
              />
            ) : (
              <FileUpload
                label="Image du projet"
                folder="projects"
                currentImage={formData.image}
                onFileSelect={(file, url) => {
                  setFormData(prev => ({ ...prev, image: url }));
                }}
              />
            )}
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
              disabled={loading || formData.category.length === 0 || formData.tech.length === 0}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Sauvegarde...
                </>
              ) : (
                <>
                  <i className="ri-save-line"></i>
                  {isEdit ? 'Mettre à jour' : 'Créer le projet'}
                </>
              )}
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}
