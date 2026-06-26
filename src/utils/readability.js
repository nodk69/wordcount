const countSyllablesWord = (word) => {
  const normalized = word.toLowerCase().replace(/[^a-z]/g, '');
  if (normalized.length === 0) return 0;
  if (normalized.length <= 3) return 1;

  let adjusted = normalized;
  // Remove silent trailing e
  if (adjusted.endsWith('e')) {
    adjusted = adjusted.slice(0, -1);
  }
  // Remove trailing ed if not ending in t or d
  if (adjusted.endsWith('ed') && !['t','d'].includes(adjusted[adjusted.length - 3])) {
    adjusted = adjusted.slice(0, -2);
  }

  const vowelGroups = adjusted.match(/[aeiouy]+/g);
  let count = vowelGroups ? vowelGroups.length : 1;

  // le at end adds a syllable
  if (normalized.endsWith('le') && normalized.length > 2 &&
      !'aeiou'.includes(normalized[normalized.length - 3])) {
    count += 1;
  }

  return Math.max(1, count);
};

export const countSyllables = (text) => {
  const words = text.match(/\b[a-zA-Z]+\b/g) || [];
  return words.reduce((sum, word) => sum + countSyllablesWord(word), 0);
};

export const getReadabilityLevel = (score) => {
  if (score >= 90) return 'Very Easy (5th grade)';
  if (score >= 80) return 'Easy (6th grade)';
  if (score >= 70) return 'Fairly Easy (7th grade)';
  if (score >= 60) return 'Standard (8th-9th grade)';
  if (score >= 50) return 'Fairly Difficult (10th-12th grade)';
  if (score >= 30) return 'Difficult (College)';
  return 'Very Confusing (College Graduate)';
};

export const getReadabilityColor = (score) => {
  if (score >= 70) return 'text-green-600 dark:text-green-400';
  if (score >= 50) return 'text-yellow-600 dark:text-yellow-400';
  if (score >= 30) return 'text-orange-600 dark:text-orange-400';
  return 'text-red-600 dark:text-red-400';
};
