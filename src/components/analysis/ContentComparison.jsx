import { useState, useMemo } from 'react';
import { cosineSimilarity, getSharedWords } from '../../utils/similarity';

const SimilarityGauge = ({ score }) => {
  const color =
    score >= 70 ? 'text-red-600 dark:text-red-400' :
    score >= 40 ? 'text-yellow-600 dark:text-yellow-400' :
                  'text-green-600 dark:text-green-400';
  const label =
    score >= 70 ? 'Very Similar' :
    score >= 40 ? 'Somewhat Similar' :
    score >= 15 ? 'Slightly Similar' :
                  'Very Different';

  return (
    <div className="text-center py-4">
      <div className={`text-5xl font-bold ${color}`}>{score}%</div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{label}</div>
      <div className="w-full h-3 bg-gray-200 dark:bg-dark-border rounded-full mt-3 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            score >= 70 ? 'bg-red-500' : score >= 40 ? 'bg-yellow-500' : 'bg-green-500'
          }`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
};

const WordBadges = ({ words, color }) =>
  words.length > 0 ? (
    <div className="flex flex-wrap gap-1.5">
      {words.map((w) => (
        <span key={w} className={`text-xs px-2 py-0.5 rounded-full ${color}`}>{w}</span>
      ))}
    </div>
  ) : (
    <span className="text-xs text-gray-500 dark:text-gray-400">None</span>
  );

const ContentComparison = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');

  const canCompare = text1.trim().length > 0 && text2.trim().length > 0;

  const similarity = useMemo(
    () => (canCompare ? cosineSimilarity(text1, text2) : null),
    [text1, text2, canCompare]
  );

  const wordSets = useMemo(
    () => (canCompare ? getSharedWords(text1, text2) : null),
    [text1, text2, canCompare]
  );

  return (
    <div className="section-card mt-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <span aria-hidden="true">⚖️</span> Content Comparison
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Paste two pieces of text to compare their similarity (useful for checking duplicate content).
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1 block">
            Text A
          </label>
          <textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="Paste first text here..."
            className="w-full h-32 p-3 text-sm text-gray-900 dark:text-white bg-white dark:bg-dark border border-gray-200 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{text1.split(/\s+/).filter(Boolean).length} words</div>
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1 block">
            Text B
          </label>
          <textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder="Paste second text here..."
            className="w-full h-32 p-3 text-sm text-gray-900 dark:text-white bg-white dark:bg-dark border border-gray-200 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{text2.split(/\s+/).filter(Boolean).length} words</div>
        </div>
      </div>

      {canCompare && similarity !== null && (
        <>
          <SimilarityGauge score={similarity} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase mb-2">
                Shared Words ({wordSets.shared.length})
              </div>
              <WordBadges
                words={wordSets.shared}
                color="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200"
              />
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-xs font-medium text-green-600 dark:text-green-400 uppercase mb-2">
                Only in Text A ({wordSets.only1.length})
              </div>
              <WordBadges
                words={wordSets.only1}
                color="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200"
              />
            </div>
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-xs font-medium text-purple-600 dark:text-purple-400 uppercase mb-2">
                Only in Text B ({wordSets.only2.length})
              </div>
              <WordBadges
                words={wordSets.only2}
                color="bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200"
              />
            </div>
          </div>
        </>
      )}

      {!canCompare && (
        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
          <div className="text-3xl mb-2">⚖️</div>
          <p className="text-sm">Enter text in both boxes to compare similarity</p>
        </div>
      )}
    </div>
  );
};

export default ContentComparison;
