import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';

const sections = [
  {
    icon: '✂️',
    title: 'Cut Your Sentence Length',
    color: 'border-blue-200 dark:border-blue-800',
    tips: [
      'Aim for an average sentence length of 15–20 words.',
      'Any sentence over 30 words can almost always be split in two.',
      'Use a full stop. It is not a sign of weakness — it is a sign of control.',
      'One idea per sentence. Two related ideas can share a sentence with a comma.',
      'Read your writing aloud. If you run out of breath, the sentence is too long.',
    ],
  },
  {
    icon: '🔤',
    title: 'Choose Simpler Words',
    color: 'border-green-200 dark:border-green-800',
    tips: [
      'Replace "utilise" with "use," "commence" with "start," "endeavour" with "try."',
      'Prefer one-syllable words over three-syllable ones where meaning is equal.',
      'Avoid jargon unless your entire audience is expert-level.',
      'If you need to define a word after using it, replace the word.',
      'The most powerful words in English are often the shortest: free, now, you, new.',
    ],
  },
  {
    icon: '🏃',
    title: 'Write in Active Voice',
    color: 'border-purple-200 dark:border-purple-800',
    tips: [
      'Active: "The team launched the product." Passive: "The product was launched by the team."',
      'Active voice is shorter, clearer, and more energetic.',
      'Keep passive voice below 10% of your sentences.',
      'Use our passive voice detector to find problem sentences automatically.',
      'Exception: passive voice is appropriate when the actor is unknown or unimportant.',
    ],
  },
  {
    icon: '📐',
    title: 'Structure for Scanners',
    color: 'border-orange-200 dark:border-orange-800',
    tips: [
      'Most web readers scan before they read — use subheadings every 200–300 words.',
      'Keep paragraphs to 2–4 sentences maximum, especially on mobile.',
      'Use bullet points for lists of 3 or more items.',
      'Put the most important information first in every paragraph (inverted pyramid).',
      'Bold the key phrase in a paragraph so scanners can extract the idea at a glance.',
    ],
  },
  {
    icon: '🎯',
    title: 'Know Your Reader',
    color: 'border-teal-200 dark:border-teal-800',
    tips: [
      'Write for one specific person, not a generic audience.',
      'Match your reading level to your audience — use the FK Grade Level as a guide.',
      'For general audiences, target Grade 6–8. For experts, Grade 10–14 is acceptable.',
      'The US average adult reads at roughly an 8th-grade level.',
      'Use "you" frequently. It makes the reader feel directly addressed.',
    ],
  },
  {
    icon: '🔁',
    title: 'Edit Ruthlessly',
    color: 'border-red-200 dark:border-red-800',
    tips: [
      'First drafts are supposed to be bad — write fast, edit slow.',
      'Delete every word that does not earn its place.',
      'Cut filler phrases: "in order to" → "to," "due to the fact that" → "because."',
      'Read backwards sentence by sentence to catch errors your brain autocorrects.',
      'Wait 24 hours before editing important work — fresh eyes catch what tired ones miss.',
    ],
  },
  {
    icon: '📅',
    title: 'Build a Daily Habit',
    color: 'border-indigo-200 dark:border-indigo-800',
    tips: [
      'Set a daily word count goal — 300 to 500 words is achievable for most writers.',
      'Write at the same time each day to build a reliable habit.',
      'Track your streak. Losing a 10-day streak is more motivating than any reward.',
      'Do not edit while writing your first draft — it kills momentum.',
      'Use our daily activity tracker to monitor your progress and stay consistent.',
    ],
  },
];

const WritingTips = () => (
  <PageLayout
    title="Writing Tips"
    subtitle="Evidence-based techniques to make your writing clearer, sharper, and more effective."
  >
    {/* Intro */}
    <div className="section-card mb-8 max-w-3xl">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Good writing is a craft, and craft can be learned. The tips below are drawn from professional
        editorial practice, academic readability research, and the habits of high-output writers.
        Each one is measurable — use WordCounter to track your improvement as you apply them.
      </p>
    </div>

    {/* Tips grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      {sections.map(({ icon, title, color, tips }) => (
        <div key={title} className={`section-card border-t-4 ${color}`}>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>{icon}</span> {title}
          </h2>
          <ul className="space-y-2">
            {tips.map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <span className="text-primary mt-0.5 shrink-0">→</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {/* Quick reference */}
    <div className="section-card mb-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Reference: Readability Targets</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-dark-border">
              <th className="text-left py-2 pr-4 text-gray-500 dark:text-gray-400 font-medium">Content Type</th>
              <th className="text-left py-2 pr-4 text-gray-500 dark:text-gray-400 font-medium">FK Grade</th>
              <th className="text-left py-2 pr-4 text-gray-500 dark:text-gray-400 font-medium">Avg. Sentence</th>
              <th className="text-left py-2 text-gray-500 dark:text-gray-400 font-medium">Passive Voice</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
            {[
              ['Marketing copy', '≤ 6', '≤ 12 words', '< 5%'],
              ['Blog posts', '6 – 8', '15 – 20 words', '< 10%'],
              ['News articles', '8 – 10', '18 – 22 words', '< 15%'],
              ['Technical docs', '10 – 14', '20 – 25 words', '< 20%'],
              ['Academic writing', '12 – 16', '22 – 30 words', 'Varies'],
            ].map(([type, grade, sentence, passive]) => (
              <tr key={type} className="hover:bg-gray-50 dark:hover:bg-dark transition-colors">
                <td className="py-2.5 pr-4 font-medium text-gray-900 dark:text-white">{type}</td>
                <td className="py-2.5 pr-4 text-gray-600 dark:text-gray-400">{grade}</td>
                <td className="py-2.5 pr-4 text-gray-600 dark:text-gray-400">{sentence}</td>
                <td className="py-2.5 text-gray-600 dark:text-gray-400">{passive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* CTA */}
    <div className="section-card text-center bg-gradient-to-br from-primary/5 to-secondary/5">
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Apply these tips and measure the improvement in real time.
      </p>
      <Link to="/" className="btn-primary">Open WordCounter</Link>
    </div>
  </PageLayout>
);

export default WritingTips;
