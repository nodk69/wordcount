const SentenceHighlights = ({ text }) => {
  if (!text || text.trim() === '') return null;

  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];

  return (
    <div className="section-card mt-4">
      <div className="flex items-center gap-4 mb-3">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Sentence Highlights</h3>
        <div className="flex gap-3 text-xs">
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded bg-amber-200 dark:bg-amber-500/40"></span>
            Long (&gt;25 words)
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded bg-blue-200 dark:bg-blue-500/40"></span>
            Short (&lt;5 words)
          </span>
        </div>
      </div>

      <div className="text-sm leading-relaxed text-gray-800 dark:text-gray-200 max-h-48 overflow-y-auto">
        {sentences.map((sentence, i) => {
          const wordCount = (sentence.match(/\b\w+\b/g) || []).length;
          let cls = '';
          if (wordCount > 25) cls = 'highlight-long';
          else if (wordCount < 5 && wordCount > 0) cls = 'highlight-short';

          return (
            <span key={i} className={cls}>
              {sentence}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default SentenceHighlights;
