import type { AppProps } from 'next/app';
import { Poppins } from 'next/font/google';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/lib/apollo';
import '../styles/globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import CookieBanner from '@/components/cookiebanner/CookieBanner';
import { useEffect, useState } from 'react';

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null);

  useEffect(() => {
    // Verifica o estado do consentimento no LocalStorage ao carregar
    const consent = localStorage.getItem('cookie-consent');
    if (consent !== null) {
      setConsentGiven(consent === 'true');
    } else {
      setConsentGiven(null);
    }
  }, []);

  useEffect(() => {
    if (consentGiven) {
      // Adiciona o script do GTM
      const script = document.createElement('script');
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XTE88KS83H';
      script.async = true;
      document.body.appendChild(script);

      // Inicializa o dataLayer
      window.dataLayer = window.dataLayer || [];
      window.gtag = function (...args: any[]) {
        window.dataLayer.push(args);
      };

      // Configura o GTM
      window.gtag('js', new Date());
      window.gtag('config', 'G-XTE88KS83H');
    }
  }, [consentGiven]);

  const handleConsent = (consent: boolean) => {
    localStorage.setItem('cookie-consent', String(consent));
    setConsentGiven(consent);
    if (consent) {
      grantConsent();
    }
  };

  const grantConsent = () => {
    window.gtag('consent', 'update', {
      ad_storage: 'granted',
      analytics_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
    });
  };

  const setDefaultConsentState = () => {
    window.gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      wait_for_update: 500,
      region: ['ES', 'US-AK'],
    });
  };

  return (
    <ApolloProvider client={client}>
      <main className={`${poppins.variable} font-sans`}>
        <SpeedInsights />

        <Component {...pageProps} />
        {consentGiven === null && <CookieBanner onConsent={handleConsent} />}
      </main>
    </ApolloProvider>
  );
}
