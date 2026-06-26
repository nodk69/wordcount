import { getReadabilityColor } from '../../utils/readability';

const fkGradeLabel = (grade) => {
  if (grade === null) return '—';
  if (grade <= 6) return `Grade ${grade} (Easy)`;
  if (grade <= 9) return `Grade ${grade} (Middle School)`;
  if (grade <= 12) return `Grade ${grade} (High School)`;
  return `Grade ${grade} (College+)`;
};

const TimeBlock = ({ label, value }) => (
  <div className="text-center p-4 bg-gray-50 dark:bg-dark rounded-lg">
    <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">{label}</div>
    <div className="text-xl font-bold text-gray-900 dark:text-white">{value || '0 sec'}</div>
  </div>
);

const getReadabilityTips = (score) => {
  if (score === 0) return [];
  const tips = [];
  if (score < 60) tips.push('Simplify long sentences — aim for under 20 words per sentence.');
  if (score < 50) tips.push('Replace complex words with simpler alternatives.');
  if (score < 40) tips.push('Break large paragraphs into shorter ones (3–5 sentences).');
  if (score >= 70) tips.push('Great readability! Your content is easy to understand.');
  return tips;
};

const ReadabilityScore = ({ readability, fkGrade, readingTime, speakingTime, writingTime }) => {
  const { score, level } = readability;
  const colorClass = getReadabilityColor(score);
  const hasText = score > 0;
  const gaugePercent = Math.min(100, Math.max(0, score));
  const tips = getReadabilityTips(score);

  return (
    <div className="section-card mt-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <span aria-hidden="true">📖</span> Readability &amp; Timing
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scores */}
        <div>
          <div className="flex items-start gap-6">
            {/* Circular gauge */}
            <div className="relative w-24 h-24 shrink-0">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="currentColor" strokeWidth="2.5"
                  className="text-gray-200 dark:text-dark-border" />
                <circle cx="18" cy="18" r="15.9" fill="none" strokeWidth="2.5"
                  strokeDasharray={`${gaugePercent} 100`}
                  className={`transition-all duration-500 ${
                    score >= 70 ? 'stroke-green-500' :
                    score >= 50 ? 'stroke-yellow-500' :
                    score >= 30 ? 'stroke-orange-500' : 'stroke-red-500'
                  }`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-2xl font-bold ${colorClass}`}>{hasText ? score : '–'}</span>
              </div>
            </div>

            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Flesch Reading Ease</div>
              <div className={`text-base font-semibold ${colorClass}`}>{level}</div>
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="font-medium">FK Grade Level: </span>
                <span className={`font-semibold ${colorClass}`}>
                  {fkGrade !== null ? `${fkGrade} — ${fkGradeLabel(fkGrade)}` : '—'}
                </span>
              </div>
              <div className="mt-2 space-y-1 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>70–100: Easy</div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-yellow-500 inline-block"></span>50–69: Moderate</div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>0–49: Difficult</div>
              </div>
            </div>
          </div>

          {/* Tips */}
          {tips.length > 0 && (
            <div className="mt-4 space-y-1.5">
              {tips.map((tip, i) => (
                <p key={i} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-1.5">
                  <span className="shrink-0 mt-0.5">💡</span>{tip}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Timing */}
        <div className="grid grid-cols-3 gap-3">
          <TimeBlock label="Reading" value={readingTime} />
          <TimeBlock label="Speaking" value={speakingTime} />
          <TimeBlock label="Handwriting" value={writingTime} />
        </div>
      </div>
    </div>
  );
};

export default ReadabilityScore;
