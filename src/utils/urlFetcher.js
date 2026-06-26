const PROXIES = [
  {
    build: (url) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
    extract: async (res) => res.text(),
  },
  {
    build: (url) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
    extract: async (res) => res.text(),
  },
  {
    build: (url) => `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
    extract: async (res) => { const j = await res.json(); return j.contents || ''; },
  },
];

const REMOVE_TAGS = [
  'script', 'style', 'noscript', 'nav', 'header', 'footer',
  'aside', 'form', 'button', 'select', 'option', 'iframe', 'svg',
  'figure', 'picture', 'video', 'audio', 'canvas',
];

const htmlToText = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  REMOVE_TAGS.forEach((tag) => doc.querySelectorAll(tag).forEach((el) => el.remove()));
  const body = doc.body || doc.documentElement;
  const raw = body.innerText || body.textContent || '';
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

export const fetchUrlText = async (url) => {
  let normalized = url.trim();
  if (!/^https?:\/\//i.test(normalized)) normalized = 'https://' + normalized;

  let lastError = null;

  for (const proxy of PROXIES) {
    try {
      const res = await fetch(proxy.build(normalized), { signal: AbortSignal.timeout(10000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await proxy.extract(res);
      if (!html) throw new Error('Empty response');
      const text = htmlToText(html);
      if (!text) throw new Error('No readable text found');
      return text;
    } catch (err) {
      lastError = err;
    }
  }

  throw new Error(
    lastError?.name === 'TimeoutError'
      ? 'Request timed out. The URL may be too slow or blocked.'
      : 'Could not fetch the URL. It may block automated access or require a login.'
  );
};
