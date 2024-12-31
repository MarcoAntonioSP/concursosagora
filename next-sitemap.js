// next-sitemap.js
module.exports = {
  siteUrl: 'https://www.concursosagora.com.br',  // URL do seu site
  generateRobotsTxt: true,  // Gerar o arquivo robots.txt
  sitemapSize: 7000,  // Se houver mais de 7000 URLs, o sitemap será dividido
  changefreq: 'daily',  // Frequência de atualização das páginas
  priority: 0.7,  // Prioridade de indexação
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
