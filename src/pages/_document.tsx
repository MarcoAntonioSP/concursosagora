// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        {/* Link para o favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" />

        {/* Google Tag Manager: Carrega o GTM somente após o consentimento do usuário */}
        {/* Este código deve ser inserido no <head> para iniciar o GTM quando consentido */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var cookieConsent = localStorage.getItem('cookieConsent');
                if (cookieConsent === 'true') {
                  var script = document.createElement('script');
                  script.src = 'https://www.googletagmanager.com/gtm.js?id=${process.env.NEXT_PUBLIC_GTM_ID}';
                  script.async = true;
                  document.head.appendChild(script);
                }
              })();
            `,
          }}
        />
      </Head>
      <body className="bg-gray-50">
        {/* Google Tag Manager Fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        {/* Conteúdo principal */}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
