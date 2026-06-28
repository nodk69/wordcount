import { LayoutList, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const HeadingRow = ({ tag, items, color }) => (
  <div className="mb-3">
    <div className="flex items-center gap-2 mb-1.5">
      <span className={`text-xs font-bold px-2 py-0.5 rounded ${color}`}>{tag}</span>
      <span className="text-xs text-gray-500 dark:text-gray-400">{items.length} heading{items.length !== 1 ? 's' : ''}</span>
    </div>
    {items.length > 0 ? (
      <ul className="space-y-1">
        {items.map((text, i) => (
          <li key={i} className="text-sm text-gray-700 dark:text-gray-300 pl-3 border-l-2 border-gray-200 dark:border-dark-border truncate">
            {text}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-xs text-gray-500 dark:text-gray-400 pl-3">None detected</p>
    )}
  </div>
);

const SEO_TIPS = [
  {
    check: (h) => h.h1.length === 1,
    pass: { type: 'pass', msg: 'One H1 tag — correct for SEO' },
    fail: (h) => h.h1.length === 0
      ? { type: 'fail', msg: 'Missing H1 — every page needs one H1' }
      : { type: 'warn', msg: 'Multiple H1 tags — use only one H1' },
  },
  {
    check: (h) => h.h2.length > 0,
    pass: { type: 'pass', msg: 'H2 tags present — good structure' },
    fail: () => ({ type: 'warn', msg: 'No H2 tags — add subheadings for better structure' }),
  },
];

const TipIcon = ({ type }) => {
  if (type === 'pass') return <CheckCircle className="w-3.5 h-3.5 shrink-0" />;
  if (type === 'fail') return <XCircle className="w-3.5 h-3.5 shrink-0" />;
  return <AlertTriangle className="w-3.5 h-3.5 shrink-0" />;
};

const tipColor = (type) =>
  type === 'pass' ? 'text-green-600 dark:text-green-400' :
  type === 'fail' ? 'text-red-600 dark:text-red-400' :
  'text-yellow-600 dark:text-yellow-400';

const HeadingAnalysis = ({ headings }) => {
  const { h1, h2, h3 } = headings;
  const total = h1.length + h2.length + h3.length;

  const tips = SEO_TIPS
    .map((t) => t.check(headings) ? t.pass : t.fail(headings))
    .filter(Boolean);

  return (
    <div className="section-card mt-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <LayoutList className="w-5 h-5 text-primary" /> Heading Structure
        </h3>
        <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-dark px-2 py-1 rounded-full">
          {total} total heading{total !== 1 ? 's' : ''}
        </span>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
        Use markdown syntax in the editor: <code className="bg-gray-100 dark:bg-dark px-1 rounded"># H1</code>, <code className="bg-gray-100 dark:bg-dark px-1 rounded">## H2</code>, <code className="bg-gray-100 dark:bg-dark px-1 rounded">### H3</code>
      </p>

      {total === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400 py-2">
          No headings detected. Add headings with # (H1), ## (H2), or ### (H3).
        </p>
      ) : (
        <>
          <HeadingRow tag="H1" items={h1} color="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300" />
          <HeadingRow tag="H2" items={h2} color="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300" />
          <HeadingRow tag="H3" items={h3} color="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300" />
        </>
      )}

      {tips.length > 0 && (
        <div className="mt-3 space-y-1.5">
          {tips.map((t, i) => (
            <p key={i} className={`text-xs flex items-center gap-1.5 ${tipColor(t.type)}`}>
              <TipIcon type={t.type} />{t.msg}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeadingAnalysis;
