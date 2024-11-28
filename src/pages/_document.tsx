import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        {/* Link para o favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" />

        {/* Google Analytics */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=G-XTE88KS83H`}></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XTE88KS83H', {
              page_path: window.location.pathname,
            });
          `,
        }} />
      </Head>
      <body className="bg-gray-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
