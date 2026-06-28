import { useState } from 'react';
import { Search, AlertTriangle, XCircle, CheckCircle } from 'lucide-react';

const TITLE_MIN = 50;
const TITLE_MAX = 60;
const DESC_MIN = 150;
const DESC_MAX = 160;

const PX_PER_CHAR = 5.5;
const GOOGLE_TITLE_PX = 580;
const GOOGLE_DESC_PX = 920;

const StatusBadge = ({ len, min, max }) => {
  if (len === 0) return null;
  if (len < min) return (
    <span className="flex items-center gap-1 text-xs text-yellow-600 dark:text-yellow-400">
      <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> Too short
    </span>
  );
  if (len > max) return (
    <span className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
      <XCircle className="w-3.5 h-3.5 shrink-0" /> Too long — will be truncated
    </span>
  );
  return (
    <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
      <CheckCircle className="w-3.5 h-3.5 shrink-0" /> Optimal length
    </span>
  );
};

const FieldChecker = ({ label, value, onChange, min, max, placeholder, rows = 1 }) => {
  const len = value.length;
  const tooLong = len > max;
  const perfect = len >= min && len <= max;

  const barPct = Math.min((len / max) * 100, 100);
  const barColor = tooLong ? 'bg-red-500' : perfect ? 'bg-green-500' : 'bg-yellow-500';

  return (
    <div className="mb-5">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">{label}</label>
      {rows > 1 ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="w-full p-3 text-sm text-gray-900 dark:text-white bg-white dark:bg-dark border border-gray-200 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full p-3 text-sm text-gray-900 dark:text-white bg-white dark:bg-dark border border-gray-200 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      )}

      <div className="flex items-center justify-between mt-1.5">
        <StatusBadge len={len} min={min} max={max} />
        <span className={`text-xs font-mono ${tooLong ? 'text-red-600 dark:text-red-400 font-bold' : 'text-gray-500 dark:text-gray-400'}`}>
          {len} / {max}
        </span>
      </div>

      <div className="mt-1.5 w-full h-1.5 bg-gray-200 dark:bg-dark-border rounded-full overflow-hidden">
        <div className={`h-full ${barColor} rounded-full transition-all duration-300`} style={{ width: `${barPct}%` }} />
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Optimal: {min}–{max} characters</div>
    </div>
  );
};

const GooglePreview = ({ title, description }) => (
  <div className="mt-4 p-4 bg-white dark:bg-dark rounded-lg border border-gray-200 dark:border-dark-border">
    <div className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-2 font-medium">Google Search Preview</div>
    <div className="text-blue-600 dark:text-blue-400 text-lg font-medium truncate leading-snug">
      {title || 'Page Title'}
    </div>
    <div className="text-green-700 dark:text-green-500 text-xs mt-0.5">https://yoursite.com › page</div>
    <div className="text-gray-600 dark:text-gray-400 text-sm mt-1 leading-snug" style={{
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    }}>
      {description || 'Your meta description will appear here. Make it compelling and include your target keyword.'}
    </div>
  </div>
);

const MetaChecker = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div className="section-card mt-4">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Search className="w-5 h-5 text-primary" /> Meta Tags Checker
      </h3>

      <FieldChecker
        label="Meta Title"
        value={title}
        onChange={setTitle}
        min={TITLE_MIN}
        max={TITLE_MAX}
        placeholder="Enter your page title..."
      />
      <FieldChecker
        label="Meta Description"
        value={description}
        onChange={setDescription}
        min={DESC_MIN}
        max={DESC_MAX}
        placeholder="Enter your meta description..."
        rows={3}
      />

      <GooglePreview title={title} description={description} />

      <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-gray-500 dark:text-gray-400">
        <div className="p-2 bg-gray-50 dark:bg-dark rounded">
          <span className="font-medium">Title pixels:</span>{' '}
          {Math.round(title.length * PX_PER_CHAR)} / {GOOGLE_TITLE_PX}px
        </div>
        <div className="p-2 bg-gray-50 dark:bg-dark rounded">
          <span className="font-medium">Desc pixels:</span>{' '}
          {Math.round(description.length * PX_PER_CHAR)} / {GOOGLE_DESC_PX}px
        </div>
      </div>
    </div>
  );
};

export default MetaChecker;
