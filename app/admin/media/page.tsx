'use client';

import { useState } from 'react';
import FileUpload from '../../../components/admin/FileUpload';

export default function AdminMedia() {

  const mediaFolders = [
    {
      name: 'Projets',
      path: '/images/projects/',
      description: 'Images des projets du portfolio',
      icon: 'ri-folder-line',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      name: 'Prix & Trophées',
      path: '/images/awards/',
      description: 'Photos des prix et récompenses',
      icon: 'ri-trophy-line',
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      name: 'Certificats',
      path: '/images/certificates/',
      description: 'Certificats et diplômes (format 16:9)',
      icon: 'ri-award-line',
      color: 'bg-green-100 text-green-600'
    },
    {
      name: 'Autres',
      path: '/images/misc/',
      description: 'Autres images et ressources',
      icon: 'ri-image-line',
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Gestion des Médias</h1>
        <p className="text-gray-600 mt-2">
          Organisez et gérez vos images et fichiers multimédias
        </p>
      </div>

      {/* Zone d'upload */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Upload de fichiers</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FileUpload
            label="Projets"
            folder="projects"
            onFileSelect={(file, url) => {
              console.log('Fichier uploadé dans projets:', url);
            }}
          />

          <FileUpload
            label="Prix & Trophées"
            folder="awards"
            onFileSelect={(file, url) => {
              console.log('Fichier uploadé dans awards:', url);
            }}
          />

          <FileUpload
            label="Certificats"
            folder="certificates"
            onFileSelect={(file, url) => {
              console.log('Fichier uploadé dans certificates:', url);
            }}
          />

          <FileUpload
            label="Autres"
            folder="misc"
            onFileSelect={(file, url) => {
              console.log('Fichier uploadé dans misc:', url);
            }}
          />
        </div>
      </div>

      {/* Dossiers de médias */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Organisation des médias</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mediaFolders.map((folder, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 ${folder.color} rounded-lg flex items-center justify-center`}>
                  <i className={`${folder.icon} text-xl`}></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{folder.name}</h3>
                  <p className="text-sm text-gray-500">{folder.path}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">{folder.description}</p>
              <button type="button" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                <i className="ri-folder-open-line"></i>
                Parcourir
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <i className="ri-information-line text-blue-600"></i>
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Instructions d'utilisation</h3>
            <div className="space-y-2 text-sm text-blue-800">
              <p><strong>Projets :</strong> Images au format 16:9 (1920x1080px recommandé)</p>
              <p><strong>Prix :</strong> Photos des trophées/prix reçus (format libre)</p>
              <p><strong>Certificats :</strong> Format 16:9 horizontal obligatoire</p>
              <p><strong>Nommage :</strong> Utilisez des noms descriptifs sans espaces (ex: mon-projet-2024.jpg)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Statistiques de stockage</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <i className="ri-file-line text-blue-600 text-xl"></i>
            </div>
            <p className="text-2xl font-bold text-gray-900">--</p>
            <p className="text-sm text-gray-600">Fichiers totaux</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <i className="ri-hard-drive-line text-green-600 text-xl"></i>
            </div>
            <p className="text-2xl font-bold text-gray-900">-- MB</p>
            <p className="text-sm text-gray-600">Espace utilisé</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <i className="ri-time-line text-purple-600 text-xl"></i>
            </div>
            <p className="text-2xl font-bold text-gray-900">--</p>
            <p className="text-sm text-gray-600">Dernière MAJ</p>
          </div>
        </div>
      </div>

      {/* Note de développement */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <i className="ri-tools-line text-yellow-600"></i>
          </div>
          <div>
            <h3 className="font-semibold text-yellow-900 mb-2">En développement</h3>
            <p className="text-sm text-yellow-800">
              La fonctionnalité d'upload automatique est en cours de développement. 
              Pour le moment, ajoutez manuellement vos fichiers dans les dossiers correspondants 
              du répertoire <code className="bg-yellow-200 px-1 rounded">public/images/</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
