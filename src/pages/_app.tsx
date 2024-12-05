import type { AppProps } from 'next/app'
import { Poppins } from "next/font/google"
import { ApolloProvider } from "@apollo/client"
import { client } from "@/lib/apollo"
import '../styles/globals.css'
import { SpeedInsights } from "@vercel/speed-insights/next"
import CookieBanner from '@/components/cookiebanner/CookieBanner'

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <main className={`${poppins.variable} font-sans`}>
        <SpeedInsights />
        <Component {...pageProps} />
        <CookieBanner />
      </main>
    </ApolloProvider>
  )
}

