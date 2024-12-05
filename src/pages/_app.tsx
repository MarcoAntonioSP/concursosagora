import type { AppProps } from 'next/app'
import { Poppins } from "next/font/google"
import { ApolloProvider } from "@apollo/client"
import { client } from "@/lib/apollo"
import '../styles/globals.css'
import { SpeedInsights } from "@vercel/speed-insights/next"
import CookieBanner from '@/components/cookiebanner/CookieBanner'
import { useEffect, useState } from 'react'

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
})

export default function App({ Component, pageProps }: AppProps) {
  const [consentGiven, setConsentGiven] = useState(false)

  useEffect(() => {
    const consentStatus = localStorage.getItem('cookie-consent')
    if (consentStatus === 'true') {
      setConsentGiven(true)
    }
  }, [])

  const handleConsent = (consent: boolean) => {
    localStorage.setItem('cookie-consent', String(consent))
    setConsentGiven(consent)
  }

  return (
    <ApolloProvider client={client}>
      <main className={`${poppins.variable} font-sans`}>
        <SpeedInsights />
        {consentGiven && (
          <>
            <script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXXX-X"></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'UA-XXXXXX-X');
                `,
              }}
            />
          </>
        )}
        <Component {...pageProps} />
        <CookieBanner onConsent={handleConsent} />
      </main>
    </ApolloProvider>
  )
}
