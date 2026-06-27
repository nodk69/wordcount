import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('cookieConsent')) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setVisible(false);
    if (window.adsbygoogle) (window.adsbygoogle = window.adsbygoogle || []).push({});
  };

  const decline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-dark-card border-t border-gray-200 dark:border-dark-border shadow-lg">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600 dark:text-gray-300 text-center sm:text-left">
          We use cookies to analyse traffic and improve your experience.{' '}
          <Link to="/cookie-policy" className="text-primary hover:text-primary-dark underline">
            Learn more about how we use cookies
          </Link>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={decline}
            className="btn-secondary text-sm px-4 py-2"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="btn-primary text-sm px-6 py-2"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
