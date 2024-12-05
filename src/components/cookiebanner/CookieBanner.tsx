// components/CookieBanner.js
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    // Verifica se o usuário já deu consentimento anteriormente
    const userConsent = localStorage.getItem('cookieConsent');
    if (userConsent) {
      setShowBanner(false);
    }
  }, []);

  const handleAccept = () => {
    // Grava o consentimento no localStorage para lembrar em visitas futuras
    localStorage.setItem('cookieConsent', 'true');
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white rounded-lg p-4 flex items-center shadow-lg z-50 max-w-lg w-full">
      <FontAwesomeIcon icon={faInfoCircle} className="text-blue-400 mr-3" />
      <p className="text-sm">
        Este site usa cookies para melhorar sua experiência. Ao continuar, você concorda com nossa{' '}
        <a href="/politicaprivacidade" className="text-blue-300 hover:underline">Política de Cookies</a> e{' '}
        <a href="/politicaprivacidade" className="text-blue-300 hover:underline">Política de Privacidade</a>.
      </p>
      <button onClick={handleAccept} className="ml-4 text-gray-400 hover:text-gray-200">
        Aceitar Cookies
      </button>
    </div>
  );
}
