// pages/_app.tsx
import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/lib/apollo';
import '../styles/globals.css';
import CookieBanner from '@/components/cookiebanner/CookieBanner';
import { Poppins } from 'next/font/google';
import GoogleAnalytics from '@/components/cookiebanner/GoogleAnalytics';  // Importe o novo componente

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

  const handleConsent = (consent: boolean) => {
    localStorage.setItem('cookie-consent', String(consent));
    setConsentGiven(consent);
  };

  return (
    <ApolloProvider client={client}>
      <main className={`${poppins.variable} font-sans`}>
        {/* Carrega o GoogleAnalytics somente após o consentimento */}
        {consentGiven && <GoogleAnalytics />}

        <Component {...pageProps} />
        {consentGiven === null && <CookieBanner onConsent={handleConsent} />}
      </main>
    </ApolloProvider>
  );
}
