// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://aura-learn-six.vercel.app",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ["/api/*"],
  changefreq: "weekly",
  priority: 0.8,
};
