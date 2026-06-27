import { useState, useCallback, useEffect, useRef, lazy, Suspense } from 'react';
import Layout from '../components/layout/Layout';
import TextEditor from '../components/editor/TextEditor';
import EditorToolbar from '../components/editor/EditorToolbar';
import StatsGrid from '../components/stats/StatsGrid';
import { useTheme } from '../hooks/useTheme';
import { useAutoSave } from '../hooks/useAutoSave';
import { usePageMeta } from '../hooks/usePageMeta';
import { useActivityTracker } from '../hooks/useActivityTracker';
import { useDebounce } from '../hooks/useDebounce';
import { useWordCounter } from '../hooks/useWordCounter';
import { useContentHistory } from '../hooks/useContentHistory';
import { copyToClipboard } from '../utils/helpers';

const SentenceHighlights = lazy(() => import('../components/editor/SentenceHighlights'));
const KeywordDensity     = lazy(() => import('../components/stats/KeywordDensity'));
const ReadabilityScore   = lazy(() => import('../components/stats/ReadabilityScore'));
const NgramAnalysis      = lazy(() => import('../components/analysis/NgramAnalysis'));
const ContentComparison  = lazy(() => import('../components/analysis/ContentComparison'));
const MetaChecker        = lazy(() => import('../components/seo/MetaChecker'));
const HeadingAnalysis    = lazy(() => import('../components/seo/HeadingAnalysis'));
const ActivityTracker    = lazy(() => import('../components/activity/ActivityTracker'));
const ContentHistory     = lazy(() => import('../components/history/ContentHistory'));

const AnalysisSkeleton = () => (
  <div className="animate-pulse space-y-4 mt-4">
    <div className="h-8 w-64 bg-gray-100 dark:bg-dark-card rounded-lg mt-6" />
    <div className="h-48 bg-gray-100 dark:bg-dark-card rounded-xl" />
    <div className="h-40 bg-gray-100 dark:bg-dark-card rounded-xl" />
  </div>
);

const TABS = [
  { id: 'keywords', label: '📊 Keywords' },
  { id: 'phrases',  label: '🔗 Phrases' },
  { id: 'seo',      label: '🔎 SEO Tools' },
];

const TabBar = ({ active, onChange }) => (
  <div className="flex gap-1 bg-gray-100 dark:bg-dark-card rounded-lg p-1 w-fit mt-6 mb-0">
    {TABS.map(({ id, label }) => (
      <button
        key={id}
        onClick={() => onChange(id)}
        className={`px-4 py-2 text-sm rounded-md transition-colors whitespace-nowrap ${
          active === id
            ? 'bg-white dark:bg-dark shadow-sm text-gray-900 dark:text-white font-medium'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
        }`}
      >
        {label}
      </button>
    ))}
  </div>
);

const encodeForURL = (text) => {
  try { return btoa(encodeURIComponent(text)); } catch { return ''; }
};
const decodeFromURL = (encoded) => {
  try { return decodeURIComponent(atob(encoded)); } catch { return ''; }
};

