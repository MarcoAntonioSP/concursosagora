// components/GoogleAnalytics.tsx

import { useEffect } from 'react';

const GoogleAnalytics = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      // Google Tag Manager
      const gtmScript = document.createElement('script');
      gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${process.env.NEXT_PUBLIC_GTM_ID}`;
      gtmScript.async = true;
      document.body.appendChild(gtmScript);

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'gtm.js',
        'gtm.start': new Date().getTime(),
      });

      // Google Analytics
      const gaScript = document.createElement('script');
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`;
      gaScript.async = true;
      document.body.appendChild(gaScript);

      gaScript.onload = () => {
        window.gtag = function (...args) {
          window.dataLayer.push(args);
        };
        window.gtag('js', new Date());
        window.gtag('config', process.env.NEXT_PUBLIC_GA_ID);
      };
    }
  }, []);

  return null; // Não renderiza nada visualmente, apenas injeta o código necessário
};

export default GoogleAnalytics;
