import { useState } from 'react';

const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
};

const ContentHistory = ({ history, onLoad, onDelete, onClear }) => {
  const [expanded, setExpanded] = useState(false);

  if (history.length === 0) return null;

  return (
    <div className="section-card mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <span aria-hidden="true">🕒</span> Content History
          <span className="text-xs font-normal bg-gray-100 dark:bg-dark text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full">
            {history.length}
          </span>
        </h2>
        <div className="flex gap-2">
          {expanded && (
            <button
              onClick={onClear}
              className="text-xs text-red-500 hover:text-red-700 dark:hover:text-red-400"
              aria-label="Clear all history"
            >
              Clear all
            </button>
          )}
          <button
            onClick={() => setExpanded((e) => !e)}
            className="text-sm text-primary hover:text-primary-dark font-medium"
          >
            {expanded ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
          {history.map((entry) => (
            <div
              key={entry.id}
              className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-dark rounded-lg hover:bg-gray-100 dark:hover:bg-dark-border transition-colors group"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 dark:text-gray-200 truncate">{entry.preview}&hellip;</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{entry.wordCount} words</span>
                  <span className="text-xs text-gray-400">{formatDate(entry.savedAt)}</span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onLoad(entry)}
                  className="text-xs text-primary hover:text-primary-dark font-medium"
                  aria-label="Load this entry into editor"
                >
                  Load
                </button>
                <button
                  onClick={() => onDelete(entry.id)}
                  className="text-xs text-red-500 hover:text-red-700"
                  aria-label="Delete this history entry"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentHistory;
