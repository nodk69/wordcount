import PageLayout from '../components/layout/PageLayout';
import CollapsibleSection from '../components/ui/CollapsibleSection';
import { Coffee, Rocket, Wrench, Lock, BookOpen } from 'lucide-react';

const Support = () => (
  <PageLayout
    title="Support"
    subtitle="Help keep CountsYourWords free for everyone."
  >
    <div className="max-w-2xl mx-auto">

      {/* Hero card */}
      <div className="section-card text-center mb-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800">
        <Coffee className="w-14 h-14 text-amber-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Buy Me a Coffee
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
          CountsYourWords is completely free with no sign-ups, no paywalls, and no data collection.
          If it saves you time, a small coffee goes a long way toward keeping it running and improving.
        </p>
        <a
          href="https://buymeacoffee.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 text-lg"
        >
          <Coffee className="w-5 h-5" /> Buy Me a Coffee
        </a>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
          Opens Buy Me a Coffee — any amount is appreciated
        </p>
      </div>

      {/* What your support does */}
      <CollapsibleSection title="What Your Support Covers" icon={<Rocket className="w-4 h-4" />} className="mb-4">
        <ul className="space-y-3 pt-1">
          {[
            [<Rocket className="w-5 h-5 text-primary" />, 'Hosting & infrastructure', 'Keeping the site fast and always online'],
            [<Wrench className="w-5 h-5 text-primary" />, 'New features', 'More writing tools and analysis options'],
            [<Lock className="w-5 h-5 text-primary" />, 'Privacy-first development', 'No ads or data tracking — ever'],
            [<BookOpen className="w-5 h-5 text-primary" />, 'Blog & writing guides', 'Free educational content for writers'],
          ].map(([icon, title, desc]) => (
            <li key={title} className="flex items-start gap-3">
              <span className="shrink-0 mt-0.5">{icon}</span>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">{title}</span>
                <span className="text-gray-500 dark:text-gray-400"> — {desc}</span>
              </div>
            </li>
          ))}
        </ul>
      </CollapsibleSection>

      {/* Free alternatives */}
      <div className="section-card text-center">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
          Can't donate? That's totally fine!
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          You can still help by spreading the word.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://twitter.com/intent/tweet?text=Just+found+this+free+word+counter+tool+%E2%80%94+really+useful+for+writing+and+SEO!+https://countsyourwords.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm inline-flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
            Share on Twitter
          </a>
          <button
            onClick={() => { navigator.clipboard?.writeText('https://countsyourwords.netlify.app'); }}
            className="btn-secondary text-sm inline-flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy Link
          </button>
        </div>
      </div>

    </div>
  </PageLayout>
);

export default Support;
