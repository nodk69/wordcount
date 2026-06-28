import { BarChart2 } from 'lucide-react';

const getRecommendation = (density) => {
  if (density > 5) return { text: 'Too high — risk of keyword stuffing', color: 'text-red-600 dark:text-red-400' };
  if (density > 3) return { text: 'Slightly high — reduce slightly for naturalness', color: 'text-orange-600 dark:text-orange-400' };
  if (density >= 1) return { text: 'Optimal density (1–3%)', color: 'text-green-600 dark:text-green-400' };
  if (density > 0) return { text: 'Low density — consider using more', color: 'text-yellow-600 dark:text-yellow-400' };
  return null;
};

const KeywordDensity = ({ keywords }) => {
  if (!keywords || keywords.length === 0) {
    return (
      <div className="section-card mt-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-primary" /> Top Keywords
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
          Start typing to see keyword analysis...
        </p>
      </div>
    );
  }

  const maxCount = keywords[0]?.count || 1;

  return (
    <div className="section-card mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-primary" /> Top Keywords
        </h2>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Ideal density: 1–3%
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {keywords.map(({ word, count, density }, index) => {
          const rec = getRecommendation(density);
          return (
            <div
              key={word}
              className="p-2.5 rounded-lg bg-gray-50 dark:bg-dark hover:bg-gray-100 dark:hover:bg-dark-border transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 w-5 shrink-0">{index + 1}</span>
                <span className="font-medium text-gray-900 dark:text-white flex-1 truncate">{word}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0">{count}x &nbsp;{density}%</span>
                <div className="w-16 h-1.5 bg-gray-200 dark:bg-dark-border rounded-full overflow-hidden shrink-0">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${(count / maxCount) * 100}%` }}
                    role="progressbar"
                    aria-valuenow={count}
                    aria-valuemax={maxCount}
                    aria-label={`${word} frequency`}
                  />
                </div>
              </div>
              {rec && (
                <p className={`text-xs mt-1 pl-8 ${rec.color}`}>{rec.text}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KeywordDensity;
