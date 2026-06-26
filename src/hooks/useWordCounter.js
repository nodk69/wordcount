import { useMemo } from 'react';
import { analyzeText } from '../utils/textAnalyzer';

export const useWordCounter = (text) => {
  const stats = useMemo(() => analyzeText(text), [text]);
  return stats;
};
