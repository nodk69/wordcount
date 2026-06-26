import { useMemo, useState } from 'react';
import { getNgrams } from '../../utils/ngramAnalyzer';

const NgramTable = ({ items, label }) => {
  if (!items.length) {
    return <p className="text-sm text-gray-500 dark:text-gray-400 py-3">Not enough text to analyze {label}.</p>;
  }
  const maxCount = items[0].count;
  return (
    <div className="space-y-2">
      {items.map(({ phrase, count, density }, i) => (
        <div key={phrase} className="flex items-center gap-3 p-2.5 rounded-lg bg-gray-50 dark:bg-dark hover:bg-gray-100 dark:hover:bg-dark-border transition-colors">
          <span className="text-xs font-bold text-gray-400 w-5 shrink-0">{i + 1}</span>
          <span className="flex-1 font-medium text-gray-900 dark:text-white text-sm truncate">{phrase}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0">{count}x &nbsp;{density}%</span>
          <div className="w-16 h-1.5 bg-gray-200 dark:bg-dark-border rounded-full overflow-hidden shrink-0">
            <div
              className="h-full bg-secondary rounded-full transition-all duration-300"
              style={{ width: `${(count / maxCount) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const NgramAnalysis = ({ text }) => {
  const [activeTab, setActiveTab] = useState('bigrams');

  const bigrams = useMemo(() => getNgrams(text, 2), [text]);
  const trigrams = useMemo(() => getNgrams(text, 3), [text]);

  return (
    <div className="section-card mt-4">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
        <span aria-hidden="true">🔗</span> Phrase Analysis (N-grams)
      </h3>

      {/* Tab switcher */}
      <div className="flex gap-1 mb-4 bg-gray-100 dark:bg-dark rounded-lg p-1 w-fit">
        {[['bigrams', '2-Word Phrases'], ['trigrams', '3-Word Phrases']].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              activeTab === key
                ? 'bg-white dark:bg-dark-card text-gray-900 dark:text-white shadow-sm font-medium'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'bigrams' ? (
        <NgramTable items={bigrams} label="bigrams" />
      ) : (
        <NgramTable items={trigrams} label="trigrams" />
      )}
    </div>
  );
};

export default NgramAnalysis;
