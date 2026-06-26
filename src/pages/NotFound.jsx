import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';

const NotFound = () => {
  usePageMeta({ title: 'Page Not Found', path: '/404' });

  return (
    <div className="min-h-screen flex items-center justify-center bg-light dark:bg-dark px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-8xl font-extrabold text-primary mb-4 leading-none">404</div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Page Not Found
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back to counting words.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { to: '/',              label: 'Word Counter' },
            { to: '/blog',         label: 'Blog' },
            { to: '/writing-tips', label: 'Writing Tips' },
            { to: '/faq',          label: 'FAQ' },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="px-4 py-3 rounded-lg border border-gray-200 dark:border-dark-border text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-primary hover:text-primary transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        <Link to="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
