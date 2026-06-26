const tokenize = (text) =>
  text.toLowerCase().match(/\b[a-z]+\b/g) || [];

const buildTF = (words) => {
  const tf = {};
  words.forEach((w) => { tf[w] = (tf[w] || 0) + 1; });
  return tf;
};

export const cosineSimilarity = (text1, text2) => {
  const w1 = tokenize(text1);
  const w2 = tokenize(text2);
  if (!w1.length || !w2.length) return 0;

  const tf1 = buildTF(w1);
  const tf2 = buildTF(w2);
  const vocab = new Set([...Object.keys(tf1), ...Object.keys(tf2)]);

  let dot = 0, mag1 = 0, mag2 = 0;
  vocab.forEach((w) => {
    const a = tf1[w] || 0;
    const b = tf2[w] || 0;
    dot += a * b;
    mag1 += a * a;
    mag2 += b * b;
  });

  if (!mag1 || !mag2) return 0;
  return Number(((dot / (Math.sqrt(mag1) * Math.sqrt(mag2))) * 100).toFixed(1));
};

export const getSharedWords = (text1, text2) => {
  const s1 = new Set(tokenize(text1).filter((w) => w.length > 2));
  const s2 = new Set(tokenize(text2).filter((w) => w.length > 2));
  const shared = [...s1].filter((w) => s2.has(w));
  const only1 = [...s1].filter((w) => !s2.has(w));
  const only2 = [...s2].filter((w) => !s1.has(w));
  return { shared: shared.slice(0, 20), only1: only1.slice(0, 10), only2: only2.slice(0, 10) };
};
