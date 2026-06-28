import { Scale, Wrench, Globe, BarChart2 } from 'lucide-react';

// ─── Main nav links (in display order) ───────────────────────────────────────
// Navbar slices this array to place the Tools dropdown between Home and Blog.
export const MAIN_NAV = [
  { path: '/',        label: 'Home' },
  { path: '/blog',    label: 'Blog' },
  { path: '/about',   label: 'About' },
  { path: '/contact', label: 'Contact' },
];

// ─── Tool registry ────────────────────────────────────────────────────────────
// status  : 'live'   → shown in navbar, clickable
//           'soon'   → shown in navbar, greyed out with "Soon" badge
//           'hidden' → not shown anywhere (feature-flagged off)
//
// category: 'writing' | 'seo' | 'utilities' | 'ai'
//           Used for grouping in the Tools dropdown when category nav is added.
//
// icon    : Lucide component reference — rendered as <tool.icon className="..." />
//           Keep icon imports here, not in Navbar/Footer/Sitemap.
export const TOOLS = [
  {
    label:       'Content Comparison',
    description: 'Compare two texts for similarity',
    path:        '/content-comparison',
    icon:        Scale,
    category:    'writing',
    status:      'live',
  },
  {
    label:       'JSON Formatter',
    description: 'Format & validate JSON data',
    path:        '/json-formatter',
    icon:        Wrench,
    category:    'utilities',
    status:      'hidden',
  },
  {
    label:       'HTML/XML Formatter',
    description: 'Format & minify HTML/XML',
    path:        null,
    icon:        Globe,
    category:    'utilities',
    status:      'hidden',
  },
  {
    label:       'SQL Formatter',
    description: 'Clean & beautify SQL queries',
    path:        null,
    icon:        BarChart2,
    category:    'utilities',
    status:      'hidden',
  },
];

// ─── Footer link groups ───────────────────────────────────────────────────────
export const FOOTER_RESOURCES = [
  { label: 'Blog',          path: '/blog' },
  { label: 'FAQ',           path: '/faq' },
  { label: 'Writing Tips',  path: '/writing-tips' },
  { label: 'Sitemap',       path: '/sitemap' },
];

export const FOOTER_LEGAL = [
  { label: 'Privacy Policy',    path: '/privacy-policy' },
  { label: 'Terms of Service',  path: '/terms-of-service' },
  { label: 'Cookie Policy',     path: '/cookie-policy' },
  { label: 'Contact Us',        path: '/contact' },
];

// ─── Sitemap sections ─────────────────────────────────────────────────────────
export const SITEMAP_SECTIONS = [
  {
    title: 'Main',
    links: [
      { label: 'Home — Free Word Counter', path: '/', desc: 'Real-time word count, readability, keyword density, and SEO tools.' },
    ],
  },
  {
    title: 'Tools',
    links: [
      { label: 'Content Comparison', path: '/content-comparison', desc: 'Compare two texts for similarity and detect duplicate content.' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog',          path: '/blog',          desc: 'Writing guides, SEO tips, and readability tutorials.' },
      { label: 'Writing Tips',  path: '/writing-tips',  desc: 'Evidence-based techniques for clearer, sharper writing.' },
      { label: 'FAQ',           path: '/faq',           desc: 'Answers to common questions about CountsYourWords.' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About',      path: '/about',   desc: 'Learn about CountsYourWords and why we built it.' },
      { label: 'Contact Us', path: '/contact', desc: 'Send a question, bug report, or feature request.' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy',   path: '/privacy-policy',   desc: "How we handle (or don't handle) your data." },
      { label: 'Terms of Service', path: '/terms-of-service', desc: 'Rules governing use of the CountsYourWords service.' },
      { label: 'Cookie Policy',    path: '/cookie-policy',    desc: "We don't use cookies — but here's what we do instead." },
    ],
  },
];
