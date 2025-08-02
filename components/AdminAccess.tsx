'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminAccess() {
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const router = useRouter();

  // Séquence secrète : Ctrl + Shift + A + D + M + I + N
  const secretSequence = ['Control', 'Shift', 'KeyA', 'KeyD', 'KeyM', 'KeyI', 'KeyN'];

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Ajouter la touche à la séquence
      const newSequence = [...keySequence, event.code];
      setKeySequence(newSequence);

      // Vérifier si la séquence correspond
      if (newSequence.length >= secretSequence.length) {
        const lastKeys = newSequence.slice(-secretSequence.length);
        const isMatch = lastKeys.every((key, index) => key === secretSequence[index]);

        if (isMatch) {
          // Séquence correcte - rediriger vers l'admin
          setShowHint(true);
          setTimeout(() => {
            router.push('/admin/login');
          }, 1000);
        }
      }

      // Réinitialiser la séquence après 3 secondes d'inactivité
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setKeySequence([]);
      }, 3000);
    };

    // Écouter les événements clavier
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timeout);
    };
  }, [keySequence, router]);

  // Afficher un hint discret quand la séquence est activée
  if (showHint) {
    return (
      <div className="fixed top-4 right-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
        <div className="flex items-center gap-2">
          <i className="ri-admin-line"></i>
          <span className="text-sm">Accès administrateur activé...</span>
        </div>
      </div>
    );
  }

  return null;
}

// Hook pour détecter la séquence Konami modifiée
export function useAdminAccess() {
  const [isActivated, setIsActivated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Séquence alternative : triple-clic sur le logo + Ctrl
    let clickCount = 0;
    let clickTimeout: NodeJS.Timeout;

    const handleLogoClick = (event: MouseEvent) => {
      if (event.ctrlKey) {
        clickCount++;
        
        if (clickCount === 3) {
          setIsActivated(true);
          setTimeout(() => {
            router.push('/admin/login');
          }, 500);
        }

        clearTimeout(clickTimeout);
        clickTimeout = setTimeout(() => {
          clickCount = 0;
        }, 1000);
      }
    };

    // Ajouter l'événement sur les éléments avec la classe 'admin-access'
    const logoElements = document.querySelectorAll('.admin-access');
    logoElements.forEach(element => {
      element.addEventListener('click', handleLogoClick as EventListener);
    });

    return () => {
      logoElements.forEach(element => {
        element.removeEventListener('click', handleLogoClick as EventListener);
      });
      clearTimeout(clickTimeout);
    };
  }, [router]);

  return isActivated;
}

// Composant pour l'accès URL secret
export function SecretUrlAccess() {
  const router = useRouter();

  useEffect(() => {
    // Vérifier si l'URL contient le paramètre secret
    const urlParams = new URLSearchParams(window.location.search);
    const secretParam = urlParams.get('admin_access');
    
    // Clé secrète : portfolio_admin_2025
    if (secretParam === 'portfolio_admin_2025') {
      // Nettoyer l'URL
      window.history.replaceState({}, document.title, window.location.pathname);
      // Rediriger vers l'admin
      router.push('/admin/login');
    }
  }, [router]);

  return null;
}
