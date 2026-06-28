import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { BarChart2, AlertCircle, Lightbulb, BookOpen, Info, Upload, Code2, ShieldCheck, GitBranch, ArrowUpDown, Download, ChevronDown } from 'lucide-react';

// ─── Example ──────────────────────────────────────────────────────────────────

const EXAMPLE = JSON.stringify(
  {
    name: 'John Doe', age: 30, email: 'john@example.com',
    address: { street: '123 Main St', city: 'New York', state: 'NY', zip: '10001' },
    interests: ['coding', 'reading', 'traveling'],
    isActive: true,
    profile: {
      bio: 'Software developer with 10 years of experience',
      skills: ['JavaScript', 'Python', 'React', 'Node.js'],
      social: { twitter: '@johndoe', linkedin: 'johndoe' },
    },
    metadata: { created: '2024-01-15T10:30:00Z', updated: '2024-06-27T14:20:00Z', version: 2 },
  },
  null, 2
);

// ─── Utilities ────────────────────────────────────────────────────────────────

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function highlightLine(line) {
  const re =
    /("(?:[^"\\]|\\.)*")(\s*:)?|(\btrue\b|\bfalse\b|\bnull\b)|(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)/g;
  let out = '', last = 0, m;
  while ((m = re.exec(line)) !== null) {
    if (m.index > last) out += esc(line.slice(last, m.index));
    const [, str, colon, kw, num] = m;
    if (str !== undefined) {
      const s = esc(str);
      out +=
        colon !== undefined
          ? `<span class="jf-key">${s}</span>${esc(colon)}`
          : `<span class="jf-str">${s}</span>`;
    } else if (kw !== undefined) {
      out += `<span class="${kw === 'null' ? 'jf-null' : 'jf-bool'}">${kw}</span>`;
    } else if (num !== undefined) {
      out += `<span class="jf-num">${num}</span>`;
    }
    last = re.lastIndex;
  }
  if (last < line.length) out += esc(line.slice(last));
  return out;
}

const indentStr = (v) => (v === 'tab' ? '\t' : ' '.repeat(Number(v)));

