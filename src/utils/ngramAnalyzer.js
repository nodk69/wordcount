import { STOP_WORDS } from './constants';

const tokenize = (text) =>
  text.toLowerCase().match(/\b[a-z]{2,}\b/g) || [];

export const getNgrams = (text, n, topK = 10) => {
  const words = tokenize(text);
  if (words.length < n) return [];

  const freq = {};
  for (let i = 0; i <= words.length - n; i++) {
    const gram = words.slice(i, i + n);
    // Skip if every word is a stop word
    if (gram.every((w) => STOP_WORDS.has(w))) continue;
    const key = gram.join(' ');
    freq[key] = (freq[key] || 0) + 1;
  }

  const total = words.length - n + 1;
  return Object.entries(freq)
    .filter(([, c]) => c > 1)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topK)
    .map(([phrase, count]) => ({
      phrase,
      count,
      density: Number(((count / total) * 100).toFixed(2)),
    }));
};
