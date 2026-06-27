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
  { check: (h) => h.h1.length === 1, pass: '✅ One H1 tag — correct for SEO', fail: (h) => h.h1.length === 0 ? '❌ Missing H1 — every page needs one H1' : '⚠️ Multiple H1 tags — use only one H1' },
  { check: (h) => h.h2.length > 0, pass: '✅ H2 tags present — good structure', fail: () => '⚠️ No H2 tags — add subheadings for better structure' },
  { check: (h) => h.h1.length + h.h2.length + h.h3.length > 0 || true, pass: '', fail: () => '' },
];

const HeadingAnalysis = ({ headings }) => {
  const { h1, h2, h3 } = headings;
  const total = h1.length + h2.length + h3.length;

  const tips = SEO_TIPS
    .map((t) => ({ msg: t.check(headings) ? t.pass : t.fail(headings), pass: t.check(headings) }))
    .filter((t) => t.msg);

  return (
    <div className="section-card mt-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <span aria-hidden="true">📑</span> Heading Structure
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

      {/* SEO Tips */}
      {tips.length > 0 && (
        <div className="mt-3 space-y-1.5">
          {tips.map((t, i) => (
            <p key={i} className={`text-xs ${t.pass ? 'text-green-600 dark:text-green-400' : t.msg.startsWith('❌') ? 'text-red-600 dark:text-red-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
              {t.msg}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeadingAnalysis;
