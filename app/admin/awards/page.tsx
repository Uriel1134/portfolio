'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Award } from '../../../types/admin';

export default function AdminAwards() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState<{ show: boolean; award: Award | null }>({
    show: false,
    award: null
  });

  useEffect(() => {
    fetchAwards();
  }, []);

  const fetchAwards = async () => {
    try {
      const token = localStorage.getItem('admin-token');
      const response = await fetch('/api/admin/awards', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAwards(data.awards);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des distinctions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (award: Award) => {
    try {
      const token = localStorage.getItem('admin-token');
      const response = await fetch(`/api/admin/awards/${award.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setAwards(awards.filter(a => a.id !== award.id));
        setDeleteModal({ show: false, award: null });
      } else {
        alert('Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Erreur lors de la suppression');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des distinctions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header moderne */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                  <i className="ri-trophy-line text-white text-xl"></i>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Gestion des Distinctions</h1>
                  <p className="text-gray-600 mt-1">
                    {awards.length} distinction{awards.length !== 1 ? 's' : ''} au total
                  </p>
                </div>
              </div>
            </div>
            <Link
              href="/admin/awards/new"
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-medium"
            >
              <i className="ri-add-line text-xl"></i>
              Nouvelle distinction
            </Link>
          </div>
        </div>

        {/* Grille des distinctions */}
        {awards.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-trophy-line text-3xl text-yellow-500"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune distinction</h3>
            <p className="text-gray-600 mb-6">Commencez par ajouter votre première récompense</p>
            <Link
              href="/admin/awards/new"
              className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors duration-200 inline-flex items-center gap-2"
            >
              <i className="ri-add-line"></i>
              Ajouter une distinction
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {awards.map((award) => (
              <div key={award.id} className={`bg-white rounded-2xl shadow-sm border ${award.borderColor} overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}>
                {/* Image du prix */}
                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                  {award.image ? (
                    <img
                      src={award.image}
                      alt={award.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-r ${award.gradient} flex items-center justify-center`}>
                      <i className={`${award.icon} text-6xl text-white`}></i>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${award.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                      <i className={`${award.icon} text-xl text-white`}></i>
                    </div>
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{award.title}</h3>
                    <p className="text-lg font-medium text-gray-700 mb-2">{award.event}</p>
                    <p className="text-gray-600 text-sm line-clamp-2">{award.description}</p>
                  </div>

                  {/* Informations */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <i className="ri-calendar-line text-gray-400"></i>
                      <span>{award.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <i className="ri-map-pin-line text-gray-400"></i>
                      <span>{award.location}</span>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-2 mb-6">
                    {award.certificate && (
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center gap-1">
                        <i className="ri-award-line"></i>
                        Certificat
                      </span>
                    )}
                    {award.figmaLink && (
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium flex items-center gap-1">
                        <i className="ri-palette-line"></i>
                        Figma
                      </span>
                    )}
                    {award.githubLink && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium flex items-center gap-1">
                        <i className="ri-github-line"></i>
                        GitHub
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/awards/${award.id}/edit`}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-sm font-medium"
                      >
                        <i className="ri-edit-line"></i>
                        Modifier
                      </Link>
                      <button
                        onClick={() => setDeleteModal({ show: true, award })}
                        className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors duration-200 text-sm font-medium"
                      >
                        <i className="ri-delete-bin-line"></i>
                        Supprimer
                      </button>
                    </div>
                    <span className="text-xs text-gray-500">
                      MAJ: {new Date(award.updatedAt || award.createdAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal de suppression */}
        {deleteModal.show && deleteModal.award && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <i className="ri-delete-bin-line text-red-600 text-xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Supprimer la distinction</h3>
                  <p className="text-sm text-gray-600">Cette action est irréversible</p>
                </div>
              </div>
              <p className="text-gray-700 mb-8">
                Êtes-vous sûr de vouloir supprimer la distinction <strong>"{deleteModal.award.title}"</strong> de <strong>{deleteModal.award.event}</strong> ?
              </p>
              <div className="flex items-center gap-4 justify-end">
                <button
                  onClick={() => setDeleteModal({ show: false, award: null })}
                  className="px-6 py-3 text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
                >
                  Annuler
                </button>
                <button
                  onClick={() => handleDelete(deleteModal.award!)}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
