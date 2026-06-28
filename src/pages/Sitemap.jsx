import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import { SITEMAP_SECTIONS } from '../config/navigation';

const Sitemap = () => (
  <PageLayout title="Sitemap" subtitle="Every page on CountsYourWords, in one place.">
    <div className="section-card max-w-3xl space-y-8">
      {SITEMAP_SECTIONS.map(({ title, links }) => (
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
