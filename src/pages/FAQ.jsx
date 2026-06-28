import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';

const faqs = [
  {
    q: 'Is WordCounter completely free?',
    a: 'Yes. WordCounter is 100% free with no sign-up, no subscription, and no hidden limits. Every feature — including file upload, keyword analysis, readability scoring, and content history — is available to all users at no cost.',
  },
  {
    q: 'Does my text get sent to a server?',
    a: 'No. All analysis happens entirely inside your browser using JavaScript. Your text is never transmitted to any server. Auto-saved drafts are stored only in your browser\'s localStorage, which is local to your device and inaccessible to us.',
  },
  {
    q: 'How is the word count calculated?',
    a: 'Words are counted by matching sequences of characters separated by whitespace or punctuation. A hyphenated compound like "well-known" counts as one word. Numbers count as words. Punctuation marks alone do not count.',
  },
  {
    q: 'What is the Flesch Reading Ease score?',
    a: 'The Flesch Reading Ease score rates text on a scale from 0 to 100. Higher scores mean easier reading. Scores of 70–100 are easy enough for most adults; scores below 30 are very difficult. The score is calculated from average sentence length and average syllables per word.',
  },
  {
    q: 'What is the Flesch-Kincaid Grade Level?',
    a: 'The FK Grade Level converts readability into a US school grade. A score of 8.0 means a typical 8th grader can understand the text. For general web content, aim for Grade 6–8. The formula uses the same inputs as the Flesch Reading Ease score but outputs a grade instead of a 0–100 scale.',
  },
  {
    q: 'How does the keyword density calculation work?',
    a: 'Keyword density is the percentage of times a word appears relative to total word count. We exclude a curated list of common stop words (the, and, or, etc.) to focus on meaningful keywords. The top 10 keywords are displayed with frequency count and density percentage.',
  },
  {
    q: 'What file formats can I upload?',
    a: 'WordCounter supports TXT, MD (Markdown), DOCX, DOC, and PDF files. Text files are read directly. DOCX files are parsed using the Mammoth library. PDF files are parsed using PDF.js. All parsing happens locally in your browser — files are never uploaded to a server.',
  },
  {
    q: 'What is N-gram analysis?',
    a: 'N-gram analysis finds the most common multi-word phrases in your text. Bigrams are 2-word phrases; trigrams are 3-word phrases. This helps you identify repetitive phrasing, discover natural keyword phrases, and understand the thematic focus of your content.',
  },
  {
    q: 'How does the passive voice detector work?',
    a: 'The detector identifies sentences containing a form of "to be" (is, are, was, were, been, being) followed by a past participle. It handles both regular past participles (ending in -ed) and common irregular forms (written, known, taken, etc.). It flags sentences for review, not for automatic rewriting.',
  },
  {
    q: 'How is reading time calculated?',
    a: 'Reading time is based on an average adult silent reading speed of 238 words per minute. Speaking time uses 150 words per minute (average conversational pace). Handwriting time uses 20 words per minute. All three are displayed in minutes and seconds.',
  },
  {
    q: 'What does the content comparison tool measure?',
    a: 'The comparison tool calculates cosine similarity between two texts based on their word frequency vectors. A 0% similarity means no shared vocabulary; 100% means identical word distributions. It also shows which words appear in both texts and which are unique to each.',
  },
  {
    q: 'How does auto-save work?',
    a: 'WordCounter automatically saves your text to your browser\'s localStorage 500 milliseconds after you stop typing. The saved text is restored when you reload the page. You can also browse your last 20 saved sessions in the Content History panel.',
  },
];

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 dark:border-dark-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white dark:bg-dark-card hover:bg-gray-50 dark:hover:bg-dark transition-colors"
        aria-expanded={open}
      >
        <span className="font-medium text-gray-900 dark:text-white pr-4">{q}</span>
        <svg
          className={`w-5 h-5 shrink-0 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-5 pb-4 bg-white dark:bg-dark-card">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{a}</p>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => (
  <PageLayout
    title="Frequently Asked Questions"
    subtitle="Everything you need to know about WordCounter."
  >
    <div className="max-w-3xl mx-auto space-y-3">
      {faqs.map((item) => (
        <FAQItem key={item.q} {...item} />
      ))}
    </div>

    <div className="section-card mt-10 text-center max-w-3xl mx-auto">
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Still have a question? We are happy to help.
      </p>
      <Link to="/contact" className="btn-primary">Contact Us</Link>
    </div>
  </PageLayout>
);

export default FAQ;
