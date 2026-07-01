'use strict';

const fs       = require('fs');
const path     = require('path');

const BASE_URL   = 'https://countsyourwords.netlify.app';
const OUTPUT     = path.join(__dirname, '..', 'public', 'sitemap.xml');
const articles   = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'articles.json'), 'utf8')
);

// Converts "June 20, 2026" or a Date object to "2026-06-20"
function w3cDate(value) {
  const d = new Date(value);
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, '0'),
    String(d.getDate()).padStart(2, '0'),
  ].join('-');
}

const today      = w3cDate(new Date());
const latestPost = w3cDate(articles[0].date);
const LEGAL_DATE = '2026-07-01';

const staticRoutes = [
  { loc: '/',                   priority: '1.0', changefreq: 'daily',   lastmod: today },
  { loc: '/blog',               priority: '0.8', changefreq: 'weekly',  lastmod: latestPost },
  { loc: '/faq',                priority: '0.7', changefreq: 'monthly', lastmod: today },
  { loc: '/content-comparison', priority: '0.6', changefreq: 'monthly', lastmod: today },
  { loc: '/json-formatter',     priority: '0.6', changefreq: 'monthly', lastmod: today },
  { loc: '/writing-tips',       priority: '0.6', changefreq: 'monthly', lastmod: today },
  { loc: '/about',              priority: '0.5', changefreq: 'yearly',  lastmod: today },
  { loc: '/contact',            priority: '0.4', changefreq: 'yearly',  lastmod: today },
  { loc: '/privacy-policy',     priority: '0.3', changefreq: 'yearly',  lastmod: LEGAL_DATE },
  { loc: '/terms-of-service',   priority: '0.3', changefreq: 'yearly',  lastmod: LEGAL_DATE },
  { loc: '/cookie-policy',      priority: '0.3', changefreq: 'yearly',  lastmod: LEGAL_DATE },
];

const blogRoutes = articles.map((article, i) => ({
  loc:        `/blog/${article.slug}`,
  priority:   i < articles.length - 1 ? '0.7' : '0.6',
  changefreq: 'monthly',
  lastmod:    w3cDate(article.date),
}));

// Final URL order mirrors the approved sitemap inventory
const allRoutes = [
  staticRoutes[0],  // /
  staticRoutes[1],  // /blog
  staticRoutes[2],  // /faq
  ...blogRoutes,    // /blog/:slug  (sorted newest-first via articles.json order)
  staticRoutes[3],  // /content-comparison
  staticRoutes[4],  // /json-formatter
  staticRoutes[5],  // /writing-tips
  staticRoutes[6],  // /about
  staticRoutes[7],  // /contact
  staticRoutes[8],  // /privacy-policy
  staticRoutes[9],  // /terms-of-service
  staticRoutes[10], // /cookie-policy
];

const urlBlock = ({ loc, lastmod, changefreq, priority }) =>
  `  <url>
    <loc>${BASE_URL}${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${allRoutes.map(urlBlock).join('\n\n')}

</urlset>
`;

fs.writeFileSync(OUTPUT, xml, 'utf8');
console.log(`sitemap.xml generated — ${allRoutes.length} URLs written to ${OUTPUT}`);
