import { useEffect } from 'react';
import {
  SITE_NAME,
  BASE_URL,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  TWITTER_HANDLE,
} from '../config/seo';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Sets one attribute on a <meta> or <link> element and returns a cleanup
 * function that fully restores the previous DOM state on unmount:
 *   - If the element did not exist before  → it is removed.
 *   - If it existed but had no prior value  → the attribute is removed.
 *   - If it existed with a prior value      → the prior value is restored.
 *
 * This prevents description / canonical / OG tag values from leaking from
 * one page into the next when navigating in a SPA.
 */
const applyMeta = (selector, attrName, value, createElement) => {
  if (value == null) return () => {};

  let el      = document.querySelector(selector);
  const existed = Boolean(el);
  const prev    = existed ? el.getAttribute(attrName) : null;

  if (!el) {
    el = createElement();
    document.head.appendChild(el);
  }
  el.setAttribute(attrName, value);

  return () => {
    if (!document.head.contains(el)) return;
    if (!existed) {
      el.remove();
    } else if (prev !== null) {
      el.setAttribute(attrName, prev);
    } else {
      el.removeAttribute(attrName);
    }
  };
};

// <meta name="…" content="…">
const metaName = (name, content) =>
  applyMeta(
    `meta[name="${name}"]`,
    'content',
    content,
    () => Object.assign(document.createElement('meta'), { name }),
  );

// <meta property="…" content="…">
const metaProp = (property, content) =>
  applyMeta(
    `meta[property="${property}"]`,
    'content',
    content,
    () => {
      const el = document.createElement('meta');
      el.setAttribute('property', property);
      return el;
    },
  );

// <link rel="canonical" href="…">
const applyCanonical = (href) =>
  applyMeta(
    'link[rel="canonical"]',
    'href',
    href,
    () => {
      const el = document.createElement('link');
      el.setAttribute('rel', 'canonical');
      return el;
    },
  );

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * usePageMeta({ title, description, path, ogImage, ogType })
 *
 * Sets all head meta tags for a page and restores previous values on unmount.
 * All parameters are optional — omitting one falls back to a site-wide default.
 *
 * Backward-compatible: existing call sites using only { title } continue to
 * work; they now also get correct OG/Twitter tags and default description.
 */
export const usePageMeta = ({
  title,
  description,
  path,
  ogImage,
  ogType = 'website',
} = {}) => {
  useEffect(() => {
    const fullTitle   = title
      ? `${title} | ${SITE_NAME}`
      : `${SITE_NAME} — Free Online Word Counter`;
    const desc        = description || DEFAULT_DESCRIPTION;
    const canonicalUrl = BASE_URL + (path || window.location.pathname);
    const image       = ogImage || DEFAULT_OG_IMAGE;

    const prevTitle = document.title;
    document.title  = fullTitle;

    const cleanups = [
      // Canonical
      applyCanonical(canonicalUrl),
      // Standard
      metaName('description', desc),
      // Open Graph
      metaProp('og:type',        ogType),
      metaProp('og:title',       fullTitle),
      metaProp('og:description', desc),
      metaProp('og:url',         canonicalUrl),
      metaProp('og:image',       image),
      // Twitter Cards
      metaName('twitter:card',        'summary_large_image'),
      metaName('twitter:site',        TWITTER_HANDLE),
      metaName('twitter:title',       fullTitle),
      metaName('twitter:description', desc),
      metaName('twitter:image',       image),
    ];

    return () => {
      document.title = prevTitle;
      cleanups.forEach((fn) => fn());
    };
  }, [title, description, path, ogImage, ogType]);
};