const fmtBytes = (b) =>
  b < 1024 ? `${b} B` : b < 1048576 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1048576).toFixed(2)} MB`;

function calcStats(data, raw) {
  const size = new Blob([raw]).size;
  let topKeys = 0, props = 0, maxD = 0, arrs = 0, objs = 0, strs = 0, nums = 0, bools = 0, nulls = 0;
  const walk = (node, d) => {
    maxD = Math.max(maxD, d);
    if (Array.isArray(node)) {
      arrs++;
      if (d === 0) topKeys = node.length;
      node.forEach((v) => walk(v, d + 1));
    } else if (node !== null && typeof node === 'object') {
      objs++;
      const ks = Object.keys(node);
      if (d === 0) topKeys = ks.length;
      props += ks.length;
      ks.forEach((k) => walk(node[k], d + 1));
    } else if (typeof node === 'string') strs++;
    else if (typeof node === 'number') nums++;
    else if (typeof node === 'boolean') bools++;
    else if (node === null) nulls++;
  };
  walk(data, 0);
  return { size, topKeys, props, maxD, arrs, objs, strs, nums, bools, nulls };
}

const deepSortKeys = (v) => {
  if (Array.isArray(v)) return v.map(deepSortKeys);
  if (v !== null && typeof v === 'object')
    return Object.keys(v)
      .sort()
      .reduce((a, k) => { a[k] = deepSortKeys(v[k]); return a; }, {});
  return v;
};

const deepRemoveNulls = (v) => {
  if (Array.isArray(v)) return v.filter((x) => x !== null).map(deepRemoveNulls);
  if (v !== null && typeof v === 'object')
    return Object.fromEntries(
      Object.entries(v).filter(([, x]) => x !== null).map(([k, x]) => [k, deepRemoveNulls(x)])
    );
  return v;
};

function getErrInfo(err, raw) {
  const msg = err.message;
  let line = null, col = null;
  const pm = msg.match(/at position (\d+)/);
  const lm = msg.match(/line (\d+)/);
  const cm = msg.match(/column (\d+)/);
  if (lm) line = +lm[1];
  if (cm) col = +cm[1];
  if (pm && !line) {
    const before = raw.slice(0, +pm[1]).split('\n');
    line = before.length;
    col = before[before.length - 1].length + 1;
  }
  const lo = msg.toLowerCase();
  let hint = 'Verify JSON structure — check for missing commas, brackets, or quotes.';
  if (lo.includes('trailing comma') || lo.includes('unexpected token }') || lo.includes('unexpected token ]'))
    hint = 'Remove the trailing comma before the closing bracket or brace.';
  else if (lo.includes('unexpected token') || lo.includes('unexpected non-whitespace'))
    hint = 'Check for missing quotes around keys or unexpected characters.';
  else if (lo.includes('unterminated string'))
    hint = 'Ensure all strings are properly closed with a double-quote.';
  else if (lo.includes('end of') || lo.includes('expected property'))
    hint = 'Look for missing closing brackets, braces, or a dangling value.';
  return { line, col, hint, raw: msg };
}

// ─── Tree view ────────────────────────────────────────────────────────────────

const Prim = ({ v }) => {
  if (v === null) return <span className="text-red-500 dark:text-red-400">null</span>;
  if (typeof v === 'boolean') return <span className="text-violet-600 dark:text-violet-400">{String(v)}</span>;
  if (typeof v === 'number') return <span className="text-orange-600 dark:text-orange-400">{v}</span>;
  return <span className="text-green-600 dark:text-green-400 break-all">"{v}"</span>;
};

const TreeNode = ({ data, label, depth = 0, last = true }) => {
  const isArr = Array.isArray(data);
  const isObj = !isArr && data !== null && typeof data === 'object';
  const [open, setOpen] = useState(depth < 2);

  const entries = useMemo(() => {
    if (isArr) return data.map((v, i) => [i, v]);
    if (isObj) return Object.entries(data);
    return null;
  }, [data, isArr, isObj]);

  if (!entries) {
    return (
      <div className="flex flex-wrap items-baseline gap-1 leading-6 text-sm">
        {label !== undefined && (
          <>
            <span className="text-blue-700 dark:text-blue-300 font-medium">"{label}"</span>
            <span className="text-gray-500">: </span>
          </>
        )}
        <Prim v={data} />
        {!last && <span className="text-gray-400">,</span>}
      </div>
    );
  }

  const br = isArr ? ['[', ']'] : ['{', '}'];
  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => e.key === 'Enter' && setOpen((o) => !o)}
        className="flex items-baseline gap-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-border rounded px-0.5 leading-6 text-sm select-none"
      >
        <span className="text-gray-400 w-3 text-[10px] shrink-0">{open ? '▼' : '▶'}</span>
        {label !== undefined && (
          <>
            <span className="text-blue-700 dark:text-blue-300 font-medium">"{label}"</span>
            <span className="text-gray-500">: </span>
          </>
        )}
        <span className="text-gray-700 dark:text-gray-300">{br[0]}</span>
        {!open && (
          <span className="text-gray-400 text-xs ml-1">
            {entries.length} {isArr ? 'item' : 'prop'}{entries.length !== 1 ? 's' : ''}
          </span>
        )}
        {!open && (
          <>
            <span className="text-gray-700 dark:text-gray-300">{br[1]}</span>
            {!last && <span className="text-gray-400">,</span>}
          </>
        )}
      </div>
      {open && (
        <>
          <div className="ml-3 border-l-2 border-gray-200 dark:border-dark-border pl-2 mt-0.5">
            {entries.map(([k, v], i) => (
              <TreeNode
                key={i}
                data={v}
                label={isObj ? k : undefined}
                depth={depth + 1}
                last={i === entries.length - 1}
              />
            ))}
          </div>
          <div className="leading-6 text-sm">
            <span className="text-gray-700 dark:text-gray-300">{br[1]}</span>
            {!last && <span className="text-gray-400">,</span>}
          </div>
        </>
      )}
    </div>
  );
};

// ─── About accordion item ─────────────────────────────────────────────────────

const AboutItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 dark:border-dark-border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-left bg-gray-50 dark:bg-dark hover:bg-gray-100 dark:hover:bg-dark-border transition-colors"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-gray-900 dark:text-white">{q}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed px-4 pb-4 pt-2 bg-white dark:bg-dark-card">
          {a}
        </p>
      </div>
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

const JsonFormatter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [parsed, setParsed] = useState(null);
  const [error, setError] = useState(null);
  const [isValid, setIsValid] = useState(null);
  const [stats, setStats] = useState(null);
  const [indent, setIndent] = useState(2);
  const [viewMode, setViewMode] = useState('highlighted');
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [validateStatus, setValidateStatus] = useState(null); // null | 'valid'

  const fileRef = useRef(null);
  const validTimer = useRef(null);
  const inputTextareaRef = useRef(null);
  const inputLineNumRef = useRef(null);

  // SEO meta tags
  useEffect(() => {
    const prev = document.title;
    document.title = 'JSON Formatter & Validator — Free Online Tool | CountsYourWords';

    const setMeta = (k, v, attr = 'name') => {
      let el = document.querySelector(`meta[${attr}="${k}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, k); document.head.appendChild(el); }
      el.setAttribute('content', v);
    };
    setMeta('description', 'Free online JSON formatter and validator. Format, validate, and beautify JSON with syntax highlighting, collapsible tree view, and smart error detection. Perfect for developers and API testing.');
    setMeta('keywords', 'json formatter, json validator, json beautifier, json prettifier, json parser, json viewer, online json tool');
    setMeta('og:title', 'JSON Formatter & Validator — Free Online Tool', 'property');
    setMeta('og:description', 'Format, validate, and beautify JSON with syntax highlighting, tree view, and error detection.', 'property');
    setMeta('og:type', 'website', 'property');

    let can = document.querySelector('link[rel="canonical"]');
    if (!can) { can = document.createElement('link'); can.rel = 'canonical'; document.head.appendChild(can); }
    can.href = 'https://countsyourwords.netlify.app/json-formatter';

    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.id = 'jf-ld';
    ld.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'JSON Formatter & Validator',
      url: 'https://countsyourwords.netlify.app/json-formatter',
      description: 'Free online JSON formatter and validator with syntax highlighting, collapsible tree view, and error detection.',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'All',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    });
    document.head.appendChild(ld);

    return () => {
      document.title = prev;
      document.getElementById('jf-ld')?.remove();
    };
  }, []);

  // Load JSON from URL ?data= param on mount
  useEffect(() => {
    const d = new URLSearchParams(window.location.search).get('data');
    if (d) {
      try { setInput(decodeURIComponent(atob(d))); } catch {}
    }
  }, []);

  // Debounced realtime validity indicator; clear any validate-only result on new input
  useEffect(() => {
    clearTimeout(validTimer.current);
    setValidateStatus(null);
    if (!input.trim()) { setIsValid(null); return; }
    validTimer.current = setTimeout(() => {
      try { JSON.parse(input); setIsValid(true); } catch { setIsValid(false); }
    }, 350);
    return () => clearTimeout(validTimer.current);
  }, [input]);

  const doFormat = useCallback((raw, ind) => {
    if (!raw.trim()) return;
    try {
      const p = JSON.parse(raw);
      const fmt = JSON.stringify(p, null, indentStr(ind));
      setOutput(fmt); setParsed(p); setIsValid(true); setError(null);
      setStats(calcStats(p, raw));
    } catch (e) {
      setError(getErrInfo(e, raw)); setIsValid(false);
    }
  }, []);

  // Ctrl/Cmd+Enter → format
  useEffect(() => {
    const h = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); doFormat(input, indent); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [doFormat, input, indent]);

  const handleFormat = () => doFormat(input, indent);

  const handleMinify = () => {
    if (!input.trim()) return;
    try {
      const p = JSON.parse(input);
      setOutput(JSON.stringify(p)); setParsed(p); setIsValid(true); setError(null);
      setStats(calcStats(p, input));
    } catch (e) { setError(getErrInfo(e, input)); setIsValid(false); }
  };

  const handleValidate = () => {
    if (!input.trim()) return;
    try {
      JSON.parse(input);
      setIsValid(true); setError(null); setValidateStatus('valid');
    } catch (e) { setError(getErrInfo(e, input)); setIsValid(false); setValidateStatus(null); }
  };

  const handleSortKeys = () => {
    if (!parsed) return;
    const s = deepSortKeys(parsed);
    const fmt = JSON.stringify(s, null, indentStr(indent));
    setInput(fmt); setOutput(fmt); setParsed(s); setStats(calcStats(s, fmt));
  };

  const handleRemoveNulls = () => {
    if (!parsed) return;
    const c = deepRemoveNulls(parsed);
    const fmt = JSON.stringify(c, null, indentStr(indent));
    setInput(fmt); setOutput(fmt); setParsed(c); setStats(calcStats(c, fmt));
  };

  const handleClear = () => {
    setInput(''); setOutput(''); setParsed(null);
    setError(null); setIsValid(null); setStats(null);
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    if (!output) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([output], { type: 'application/json' }));
    a.download = 'formatted.json';
    a.click();
  };

  const handleShare = () => {
    if (!input.trim()) return;
    if (input.length > 20000) { alert('JSON is too large to share via URL. Download the file instead.'); return; }
    try {
      const url = `${window.location.origin}/json-formatter?data=${btoa(encodeURIComponent(input))}`;
      navigator.clipboard.writeText(url).then(() => { setShared(true); setTimeout(() => setShared(false), 2000); });
    } catch {}
  };

  const readFile = (file) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { alert('File too large. Maximum size is 10 MB.'); return; }
    const r = new FileReader();
    r.onload = (e) => setInput(e.target.result);
    r.readAsText(file);
  };

  const hlLines = useMemo(
    () => (output ? output.split('\n').map(highlightLine) : []),
    [output]
  );

  const statusCls =
    isValid === true ? 'text-green-600 dark:text-green-400' :
    isValid === false ? 'text-red-600 dark:text-red-400' :
    'text-gray-400 dark:text-gray-500';
  const statusTxt =
    isValid === true ? '✓ Valid JSON' :
    isValid === false ? '✕ Invalid JSON' :
    'Paste JSON to begin';

  const panelBase =
    'bg-white dark:bg-dark-card rounded-xl shadow-sm border overflow-hidden flex flex-col transition-colors duration-200';
  const panelBorder = dragging
    ? 'border-primary'
    : 'border-gray-100 dark:border-dark-border';

  return (
    <div className="min-h-screen flex flex-col bg-light dark:bg-dark transition-colors duration-200">
      <Navbar />
      <main id="main-content" className="flex-1 w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4">

        {/* Heading */}
        <div className="mb-4 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2 flex-wrap">
            <span className="text-green-500 font-mono leading-none">{'{}'}</span>
            <span><span className="text-green-500">JSON</span> Formatter &amp; Validator</span>
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Instantly format, validate, and beautify JSON — free &amp; 100% browser-based.
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          {/* File ops */}
          <button
            onClick={() => fileRef.current?.click()}
            className="btn-secondary !px-3 !py-1.5 !text-xs flex items-center gap-1"
            aria-label="Upload JSON file"
          >
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Upload
          </button>
          <input
            ref={fileRef}
            type="file"
            accept=".json,application/json,text/plain"
            className="hidden"
            onChange={(e) => readFile(e.target.files[0])}
            aria-hidden="true"
          />
          <button onClick={() => setInput(EXAMPLE)} className="btn-secondary !px-3 !py-1.5 !text-xs">Example</button>
          <button onClick={handleClear} className="btn-secondary !px-3 !py-1.5 !text-xs">Clear</button>

          <div className="h-5 w-px bg-gray-200 dark:bg-dark-border mx-0.5 hidden sm:block" aria-hidden="true" />

          {/* Actions */}
          <button onClick={handleFormat} className="btn-primary !px-3 !py-1.5 !text-xs flex items-center gap-1">
            Format JSON
            <kbd className="text-[9px] opacity-60 font-normal bg-blue-800/30 px-1 py-0.5 rounded hidden sm:inline">
              Ctrl+↵
            </kbd>
          </button>
          <button onClick={handleMinify} className="btn-secondary !px-3 !py-1.5 !text-xs">Minify</button>
          <button onClick={handleValidate} className="btn-secondary !px-3 !py-1.5 !text-xs">Validate</button>
          <button
            onClick={handleSortKeys}
            disabled={!parsed}
            className="btn-secondary !px-3 !py-1.5 !text-xs disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Sort Keys
          </button>
          <button
            onClick={handleRemoveNulls}
            disabled={!parsed}
            className="btn-secondary !px-3 !py-1.5 !text-xs disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Remove Nulls
          </button>
          <button
            onClick={() => setViewMode((v) => (v === 'tree' ? 'highlighted' : 'tree'))}
            disabled={!parsed}
            className={`btn-secondary !px-3 !py-1.5 !text-xs disabled:opacity-40 disabled:cursor-not-allowed ${
              viewMode === 'tree' ? '!bg-blue-50 dark:!bg-blue-900/30 !text-primary' : ''
            }`}
          >
            {viewMode === 'tree' ? '← Highlighted' : 'Tree View'}
          </button>

          {/* Indent — pushed right */}
          <div className="ml-auto flex items-center gap-1.5">
            <label htmlFor="indent-sel" className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
              Indent:
            </label>
            <select
              id="indent-sel"
              value={indent}
              onChange={(e) => setIndent(e.target.value === 'tab' ? 'tab' : +e.target.value)}
              className="text-xs border border-gray-200 dark:border-dark-border rounded-lg px-2 py-1.5 bg-white dark:bg-dark-card text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value="tab">Tab</option>
            </select>
          </div>
        </div>

        {/* Editor panels */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3"
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); readFile(e.dataTransfer.files[0]); }}
        >
          {/* Input */}
          <div className={`${panelBase} ${panelBorder}`}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-dark-border shrink-0">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Input JSON</span>
              <span className={`text-xs font-medium ${statusCls}`} aria-live="polite" aria-atomic="true">
                {statusTxt}
              </span>
            </div>
            <div className="flex flex-1 min-h-[160px] md:min-h-[200px] overflow-hidden">
              <div
                ref={inputLineNumRef}
                className="select-none overflow-hidden text-right text-gray-300 dark:text-gray-700 border-r border-gray-100 dark:border-dark-border shrink-0 font-mono pt-2"
                aria-hidden="true"
              >
                {(input || ' ').split('\n').map((_, i) => (
                  <div key={i} className="text-xs px-2 tabular-nums" style={{ lineHeight: '1.5rem' }}>
                    {i + 1}
                  </div>
                ))}
              </div>
              <textarea
                ref={inputTextareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onScroll={() => {
                  if (inputLineNumRef.current && inputTextareaRef.current)
                    inputLineNumRef.current.scrollTop = inputTextareaRef.current.scrollTop;
                }}
                placeholder={'Paste your JSON here…\n\nOr drag & drop a .json file anywhere on this panel.'}
                spellCheck={false}
                aria-label="JSON input"
                className="flex-1 pt-2 pl-3 pr-4 pb-2 bg-transparent text-sm font-mono text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-600 resize-none focus:outline-none overflow-auto"
                style={{ lineHeight: '1.5rem' }}
              />
            </div>
          </div>

          {/* Output */}
          <div className={`${panelBase} ${panelBorder}`}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-dark-border shrink-0 gap-2">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Formatted Output</span>
              {output && (
                <div className="flex items-center gap-1" role="group" aria-label="Output actions">
                  {[
                    { label: copied ? '✓ Copied' : 'Copy', fn: handleCopy, aria: 'Copy to clipboard' },
                    { label: 'Download', fn: handleDownload, aria: 'Download as .json' },
                    { label: shared ? '✓ Copied' : 'Share', fn: handleShare, aria: 'Copy shareable link' },
                  ].map(({ label, fn, aria: al }) => (
                    <button
                      key={al}
                      onClick={fn}
                      aria-label={al}
                      className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-dark-border text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark transition-colors whitespace-nowrap"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex-1 min-h-[160px] md:min-h-[200px] overflow-auto">
              {viewMode === 'tree' && parsed ? (
                <div className="p-4 font-mono overflow-x-auto">
                  <TreeNode data={parsed} depth={0} last />
                </div>
              ) : output ? (
                <div className="flex h-full">
                  <div
                    className="select-none text-right text-gray-300 dark:text-gray-700 border-r border-gray-100 dark:border-dark-border shrink-0"
                    aria-hidden="true"
                  >
                    {hlLines.map((_, i) => (
                      <div key={i} className="text-xs px-2 font-mono tabular-nums" style={{ lineHeight: '1.5rem' }}>
                        {i + 1}
                      </div>
                    ))}
                  </div>
                  <div className="overflow-x-auto flex-1 pl-3 py-2 text-gray-700 dark:text-gray-300">
                    {hlLines.map((html, i) => (
                      <div
                        key={i}
                        className="text-sm whitespace-pre font-mono"
                        style={{ lineHeight: '1.5rem' }}
                        dangerouslySetInnerHTML={{ __html: html || '&nbsp;' }}
                      />
                    ))}
                  </div>
                </div>
              ) : validateStatus === 'valid' ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-4">
                  <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <svg className="w-7 h-7 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-green-600 dark:text-green-400 text-base">Valid JSON</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Click "Format JSON" to beautify the output.</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-600 text-sm select-none">
                  Formatted output will appear here
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        {stats && (
          <section aria-labelledby="stats-h" className="section-card mb-4">
            <h2 id="stats-h" className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              <BarChart2 className="w-4 h-4 inline-block mr-1.5 -mt-0.5" />JSON Statistics &amp; Analysis
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {[
                ['Data Size', fmtBytes(stats.size)],
                ['Top-Level Keys', stats.topKeys],
                ['Total Properties', stats.props],
                ['Max Depth', `${stats.maxD} level${stats.maxD !== 1 ? 's' : ''}`],
                ['Arrays', stats.arrs],
                ['Objects', stats.objs],
                ['Strings', stats.strs],
                ['Numbers', stats.nums],
                ['Booleans', stats.bools],
                ['Nulls', stats.nulls],
              ].map(([label, val]) => (
                <div key={label} className="bg-gray-50 dark:bg-dark rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-gray-900 dark:text-white tabular-nums">{val}</div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 leading-tight">{label}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Error panel */}
        {error && (
          <section
            aria-labelledby="err-h"
            aria-live="assertive"
            className="mb-6 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl p-5"
          >
            <h2 id="err-h" className="text-sm font-semibold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> Error Detected
            </h2>
            <p className="text-sm font-mono text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 rounded-lg p-3 break-all mb-3">
              ✕ {error.raw}
              {error.line && (
                <span className="ml-2 text-xs opacity-80">
                  (line {error.line}{error.col ? `, col ${error.col}` : ''})
                </span>
              )}
            </p>
            <p className="text-sm text-amber-700 dark:text-amber-300 flex items-start gap-1.5">
              <span aria-hidden="true">💡</span>
              <span><strong>Suggestion:</strong> {error.hint}</span>
            </p>
          </section>
        )}

        {/* How to use */}
        <section className="mb-4">
          <div className="section-card">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" /> How to Use the JSON Formatter
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {[
                { icon: <Upload className="w-4 h-4" />,      title: 'Paste or Upload',  desc: 'Paste JSON or drag & drop a .json file (up to 10 MB).' },
                { icon: <Code2 className="w-4 h-4" />,       title: 'Format',           desc: 'Click "Format JSON" or press Ctrl+Enter to beautify.' },
                { icon: <ShieldCheck className="w-4 h-4" />, title: 'Validate',         desc: 'Errors shown with line numbers and a fix suggestion.' },
                { icon: <GitBranch className="w-4 h-4" />,   title: 'Tree View',        desc: 'Toggle an interactive collapsible tree of the structure.' },
                { icon: <ArrowUpDown className="w-4 h-4" />, title: 'Sort & Clean',     desc: 'Sort keys A–Z or remove all null values in one click.' },
                { icon: <Download className="w-4 h-4" />,    title: 'Copy or Export',   desc: 'Copy output, download as .json, or share via URL.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-3 p-3 bg-gray-50 dark:bg-dark rounded-lg">
                  <span className="shrink-0 w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    {icon}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg px-3 py-2">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              Press{' '}
              <kbd className="bg-blue-100 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800 px-1.5 py-0.5 rounded font-mono text-[11px]">
                Ctrl+Enter
              </kbd>{' '}
              to format instantly — runs 100% in your browser, data never leaves your device.
            </div>
          </div>
        </section>

        {/* About */}
        <section className="mb-8">
          <div className="section-card">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Info className="w-4 h-4 text-primary" /> About This JSON Formatter &amp; Validator
            </h2>
            <div className="space-y-1">
              {[
                {
                  q: 'What is JSON?',
                  a: 'JSON (JavaScript Object Notation) is a lightweight text format for data interchange, widely used in web APIs, configuration files, and data storage. It supports strings, numbers, booleans, arrays, and nested objects.',
                },
                {
                  q: 'Why format JSON?',
                  a: 'API responses are usually minified for transport efficiency, making them unreadable. Formatting adds indentation and whitespace to reveal the data structure, making it easy to debug and explore nested data.',
                },
                {
                  q: 'How does JSON validation work?',
                  a: 'JSON has strict syntax rules: keys must be double-quoted strings, trailing commas are not allowed, and values must be one of six types (string, number, boolean, null, array, object). Our validator pinpoints errors with line and column numbers plus a fix suggestion.',
                },
                {
                  q: 'Is my data safe?',
                  a: 'All processing happens in your browser. Your JSON is never sent to a server or logged anywhere — completely safe for API keys, tokens, and proprietary data structures.',
                },
              ].map(({ q, a }) => (
                <AboutItem key={q} q={q} a={a} />
              ))}
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 leading-relaxed">
              Try our{' '}
              <Link to="/" className="text-primary hover:underline">Word Counter</Link> for writing analysis, or learn more at{' '}
              <a href="https://www.json.org/json-en.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">JSON.org</a>.
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default JsonFormatter;