const Home = () => {
  const [text, setText] = useState('');
  const [theme, toggleTheme] = useTheme();
  const [highlightsEnabled, setHighlightsEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState('keywords');
  const historyTimerRef = useRef(null);

  usePageMeta({
    title: 'Free Word Counter & Character Counter Tool 2026',
    description: 'Free online word counter. Count words, characters, sentences & paragraphs instantly. Check readability score, keyword density, and writing time instantly.',
    path: '/',
  });

  const saveStatus = useAutoSave(text, setText);
  const debouncedText = useDebounce(text, 250);
  const stats = useWordCounter(debouncedText);
  const { todayWords, goal } = useActivityTracker(stats.words);
  const { history, saveEntry, deleteEntry, clearHistory } = useContentHistory();

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const decoded = decodeFromURL(hash);
      if (decoded) setText(decoded);
    }
  }, []);

  useEffect(() => {
    clearTimeout(historyTimerRef.current);
    historyTimerRef.current = setTimeout(() => {
      if (stats.words >= 5) {
        saveEntry(debouncedText, stats.words);
      }
    }, 3000);
    return () => clearTimeout(historyTimerRef.current);
  }, [debouncedText, stats.words, saveEntry]);

  const handleClear = useCallback(() => {
    if (text && window.confirm('Clear all text?')) setText('');
  }, [text]);

  const handleShare = useCallback(async () => {
    const encoded = encodeForURL(text);
    const url = encoded
      ? `${window.location.origin}${window.location.pathname}#${encoded}`
      : window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({ title: 'WordCounter Analysis', url });
      } else {
        await copyToClipboard(url);
        alert('Shareable link copied to clipboard!');
      }
    } catch {
      await copyToClipboard(url);
    }
  }, [text]);

  const handleFileLoaded = useCallback((loadedText) => {
    setText(loadedText);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleHistoryLoad = useCallback((entry) => {
    if (window.confirm(`Load this entry (${entry.wordCount} words)?`)) {
      setText(entry.fullText || entry.preview);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <Layout theme={theme} toggleTheme={toggleTheme} onShare={handleShare}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-lg z-50">
        Skip to main content
      </a>

      <div className="mb-6 text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
          Free Online Word Counter 2026
        </h1>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
          Real-time word count, readability analysis, keyword density, and 10+ SEO writing tools.
        </p>
      </div>

      <TextEditor text={text} setText={setText} saveStatus={saveStatus} />

      <EditorToolbar
        text={text}
        stats={stats}
        onClear={handleClear}
        onShare={handleShare}
        highlightsEnabled={highlightsEnabled}
        setHighlightsEnabled={setHighlightsEnabled}
        onFileLoaded={handleFileLoaded}
      />

      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">Real-Time Text Statistics</h2>
        <StatsGrid stats={stats} />
      </section>

      <Suspense fallback={<AnalysisSkeleton />}>
        {highlightsEnabled && text && <SentenceHighlights text={debouncedText} />}

        <TabBar active={activeTab} onChange={setActiveTab} />

        <div className="mt-4">
          {activeTab === 'keywords' && (
            <KeywordDensity keywords={stats.keywords} />
          )}
          {activeTab === 'phrases' && (
            <NgramAnalysis text={debouncedText} />
          )}
          {activeTab === 'seo' && (
            <>
              <MetaChecker />
              <HeadingAnalysis headings={stats.headings} />
            </>
          )}
        </div>

        <ReadabilityScore
          readability={stats.readability}
          fkGrade={stats.fkGrade}
          readingTime={stats.readingTime}
          speakingTime={stats.speakingTime}
          writingTime={stats.writingTime}
        />

        <ContentComparison />

        <ActivityTracker todayWords={todayWords} goal={goal} />

        <ContentHistory
          history={history}
          onLoad={handleHistoryLoad}
          onDelete={deleteEntry}
          onClear={clearHistory}
        />
      </Suspense>

      {/* ── How It Works ─────────────────────────────────────────────── */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">How Our Word Counter Tool Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '📝', step: '1. Type or Paste', body: 'Type directly or paste existing text into the editor. The free word counter starts analysing your content the moment you begin.' },
            { icon: '⚡', step: '2. Get Real-Time Statistics', body: 'Instantly see your word count, character count, sentence count, paragraph count, reading time, and speaking time update as you write.' },
            { icon: '📊', step: '3. Analyse & Improve', body: 'Use the readability score, keyword density checker, and n-gram analyser to refine your content for better engagement and higher SEO rankings.' },
          ].map(({ icon, step, body }) => (
            <div key={step} className="section-card">
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">{step}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why Choose ───────────────────────────────────────────────── */}
      <section className="mt-8 section-card">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Our Free Word Counter?</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          Our <strong>free online word counter</strong> is a browser-based writing tool — no sign-up, no downloads,
          nothing stored on our servers. It counts words, characters, sentences, and paragraphs while checking
          your{' '}
          <a href="https://en.wikipedia.org/wiki/Flesch%E2%80%93Kincaid_readability_tests" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-dark">
            readability score
          </a>{' '}
          and <strong>keyword density</strong> in real time. Upload <strong>TXT, DOCX, or PDF</strong> files,
          compare two documents for similarity, or paste a URL to count words on any webpage.
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            ['Free and unlimited', 'No registration or payment ever required.'],
            ['100% client-side', 'Your text never leaves your browser.'],
            ['Real-time counting', 'Stats update instantly as you type.'],
            ['Readability analysis', 'Flesch Reading Ease score and FK Grade Level.'],
            ['Keyword density', 'Top keywords with frequency, density, and SEO tips.'],
            ['Auto-save', 'Never lose your work — drafts save automatically.'],
            ['File upload', 'Import TXT, DOCX, and PDF documents instantly.'],
            ['Activity tracker', 'Set daily word goals and monitor your streak.'],
          ].map(([title, desc]) => (
            <li key={title} className="flex items-start gap-2 text-sm">
              <span className="text-green-500 mt-0.5 shrink-0">✓</span>
              <span className="text-gray-600 dark:text-gray-400"><strong className="text-gray-800 dark:text-gray-200">{title}</strong> — {desc}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {[
            {
              q: 'What is a word counter tool?',
              a: 'A word counter tool is a free online application that counts the number of words, characters, sentences, and paragraphs in a piece of text. It is used by writers, students, bloggers, and SEO professionals to track content length and quality.',
            },
            {
              q: 'How does a word counter help with SEO?',
              a: 'A word counter helps with SEO by letting you monitor keyword density, content length, and readability — all of which influence search rankings. Maintaining a keyword density of 1–3% and a Flesch Reading Ease score above 60 can improve how search engines evaluate your content.',
            },
            {
              q: 'What is keyword density and why does it matter?',
              a: 'Keyword density is the percentage of times a target keyword appears in your text relative to the total word count. The ideal range for SEO is 1–3%. Going above that risks being flagged for keyword stuffing, which can hurt your rankings.',
            },
            {
              q: 'What is a good Flesch Reading Ease score?',
              a: 'A Flesch Reading Ease score between 60 and 70 is ideal for most web content — it means the average adult can read it comfortably. Scores above 70 are very easy to read; scores below 30 indicate dense academic or legal writing.',
            },
          ].map(({ q, a }) => (
            <div key={q} className="section-card">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{q}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Home;
