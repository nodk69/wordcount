import { useState, useCallback } from 'react';

const HISTORY_KEY = 'wordcounter_history';
const MAX_ENTRIES = 20;
const MAX_STORED_CHARS = 5000; // cap stored text per entry to avoid localStorage limits

const loadHistory = () => {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
};

export const useContentHistory = () => {
  const [history, setHistory] = useState(loadHistory);

  const saveEntry = useCallback((text, wordCount) => {
    if (!text.trim() || wordCount < 5) return;
    const preview = text.slice(0, 120).replace(/\n/g, ' ');
    const entry = {
      id: Date.now(),
      preview,
      fullText: text.slice(0, MAX_STORED_CHARS),
      wordCount,
      savedAt: new Date().toISOString(),
    };
    setHistory((prev) => {
      // Deduplicate by preview
      const deduped = prev.filter((e) => e.preview !== preview);
      const updated = [entry, ...deduped].slice(0, MAX_ENTRIES);
      try { localStorage.setItem(HISTORY_KEY, JSON.stringify(updated)); } catch {}
      return updated;
    });
  }, []);

  const deleteEntry = useCallback((id) => {
    setHistory((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      try { localStorage.setItem(HISTORY_KEY, JSON.stringify(updated)); } catch {}
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    localStorage.removeItem(HISTORY_KEY);
    setHistory([]);
  }, []);

  return { history, saveEntry, deleteEntry, clearHistory };
};
