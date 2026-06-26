import { useState, useRef } from 'react';
import { downloadFile, copyToClipboard } from '../../utils/helpers';
import { fetchUrlText } from '../../utils/urlFetcher';
import FileUpload from './FileUpload';

const EditorToolbar = ({ text, stats, onClear, onShare, highlightsEnabled, setHighlightsEnabled, onFileLoaded }) => {
  const [exportOpen, setExportOpen] = useState(false);
  const [copyDone, setCopyDone] = useState(false);
  const [urlOpen, setUrlOpen] = useState(false);
  const [urlValue, setUrlValue] = useState('');
  const [urlLoading, setUrlLoading] = useState(false);
  const [urlError, setUrlError] = useState('');
  const exportRef = useRef(null);
  const urlInputRef = useRef(null);

  const handleUrlToggle = () => {
    setUrlOpen((o) => !o);
    setUrlError('');
    if (!urlOpen) setTimeout(() => urlInputRef.current?.focus(), 50);
  };

  const handleUrlFetch = async () => {
    if (!urlValue.trim()) { setUrlError('Please enter a URL.'); return; }
    setUrlLoading(true);
    setUrlError('');
    try {
      const extracted = await fetchUrlText(urlValue);
      if (!extracted) { setUrlError('No readable text found at that URL.'); return; }
      onFileLoaded(extracted);
      setUrlOpen(false);
      setUrlValue('');
    } catch (err) {
      setUrlError(err.message || 'Could not fetch URL. Check the address and try again.');
    } finally {
      setUrlLoading(false);
    }
  };

  const handleUrlKeyDown = (e) => {
    if (e.key === 'Enter') handleUrlFetch();
    if (e.key === 'Escape') { setUrlOpen(false); setUrlError(''); }
  };

  const handleCopyResults = async () => {
    const result = [
      '=== WordCounter Analysis ===',
      `Words: ${stats.words}`,
      `Unique Words: ${stats.uniqueWords}`,
      `Characters: ${stats.characters}`,
      `Characters (no spaces): ${stats.charactersNoSpace}`,
      `Sentences: ${stats.sentences}`,
      `Paragraphs: ${stats.paragraphs}`,
      `Lines: ${stats.lines}`,
      `Pages: ${stats.pages}`,
      `Syllables: ${stats.syllables}`,
      `Avg Word Length: ${stats.avgWordLength}`,
      `Avg Sentence (words): ${stats.avgSentenceWords}`,
      `Longest Sentence: ${stats.longestSentence} words`,
      `Shortest Sentence: ${stats.shortestSentence} words`,
      '',
      `Reading Level: ${stats.readability.level}`,
      `Flesch Score: ${stats.readability.score}/100`,
      `Reading Time: ${stats.readingTime}`,
      `Speaking Time: ${stats.speakingTime}`,
      `Handwriting Time: ${stats.writingTime}`,
    ].join('\n');

    await copyToClipboard(result);
    setCopyDone(true);
    setTimeout(() => setCopyDone(false), 2000);
  };

  const handleExportTXT = () => {
    downloadFile(text, 'document.txt', 'text/plain');
    setExportOpen(false);
  };

  const handleExportCSV = () => {
    const rows = [
      ['Metric', 'Value'],
      ['Words', stats.words],
      ['Unique Words', stats.uniqueWords],
      ['Characters', stats.characters],
      ['Characters (no spaces)', stats.charactersNoSpace],
      ['Sentences', stats.sentences],
      ['Paragraphs', stats.paragraphs],
      ['Lines', stats.lines],
      ['Pages', stats.pages],
      ['Syllables', stats.syllables],
      ['Avg Word Length', stats.avgWordLength],
      ['Avg Sentence (words)', stats.avgSentenceWords],
      ['Flesch Score', stats.readability.score],
      ['Reading Level', stats.readability.level],
      ['Reading Time', stats.readingTime],
      ['Speaking Time', stats.speakingTime],
      ['Handwriting Time', stats.writingTime],
    ];
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
    downloadFile(csv, 'wordcount-stats.csv', 'text/csv');
    setExportOpen(false);
  };

  const handleExportJSON = () => {
    const data = {
      text,
      stats: {
        words: stats.words,
        uniqueWords: stats.uniqueWords,
        characters: stats.characters,
        charactersNoSpace: stats.charactersNoSpace,
        sentences: stats.sentences,
        paragraphs: stats.paragraphs,
        lines: stats.lines,
        pages: stats.pages,
        syllables: stats.syllables,
        avgWordLength: stats.avgWordLength,
        avgSentenceWords: stats.avgSentenceWords,
        longestSentence: stats.longestSentence,
        shortestSentence: stats.shortestSentence,
        readingTime: stats.readingTime,
        speakingTime: stats.speakingTime,
        writingTime: stats.writingTime,
        readability: stats.readability,
        keywords: stats.keywords,
      },
      exportedAt: new Date().toISOString(),
    };
    downloadFile(JSON.stringify(data, null, 2), 'wordcount-analysis.json', 'application/json');
    setExportOpen(false);
  };

  const handlePrint = () => window.print();

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {/* Clear */}
      <button
        onClick={onClear}
        className="btn-secondary flex items-center gap-1.5"
        aria-label="Clear all text"
        disabled={!text}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Clear
      </button>

      {/* Copy Results */}
      <button
        onClick={handleCopyResults}
        className="btn-primary flex items-center gap-1.5"
        aria-label="Copy analysis results to clipboard"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </svg>
        {copyDone ? 'Copied!' : 'Copy Results'}
      </button>

      {/* Share */}
      <button
        onClick={onShare}
        className="btn-secondary flex items-center gap-1.5"
        aria-label="Share"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        Share
      </button>

      {/* Export dropdown */}
      <div className="relative" ref={exportRef}>
        <button
          onClick={() => setExportOpen((o) => !o)}
          className="btn-secondary flex items-center gap-1.5"
          aria-haspopup="true"
          aria-expanded={exportOpen}
          aria-label="Export options"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {exportOpen && (
          <div className="absolute left-0 mt-1 w-36 bg-white dark:bg-dark-card rounded-lg shadow-lg border border-gray-100 dark:border-dark-border py-1 z-20">
            {[
              { label: 'As TXT', action: handleExportTXT },
              { label: 'As CSV', action: handleExportCSV },
              { label: 'As JSON', action: handleExportJSON },
            ].map(({ label, action }) => (
              <button
                key={label}
                onClick={action}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark hover:text-primary"
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Print */}
      <button
        onClick={handlePrint}
        className="btn-secondary flex items-center gap-1.5"
        aria-label="Print document"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
        Print
      </button>

      {/* Highlights toggle */}
      <button
        onClick={() => setHighlightsEnabled((h) => !h)}
        className={`btn-secondary flex items-center gap-1.5 ${highlightsEnabled ? 'ring-2 ring-primary' : ''}`}
        aria-label={`${highlightsEnabled ? 'Disable' : 'Enable'} sentence highlights`}
        aria-pressed={highlightsEnabled}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        Highlights
      </button>

      {/* File upload */}
      <FileUpload onTextLoaded={onFileLoaded} />

      {/* Fetch from URL */}
      <button
        onClick={handleUrlToggle}
        className={`btn-secondary flex items-center gap-1.5 ${urlOpen ? 'ring-2 ring-primary' : ''}`}
        aria-label="Fetch text from URL"
        aria-expanded={urlOpen}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        From URL
      </button>

      {urlOpen && (
        <div className="w-full mt-2 flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <input
              ref={urlInputRef}
              type="url"
              value={urlValue}
              onChange={(e) => { setUrlValue(e.target.value); setUrlError(''); }}
              onKeyDown={handleUrlKeyDown}
              placeholder="https://example.com/article"
              className="flex-1 px-3 py-2 text-sm border border-gray-200 dark:border-dark-border rounded-lg bg-white dark:bg-dark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleUrlFetch}
              disabled={urlLoading}
              className="btn-primary flex items-center gap-1.5 whitespace-nowrap"
            >
              {urlLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Fetching…
                </>
              ) : (
                'Fetch & Analyse'
              )}
            </button>
            <button
              onClick={() => { setUrlOpen(false); setUrlError(''); }}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1"
              aria-label="Close URL input"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {urlError && (
            <p className="text-xs text-red-500">{urlError}</p>
          )}
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Paste any article or webpage URL — we'll extract the readable text and load it into the editor.
          </p>
        </div>
      )}
    </div>
  );
};

export default EditorToolbar;
