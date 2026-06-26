import { countSyllables, getReadabilityLevel } from './readability';
import {
  STOP_WORDS,
  READING_SPEED,
  SPEAKING_SPEED,
  HANDWRITING_SPEED,
  WORDS_PER_PAGE,
} from './constants';
import { formatTime, roundTo } from './helpers';

const EMPTY_STATS = {
  words: 0,
  uniqueWords: 0,
  characters: 0,
  charactersNoSpace: 0,
  sentences: 0,
  longestSentence: 0,
  shortestSentence: 0,
  avgSentenceWords: 0,
  avgSentenceChars: 0,
  avgWordLength: 0,
  paragraphs: 0,
  pages: 0,
  syllables: 0,
  lines: 0,
  stopWordsCount: 0,
  readingTime: '0 sec',
  speakingTime: '0 sec',
  writingTime: '0 sec',
  readability: { score: 0, level: 'No text' },
  fkGrade: null,
  headings: { h1: [], h2: [], h3: [] },
  keywords: [],
};

const getSentenceLengths = (text) => {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  return sentences.map((s) => (s.match(/\b\w+\b/g) || []).length).filter((n) => n > 0);
};

const calculateFlesch = (wordCount, sentenceCount, syllables) => {
  if (wordCount === 0 || sentenceCount === 0) return { score: 0, level: 'No text' };
  const raw = 206.835 - 1.015 * (wordCount / sentenceCount) - 84.6 * (syllables / wordCount);
  const score = Math.max(0, Math.min(100, Math.round(raw)));
  return { score, level: getReadabilityLevel(score) };
};

const calculateFKGrade = (wordCount, sentenceCount, syllables) => {
  if (wordCount === 0 || sentenceCount === 0) return null;
  const grade = 0.39 * (wordCount / sentenceCount) + 11.8 * (syllables / wordCount) - 15.59;
  return roundTo(Math.max(0, grade), 1);
};

const getKeywordDensity = (text, totalWords) => {
  if (totalWords === 0) return [];
  const words = text.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
  const filtered = words.filter((w) => !STOP_WORDS.has(w));
  if (filtered.length === 0) return [];

  const freq = {};
  filtered.forEach((w) => { freq[w] = (freq[w] || 0) + 1; });

  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word, count]) => ({
      word,
      count,
      density: roundTo((count / totalWords) * 100, 2),
    }));
};

// Detect markdown-style headings: # H1, ## H2, ### H3
const extractHeadings = (text) => {
  const lines = text.split('\n');
  const headings = { h1: [], h2: [], h3: [] };
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (/^### /.test(trimmed)) headings.h3.push(trimmed.slice(4).trim());
    else if (/^## /.test(trimmed)) headings.h2.push(trimmed.slice(3).trim());
    else if (/^# /.test(trimmed)) headings.h1.push(trimmed.slice(2).trim());
  });
  return headings;
};

export const analyzeText = (text) => {
  if (!text || text.trim() === '') return EMPTY_STATS;

  const words = text.match(/\b\w+\b/g) || [];
  const wordCount = words.length;

  const uniqueWords = new Set(words.map((w) => w.toLowerCase())).size;
  const characters = text.length;
  const charactersNoSpace = text.replace(/\s/g, '').length;

  // Stop words count
  const stopWordsCount = words.filter((w) => STOP_WORDS.has(w.toLowerCase())).length;

  const sentenceMatches = text.match(/[^.!?]*[.!?]+/g) || [];
  const sentenceCount =
    sentenceMatches.filter((s) => s.trim().length > 0).length || (wordCount > 0 ? 1 : 0);

  const sentenceLengths = getSentenceLengths(text);
  const longestSentence = sentenceLengths.length > 0 ? Math.max(...sentenceLengths) : 0;
  const shortestSentence = sentenceLengths.length > 0 ? Math.min(...sentenceLengths) : 0;

  const avgSentenceWords = sentenceCount > 0 ? roundTo(wordCount / sentenceCount, 1) : 0;
  const avgSentenceChars = sentenceCount > 0 ? roundTo(charactersNoSpace / sentenceCount, 1) : 0;
  const avgWordLength = wordCount > 0 ? roundTo(charactersNoSpace / wordCount, 1) : 0;

  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length;
  const lines = text.split('\n').filter((l) => l.trim().length > 0).length;
  const pages = roundTo(wordCount / WORDS_PER_PAGE, 1);

  const syllables = countSyllables(text);
  const readability = calculateFlesch(wordCount, sentenceCount, syllables);
  const fkGrade = calculateFKGrade(wordCount, sentenceCount, syllables);

  const readingTime = formatTime(wordCount / READING_SPEED);
  const speakingTime = formatTime(wordCount / SPEAKING_SPEED);
  const writingTime = formatTime(wordCount / HANDWRITING_SPEED);

  const keywords = getKeywordDensity(text, wordCount);
  const headings = extractHeadings(text);

  return {
    words: wordCount,
    uniqueWords,
    characters,
    charactersNoSpace,
    sentences: sentenceCount,
    longestSentence,
    shortestSentence,
    avgSentenceWords,
    avgSentenceChars,
    avgWordLength,
    paragraphs,
    pages,
    syllables,
    lines,
    stopWordsCount,
    readingTime,
    speakingTime,
    writingTime,
    readability,
    fkGrade,
    headings,
    keywords,
  };
};
