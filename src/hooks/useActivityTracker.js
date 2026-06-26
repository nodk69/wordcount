import { useState, useEffect, useRef } from 'react';
import { ACTIVITY_KEY, DAILY_GOAL } from '../utils/constants';

export const useActivityTracker = (wordCount) => {
  const [todayWords, setTodayWords] = useState(0);
  const initialized = useRef(false);

  useEffect(() => {
    const today = new Date().toDateString();
    const stored = JSON.parse(localStorage.getItem(ACTIVITY_KEY) || 'null');

    if (stored?.date === today) {
      setTodayWords(stored.count);
    } else {
      localStorage.setItem(ACTIVITY_KEY, JSON.stringify({ date: today, count: 0 }));
      setTodayWords(0);
    }
    initialized.current = true;
  }, []);

  useEffect(() => {
    if (!initialized.current) return;
    const today = new Date().toDateString();
    const stored = JSON.parse(localStorage.getItem(ACTIVITY_KEY) || 'null');

    if (stored?.date === today && wordCount > stored.count) {
      const updated = { date: today, count: wordCount };
      localStorage.setItem(ACTIVITY_KEY, JSON.stringify(updated));
      setTodayWords(wordCount);
    }
  }, [wordCount]);

  return { todayWords, goal: DAILY_GOAL };
};
