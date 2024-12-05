import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

// Defina as props esperadas
interface CookieBannerProps {
  onConsent: (consent: boolean) => void;
  expirationDays?: number; // Permite definir a expiração do consentimento
  customStyles?: string; // Permite passar classes customizadas para o banner
}

const CookieBanner = ({
  onConsent,
  expirationDays = 365, // Padrão de expiração para 1 ano
  customStyles = '',
}: CookieBannerProps) => {
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const userConsent = localStorage.getItem('cookieConsent');
    const consentDate = localStorage.getItem('cookieConsentDate');
    const currentDate = new Date();

    // Se o consentimento foi dado e não expirou
    if (userConsent && consentDate) {
      const consentTimestamp = parseInt(consentDate);
      const expirationDate = new Date(consentTimestamp + expirationDays * 24 * 60 * 60 * 1000); // Expira após os dias definidos
      if (currentDate < expirationDate) {
        setShowBanner(false);
        onConsent(true); // Chame a função de consentimento logo que souber que o consentimento foi dado
      } else {
        localStorage.removeItem('cookieConsent');
        localStorage.removeItem('cookieConsentDate');
      }
    }
  }, [onConsent, expirationDays]);

  const handleAccept = () => {
    const currentDate = new Date();
    localStorage.setItem('cookieConsent', 'true');
    localStorage.setItem('cookieConsentDate', currentDate.getTime().toString()); // Armazena a data do consentimento
    onConsent(true);
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white rounded-lg p-4 flex items-center shadow-lg z-50 max-w-lg w-full ${customStyles}`}
      role="banner"
      aria-live="polite"
    >
      <FontAwesomeIcon icon={faInfoCircle} className="text-blue-400 mr-3" />
      <p className="text-sm" aria-label="Informações sobre cookies">
        Este site usa cookies para melhorar sua experiência. Ao continuar, você concorda com nossa{' '}
        <a href="/politicaprivacidade" className="text-blue-300 hover:underline" aria-label="Leia a política de cookies">
          Política de Cookies
        </a> e{' '}
        <a href="/politicaprivacidade" className="text-blue-300 hover:underline" aria-label="Leia a política de privacidade">
          Política de Privacidade
        </a>.
      </p>
      <button
        onClick={handleAccept}
        className="ml-4 text-gray-400 hover:text-gray-200"
        aria-label="Aceitar cookies"
      >
        Aceitar Cookies
      </button>
    </div>
  );
};

export default CookieBanner;
