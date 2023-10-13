/** @type {import('next-sitemap').IConfig} */

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "daily",
  priority: 1,
  exclude: ["/404"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: ["/404"],
      },
      { userAgent: "*", allow: "/" },
    ],
    additionalSitemaps: [`${siteUrl}/dynamic-sitemap.xml`],
  },
};
