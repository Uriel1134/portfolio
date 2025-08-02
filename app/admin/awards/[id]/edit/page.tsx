'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import AwardForm from '../../../../../components/admin/AwardForm';
import { Award } from '../../../../../types/admin';

export default function EditAward() {
  const [award, setAward] = useState<Award | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const params = useParams();

  useEffect(() => {
    const fetchAward = async () => {
      try {
        const token = localStorage.getItem('admin-token');
        const response = await fetch(`/api/admin/awards/${params.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAward(data.award);
        } else {
          setError('Distinction non trouvée');
        }
      } catch (error) {
        setError('Erreur lors du chargement de la distinction');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchAward();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !award) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="ri-error-warning-line text-2xl text-red-600"></i>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Erreur</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <a
          href="/admin/awards"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 inline-flex items-center gap-2"
        >
          <i className="ri-arrow-left-line"></i>
          Retour aux distinctions
        </a>
      </div>
    );
  }

  return <AwardForm award={award} isEdit={true} />;
}
