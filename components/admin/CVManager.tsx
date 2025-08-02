'use client';
import { useState, useEffect } from 'react';

interface CV {
  filename: string;
  path: string;
  uploadedAt: string;
}

export default function CVManager() {
  const [cv, setCV] = useState<CV | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchCV();
  }, []);

  const fetchCV = async () => {
    try {
      const token = localStorage.getItem('admin-token');
      const response = await fetch('/api/admin/cv', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCV(data.cv);
      }
    } catch (error) {
      console.error('Erreur lors du chargement du CV:', error);
      setMessage({ type: 'error', text: 'Erreur lors du chargement du CV' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Vérifications côté client
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      setMessage({ type: 'error', text: 'Type de fichier non autorisé. Seuls les fichiers PDF, DOC et DOCX sont acceptés.' });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'Le fichier est trop volumineux. Taille maximale: 10MB' });
      return;
    }

    setUploading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append('cv', file);

      const token = localStorage.getItem('admin-token');
      const response = await fetch('/api/admin/cv', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setCV(data.cv);
        setMessage({ type: 'success', text: data.message });
      } else {
        setMessage({ type: 'error', text: data.error });
      }
    } catch (error) {
      console.error('Erreur lors de l\'upload:', error);
      setMessage({ type: 'error', text: 'Erreur lors de l\'upload du CV' });
    } finally {
      setUploading(false);
      // Reset input
      event.target.value = '';
    }
  };

  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer le CV ?')) return;

    setDeleting(true);
    setMessage(null);

    try {
      const token = localStorage.getItem('admin-token');
      const response = await fetch('/api/admin/cv', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setCV(null);
        setMessage({ type: 'success', text: data.message });
      } else {
        setMessage({ type: 'error', text: data.error });
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      setMessage({ type: 'error', text: 'Erreur lors de la suppression du CV' });
    } finally {
      setDeleting(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (filename: string) => {
    const extension = filename.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return 'ri-file-pdf-line';
      case 'doc':
      case 'docx':
        return 'ri-file-word-line';
      default:
        return 'ri-file-line';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
          <i className="ri-file-user-line text-white text-xl"></i>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion du CV</h2>
          <p className="text-gray-600">Uploadez et gérez votre CV (PDF, DOC, DOCX)</p>
        </div>
      </div>

      {/* Messages */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          <div className="flex items-center gap-2">
            <i className={`${message.type === 'success' ? 'ri-check-line' : 'ri-error-warning-line'}`}></i>
            {message.text}
          </div>
        </div>
      )}

      {/* CV actuel */}
      {cv ? (
        <div className="border border-gray-200 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-violet-500 rounded-xl flex items-center justify-center">
                <i className={`${getFileIcon(cv.filename)} text-white text-2xl`}></i>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{cv.filename}</h3>
                <p className="text-sm text-gray-600">
                  Uploadé le {new Date(cv.uploadedAt).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={cv.path}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <i className="ri-eye-line"></i>
                Voir
              </a>
              <a
                href={cv.path}
                download
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <i className="ri-download-line"></i>
                Télécharger
              </a>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {deleting ? (
                  <i className="ri-loader-line animate-spin"></i>
                ) : (
                  <i className="ri-delete-bin-line"></i>
                )}
                Supprimer
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center mb-6">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-file-upload-line text-2xl text-gray-400"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun CV uploadé</h3>
          <p className="text-gray-600">Uploadez votre CV pour qu'il soit accessible aux visiteurs</p>
        </div>
      )}

      {/* Upload */}
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-gray-700 mb-2 block">
            {cv ? 'Remplacer le CV' : 'Uploader un CV'}
          </span>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleUpload}
            disabled={uploading}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-blue-600 file:to-violet-600 file:text-white hover:file:from-blue-700 hover:file:to-violet-700 file:transition-all file:duration-300 file:cursor-pointer disabled:opacity-50"
          />
        </label>
        
        <div className="text-xs text-gray-500">
          <p>• Formats acceptés: PDF, DOC, DOCX</p>
          <p>• Taille maximale: 10MB</p>
          <p>• Le CV sera accessible via l'URL: /cv/nom-du-fichier</p>
        </div>

        {uploading && (
          <div className="flex items-center gap-2 text-blue-600">
            <i className="ri-loader-line animate-spin"></i>
            <span className="text-sm">Upload en cours...</span>
          </div>
        )}
      </div>
    </div>
  );
}
