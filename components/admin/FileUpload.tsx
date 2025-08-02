'use client';

import { useState, useRef } from 'react';

interface FileUploadProps {
  onFileSelect: (file: File, url: string) => void;
  accept?: string;
  maxSize?: number; // en MB
  currentImage?: string;
  label?: string;
  folder?: 'projects' | 'awards' | 'certificates' | 'misc';
}

export default function FileUpload({ 
  onFileSelect, 
  accept = "image/*", 
  maxSize = 5,
  currentImage,
  label = "Sélectionner une image",
  folder = 'misc'
}: FileUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    // Vérifier la taille
    if (file.size > maxSize * 1024 * 1024) {
      alert(`Le fichier est trop volumineux. Taille maximum: ${maxSize}MB`);
      return;
    }

    // Vérifier le type
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image valide');
      return;
    }

    setUploading(true);

    try {
      // Créer un aperçu local
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // Préparer le FormData pour l'upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      // Upload vers l'API
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin-token')}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        onFileSelect(file, data.url);
      } else {
        throw new Error('Erreur lors de l\'upload');
      }
    } catch (error) {
      console.error('Erreur upload:', error);
      alert('Erreur lors de l\'upload du fichier');
      setPreview(currentImage || null);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      
      {/* Zone de drop */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 cursor-pointer ${
          dragOver 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
        } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragOver(false);
        }}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileInput}
          className="hidden"
        />

        {uploading ? (
          <div className="space-y-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-blue-600 font-medium">Upload en cours...</p>
          </div>
        ) : preview ? (
          <div className="space-y-3">
            <div className="relative inline-block">
              <img
                src={preview}
                alt="Aperçu"
                className="w-32 h-20 object-cover rounded-lg border border-gray-200"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setPreview(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <i className="ri-close-line text-xs"></i>
              </button>
            </div>
            <p className="text-sm text-gray-600">Cliquez pour changer l'image</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <i className="ri-image-add-line text-2xl text-gray-400"></i>
            </div>
            <div>
              <p className="text-gray-700 font-medium">
                Glissez-déposez une image ici
              </p>
              <p className="text-sm text-gray-500 mt-1">
                ou cliquez pour sélectionner
              </p>
            </div>
            <p className="text-xs text-gray-400">
              Formats: JPG, PNG, SVG • Max: {maxSize}MB
            </p>
          </div>
        )}
      </div>

      {/* Informations sur le dossier */}
      <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
        <div className="flex items-center gap-2">
          <i className="ri-folder-line text-gray-400"></i>
          <span>Sera sauvegardé dans: <code>/images/{folder}/</code></span>
        </div>
      </div>
    </div>
  );
}
