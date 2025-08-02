'use client';
import { useState, useRef } from 'react';

interface MultipleFileUploadProps {
  label: string;
  folder: string;
  currentImages: string[];
  onImagesSelect: (images: string[]) => void;
}

export default function MultipleFileUpload({ 
  label, 
  folder, 
  currentImages, 
  onImagesSelect 
}: MultipleFileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (files: FileList) => {
    if (files.length === 0) return;

    setUploading(true);
    const newImages: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Validation du fichier
        if (!file.type.startsWith('image/')) {
          alert(`${file.name} n'est pas une image valide`);
          continue;
        }

        if (file.size > 10 * 1024 * 1024) { // 10MB max
          alert(`${file.name} est trop volumineux (max 10MB)`);
          continue;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);

        const response = await fetch('/api/admin/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('admin-token')}`,
          },
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          newImages.push(data.url);
        } else {
          alert(`Erreur lors de l'upload de ${file.name}`);
        }
      }

      // Ajouter les nouvelles images aux images existantes
      const allImages = [...currentImages, ...newImages];
      onImagesSelect(allImages);
    } catch (error) {
      console.error('Erreur upload:', error);
      alert('Erreur lors de l\'upload des fichiers');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const removeImage = (indexToRemove: number) => {
    const updatedImages = currentImages.filter((_, index) => index !== indexToRemove);
    onImagesSelect(updatedImages);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      {/* Zone de drop */}
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
          dragOver
            ? 'border-blue-400 bg-blue-50'
            : uploading
            ? 'border-gray-300 bg-gray-50'
            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {uploading ? (
          <div className="flex flex-col items-center">
            <i className="ri-loader-4-line animate-spin text-4xl text-blue-600 mb-4"></i>
            <p className="text-gray-600">Upload en cours...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <i className="ri-upload-cloud-2-line text-4xl text-gray-400 mb-4"></i>
            <p className="text-gray-600 mb-2">
              Glissez-déposez vos images ici ou{' '}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                parcourez
              </button>
            </p>
            <p className="text-sm text-gray-500">
              PNG, JPG, WEBP jusqu'à 10MB chacune
            </p>
          </div>
        )}
      </div>

      {/* Input file caché */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
        className="hidden"
      />

      {/* Aperçu des images */}
      {currentImages.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">
            Images sélectionnées ({currentImages.length})
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentImages.map((imageUrl, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  title="Supprimer cette image"
                >
                  <i className="ri-close-line text-sm"></i>
                </button>
                <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
