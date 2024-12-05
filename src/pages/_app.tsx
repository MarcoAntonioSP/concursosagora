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

export default function App({ Component, pageProps }: AppProps) {
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    const consentStatus = localStorage.getItem('cookie-consent');
    if (consentStatus === 'true') {
      setConsentGiven(true);
      consentGrantedAdStorage();
    } else {
      // Default consent state when not yet given
      setDefaultConsentState();
    }
  }, []);

  const handleConsent = (consent: boolean) => {
    localStorage.setItem('cookie-consent', String(consent));
    setConsentGiven(consent);
    if (consent) {
      consentGrantedAdStorage();
    }
  };

  function consentGrantedAdStorage() {
    window.gtag('consent', 'update', {
      'ad_storage': 'granted',
      'analytics_storage': 'granted',
      'ad_user_data': 'granted',
      'ad_personalization': 'granted'
    });
  }

  function setDefaultConsentState() {
    window.gtag('consent', 'default', {
      'ad_storage': 'denied',
      'analytics_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'wait_for_update': 500, // Waits 500ms for CMP to update consent
      'region': ['ES', 'US-AK'] // Spain and Alaska
    });
  }

  return (
    <ApolloProvider client={client}>
      <main className={`${poppins.variable} font-sans`}>
        <SpeedInsights />
        
        {consentGiven && (
          <>
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-XTE88KS83H"
            ></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-XTE88KS83H');
                `,
              }}
            />
          </>
        )}

        <Component {...pageProps} />
        {!consentGiven && <CookieBanner onConsent={handleConsent} />}
      </main>
    </ApolloProvider>
  );
}
