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

// Defina a função gtag fora do useEffect
const gtag = (...args: any[]) => {
  window.dataLayer.push(args);
};

export default function App({ Component, pageProps }: AppProps) {
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.gtag = gtag;

      window.gtag('consent', 'default', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'denied',
        'wait_for_update': 500,
        'region': ['ES', 'US-AK'],
      });

      const consentStatus = localStorage.getItem('cookie-consent');
      if (consentStatus === 'true') {
        setConsentGiven(true);
        consentGrantedAdStorage();
      } else {
        setConsentGiven(false);
        setDefaultConsentState();
      }
    }
  }, []);

  const handleConsent = (consent: boolean) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookie-consent', String(consent));
      setConsentGiven(consent);
      if (consent) {
        consentGrantedAdStorage();
      }
    }
  };

  const consentGrantedAdStorage = () => {
    if (typeof window !== 'undefined') {
      window.gtag('consent', 'update', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
      });
    }
  };

  const setDefaultConsentState = () => {
    if (typeof window !== 'undefined') {
      window.gtag('consent', 'default', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'denied',
        'wait_for_update': 500,
        'region': ['ES', 'US-AK'],
      });
    }
  };

  return (
    <ApolloProvider client={client}>
      <main className={`${poppins.variable} font-sans`}>
        <SpeedInsights />

        {consentGiven !== null && consentGiven && (
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
        {consentGiven !== null && !consentGiven && <CookieBanner onConsent={handleConsent} />}
      </main>
    </ApolloProvider>
  );
}
