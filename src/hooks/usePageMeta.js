import { useEffect } from 'react';

const SITE_NAME = 'CountsYourWords';
const BASE_URL = 'https://countsyourwords.netlify.app';

export const usePageMeta = ({ title, description, path } = {}) => {
  useEffect(() => {
    const prev = document.title;

    document.title = title
      ? `${title} | ${SITE_NAME}`
      : `${SITE_NAME} - Free Online Word Counter`;

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', BASE_URL + (path || window.location.pathname));

    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', description);
    }

    return () => {
      document.title = prev;
    };
  }, [title, description, path]);
};
