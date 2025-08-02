'use client';
import { useState, useEffect } from 'react';

interface CV {
  filename: string;
  path: string;
  uploadedAt: string;
}

export function useCV() {
  const [cv, setCV] = useState<CV | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const response = await fetch('/api/portfolio');
        if (response.ok) {
          const data = await response.json();
          // Vérifier si un CV existe dans les données du portfolio
          if (data.cv) {
            setCV(data.cv);
          }
        }
      } catch (error) {
        console.error('Erreur lors du chargement du CV:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCV();
  }, []);

  return { cv, loading };
}
