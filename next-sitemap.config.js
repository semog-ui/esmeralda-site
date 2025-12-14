/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://esmeraldacompany.com.br',
  generateRobotsTxt: true,
  // Opções adicionais conforme necessário
  generateIndexSitemap: false,
}
