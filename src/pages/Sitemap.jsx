import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';

const sections = [
  {
    title: 'Main',
    links: [
      { label: 'Home — Free Word Counter', path: '/', desc: 'Real-time word count, readability, keyword density, and SEO tools.' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', path: '/blog', desc: 'Writing guides, SEO tips, and readability tutorials.' },
      { label: 'Writing Tips', path: '/writing-tips', desc: 'Evidence-based techniques for clearer, sharper writing.' },
      { label: 'FAQ', path: '/faq', desc: 'Answers to common questions about WordCounter.' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', path: '/about', desc: 'Learn about WordCounter and why we built it.' },
      { label: 'Contact Us', path: '/contact', desc: 'Send a question, bug report, or feature request.' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', path: '/privacy-policy', desc: 'How we handle (or don\'t handle) your data.' },
      { label: 'Terms of Service', path: '/terms-of-service', desc: 'Rules governing use of the WordCounter service.' },
      { label: 'Cookie Policy', path: '/cookie-policy', desc: 'We don\'t use cookies — but here\'s what we do instead.' },
    ],
  },
];

const Sitemap = () => (
  <PageLayout title="Sitemap" subtitle="Every page on WordCounter, in one place.">
    <div className="section-card max-w-3xl space-y-8">
      {sections.map(({ title, links }) => (
        <div key={title}>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-200 dark:border-dark-border">
            {title}
          </h2>
          <ul className="space-y-3">
            {links.map(({ label, path, desc }) => (
              <li key={path} className="flex items-start gap-3">
                <span className="text-primary mt-0.5 shrink-0">→</span>
                <div>
                  <Link
                    to={path}
                    className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
                  >
                    {label}
                  </Link>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </PageLayout>
);

export default Sitemap;
