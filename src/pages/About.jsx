import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';

const stats = [
  { value: '18+', label: 'Real-Time Metrics' },
  { value: '100%', label: 'Free, No Sign-Up' },
  { value: '0', label: 'Ads or Trackers' },
  { value: '∞', label: 'Text Length Limit' },
];

const features = [
  {
    icon: '📊',
    title: 'Real-Time Statistics',
    desc: 'Word count, character count, sentence count, paragraphs, syllables, pages, and 12 more metrics — all update instantly as you type.',
  },
  {
    icon: '📖',
    title: 'Readability Analysis',
    desc: 'Flesch Reading Ease score and Flesch-Kincaid Grade Level tell you exactly how accessible your writing is for your target audience.',
  },
  {
    icon: '🔎',
    title: 'SEO Tools',
    desc: 'Keyword density checker with density recommendations, N-gram phrase analysis, and meta title and description length checker.',
  },
  {
    icon: '🔍',
    title: 'Passive Voice Detector',
    desc: 'Automatically identifies passive voice sentences so you can rewrite them for clarity and stronger engagement.',
  },
  {
    icon: '📑',
    title: 'Heading Structure',
    desc: 'Parses H1, H2, and H3 headings from your text and checks whether your structure follows SEO best practices.',
  },
  {
    icon: '📁',
    title: 'File Upload',
    desc: 'Upload and analyse TXT, DOCX, and PDF files directly in the browser. No upload to a server — all processing happens on your device.',
  },
  {
    icon: '⚖️',
    title: 'Content Comparison',
    desc: 'Paste two pieces of text to measure their cosine similarity. Useful for checking duplicate content and paraphrase detection.',
  },
  {
    icon: '💾',
    title: 'Auto-Save & History',
    desc: 'Your text is automatically saved to your browser\'s localStorage. Content history lets you revisit and restore previous sessions.',
  },
];

const About = () => (
  <PageLayout
    title="About WordCounter"
    subtitle="A free, privacy-first writing analysis tool built for writers, marketers, and students."
  >
    {/* Stats row */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
      {stats.map(({ value, label }) => (
        <div key={label} className="section-card text-center">
          <div className="text-3xl font-bold text-primary mb-1">{value}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
        </div>
      ))}
    </div>

    {/* Mission */}
    <div className="section-card mb-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        WordCounter was built for one reason: to give writers a fast, honest picture of their text
        without ads, paywalls, or sign-up walls. Every statistic updates instantly. Nothing leaves
        your browser — your text is never sent to a server.
      </p>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Good writing is measurable. Sentence length, readability score, keyword density, passive voice
        percentage — these are not abstract concepts. They are numbers you can improve. WordCounter
        gives you those numbers in real time, so you can edit with intention rather than instinct.
      </p>
    </div>

    {/* Features grid */}
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">What WordCounter Does</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
      {features.map(({ icon, title, desc }) => (
        <div key={title} className="section-card flex gap-4">
          <span className="text-2xl shrink-0">{icon}</span>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{desc}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Privacy */}
    <div className="section-card mb-8 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
        <span>🔒</span> Privacy First
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        WordCounter processes everything locally in your browser. Your text is never transmitted to
        any server. Auto-saved drafts are stored only in your own browser's localStorage and never
        leave your device. There are no analytics scripts that read your text content.
      </p>
    </div>

    {/* CTA */}
    <div className="section-card text-center bg-gradient-to-br from-primary/5 to-secondary/5">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Start Writing</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-5">
        Paste your text and get instant analysis — no account needed.
      </p>
      <Link to="/" className="btn-primary">Open the Word Counter</Link>
    </div>
  </PageLayout>
);

export default About;
