import { useState, useCallback, useEffect, useRef } from 'react';
import Layout from '../components/layout/Layout';
import TextEditor from '../components/editor/TextEditor';
import EditorToolbar from '../components/editor/EditorToolbar';
import SentenceHighlights from '../components/editor/SentenceHighlights';
import StatsGrid from '../components/stats/StatsGrid';
import KeywordDensity from '../components/stats/KeywordDensity';
import ReadabilityScore from '../components/stats/ReadabilityScore';
import NgramAnalysis from '../components/analysis/NgramAnalysis';
import ContentComparison from '../components/analysis/ContentComparison';
import MetaChecker from '../components/seo/MetaChecker';
import HeadingAnalysis from '../components/seo/HeadingAnalysis';
import ActivityTracker from '../components/activity/ActivityTracker';
import ContentHistory from '../components/history/ContentHistory';
import { useTheme } from '../hooks/useTheme';
import { useAutoSave } from '../hooks/useAutoSave';
import { usePageMeta } from '../hooks/usePageMeta';
import { useActivityTracker } from '../hooks/useActivityTracker';
import { useDebounce } from '../hooks/useDebounce';
import { useWordCounter } from '../hooks/useWordCounter';
import { useContentHistory } from '../hooks/useContentHistory';
import { copyToClipboard } from '../utils/helpers';

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
    title: 'Free Online Word Counter 2026',
    description: 'Free online word counter tool. Count words, characters, sentences, and paragraphs in real-time. Check readability score, keyword density, and writing time. Perfect for writers, students, and SEO professionals.',
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

      {highlightsEnabled && text && <SentenceHighlights text={debouncedText} />}

      <StatsGrid stats={stats} />

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

      <section className="mt-10 section-card">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">About WordCounter</h2>
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2 leading-relaxed">
          <p>
            WordCounter is a free, browser-based writing tool that provides real-time statistics as you type.
            It counts words, characters, sentences, and paragraphs — plus checks readability, detects passive
            voice, and analyzes keyword density to help you write better content that ranks.
          </p>
          <p>
            Use the <strong>Flesch Reading Ease score</strong> and <strong>Flesch-Kincaid Grade Level</strong>{' '}
            to match your content to your audience. The <strong>keyword density analyzer</strong> shows ideal
            1–3% density with warnings to avoid keyword stuffing. Upload <strong>TXT, DOCX, or PDF</strong>{' '}
            files, compare two documents for similarity, and export your analysis as CSV or JSON.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
            {[
              ['word counter', 'character counter'],
              ['readability score', 'keyword density checker'],
              ['passive voice detector', 'meta title checker'],
              ['content comparison', 'n-gram analyzer'],
            ].flat().map((kw) => (
              <span key={kw} className="text-xs bg-gray-100 dark:bg-dark px-2 py-1 rounded text-gray-600 dark:text-gray-400">{kw}</span>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
