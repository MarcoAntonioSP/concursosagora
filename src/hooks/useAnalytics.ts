// hooks/useAnalytics.ts
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

const useAnalytics = () => {
  const [cookies] = useCookies(['user-consent']);

  useEffect(() => {
    if (cookies['user-consent'] === 'true') {
      // Inicialize o Google Analytics ou outro serviço de rastreamento aqui
      // Exemplo: window.gtag('config', 'UA-XXXXX-X');
      console.log("Google Analytics carregado.");
    }
  }, [cookies]);

};

export default useAnalytics;
