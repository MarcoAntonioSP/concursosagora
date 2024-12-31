import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/lib/apollo';
import '../styles/globals.css';
import CookieBanner from '@/components/cookiebanner/CookieBanner';
import { Poppins } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export default function App({ Component, pageProps }: AppProps) {
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (consent !== null) {
      setConsentGiven(consent === 'true');
    }
  }, []);

  useEffect(() => {
    if (consentGiven) {
      // Adiciona o script do GTM
      const script = document.createElement('script');
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XTE88KS83H';
      script.async = true;
      document.body.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function (...args) {
        window.dataLayer.push(args);
      };

      window.gtag('js', new Date());
      window.gtag('config', 'G-XTE88KS83H');
    }
  }, [consentGiven]);

  const handleConsent = (consent: boolean) => {
    localStorage.setItem('cookie-consent', String(consent));
    setConsentGiven(consent);
    if (consent) {
      window.gtag('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      });
    }
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
