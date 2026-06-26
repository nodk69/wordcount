import { useEffect, useRef, useState } from 'react';
import { AUTOSAVE_KEY } from '../utils/constants';

export const useAutoSave = (text, setText) => {
  const [saveStatus, setSaveStatus] = useState('');
  const timeoutRef = useRef(null);

  // Load saved text on mount
  useEffect(() => {
    const saved = localStorage.getItem(AUTOSAVE_KEY);
    if (saved) {
      setText(saved);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Debounced save on text change
  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      localStorage.setItem(AUTOSAVE_KEY, text);
      setSaveStatus('Saved');
      setTimeout(() => setSaveStatus(''), 2000);
    }, 500);

    return () => clearTimeout(timeoutRef.current);
  }, [text]);

  return saveStatus;
};
