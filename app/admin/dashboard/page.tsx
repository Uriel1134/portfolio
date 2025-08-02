'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import CVManager from '../../../components/admin/CVManager';

interface Stats {
  totalProjects: number;
  totalAwards: number;
  lastUpdated: string;
  projectsByCategory: Record<string, number>;
  projectsByYear: Record<string, number>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('admin-token');
        const response = await fetch('/api/admin/stats', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setStats(data.stats);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  const quickActions = [
    {
      title: 'Nouveau Projet',
      description: 'Ajouter un nouveau projet au portfolio',
      href: '/admin/projects/new',
      icon: 'ri-add-circle-line',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Nouvelle Distinction',
      description: 'Ajouter une nouvelle récompense',
      href: '/admin/awards/new',
      icon: 'ri-trophy-line',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Gérer les Médias',
      description: 'Uploader et organiser les images',
      href: '/admin/media',
      icon: 'ri-image-line',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Gérer le CV',
      description: 'Uploader et gérer votre CV',
      href: '#cv-section',
      icon: 'ri-file-user-line',
      color: 'bg-green-500 hover:bg-green-600',
      scrollTo: true
    },
    {
      title: 'Voir le Portfolio',
      description: 'Prévisualiser le site public',
      href: '/',
      icon: 'ri-external-link-line',
      color: 'bg-gray-500 hover:bg-gray-600',
      external: true
    }
  ];

  return (
    <div className="p-6">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="mt-2 text-gray-600">
            Gérez votre portfolio et suivez vos statistiques
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Projets</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.totalProjects || 0}</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                <i className="text-xl text-blue-600 ri-folder-line"></i>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Distinctions</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.totalAwards || 0}</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg">
                <i className="text-xl text-yellow-600 ri-trophy-line"></i>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Catégories</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats?.projectsByCategory ? Object.keys(stats.projectsByCategory).length : 0}
                </p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
                <i className="text-xl text-green-600 ri-price-tag-3-line"></i>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Années</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats?.projectsByYear ? Object.keys(stats.projectsByYear).length : 0}
                </p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
                <i className="text-xl text-purple-600 ri-calendar-line"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Actions rapides */}
        <div>
          <h2 className="mb-6 text-xl font-semibold text-gray-900">Actions rapides</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action, index) => {
              if (action.scrollTo) {
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      const element = document.getElementById('cv-section');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="p-6 transition-shadow duration-200 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md group text-left w-full"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                        <i className={`${action.icon} text-white text-xl`}></i>
                      </div>
                    </div>
                    <h3 className="mb-2 font-semibold text-gray-900">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </button>
                );
              }

              return (
                <Link
                  key={index}
                  href={action.href}
                  target={action.external ? '_blank' : undefined}
                  className="p-6 transition-shadow duration-200 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                      <i className={`${action.icon} text-white text-xl`}></i>
                    </div>
                    {action.external && (
                      <i className="text-sm text-gray-400 ri-external-link-line"></i>
                    )}
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Activité récente */}
        <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Activité récente</h2>
            <span className="text-xs text-gray-500">Aujourd'hui</span>
          </div>
          <div className="py-8 text-center">
            <i className="mb-4 text-4xl text-gray-300 ri-time-line"></i>
            <p className="text-gray-500">Aucune activité récente</p>
          </div>
        </div>

        {/* Section CV */}
        <div id="cv-section" className="mt-8">
          <CVManager />
        </div>
      </div>
    </div>
  );
}
