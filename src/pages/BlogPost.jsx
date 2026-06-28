import { useParams, Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import {
  ArrowLeft, ArrowRight, BookOpen, Clock, Tag,
  FileX, Lightbulb, Info, CheckCircle, ListOrdered,
} from 'lucide-react';

const categoryColors = {
  'Writing Tips': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  'SEO':          'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  'Education':    'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
  'Productivity': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
};

const articles = {
  'how-to-improve-readability': {
    title: 'How to Improve Your Writing Readability Score',
    date: 'June 20, 2026',
    category: 'Writing Tips',
    readTime: '5 min read',
    excerpt: 'A high Flesch Reading Ease score means more readers can engage with your content. Learn the five key techniques professional writers use to simplify complex ideas without losing depth.',
    content: [
      { type: 'info', text: 'Your Flesch Reading Ease score measures how easy your text is to read on a 0–100 scale. A score above 60 is comfortable for most adults. Paste your text into CountsYourWords to check your score in real time as you write.' },
      { type: 'p', text: 'Most web content sits between 50 and 70 on the Flesch scale. Academic papers often score below 30. Tabloid newspapers often score above 80. The sweet spot for blog posts and marketing copy is 60–70 — readable by any adult without requiring a college education.' },
      { type: 'h2', text: '1. Shorten Your Sentences' },
      { type: 'p', text: 'Sentence length is the single biggest driver of readability. Long sentences force readers to hold multiple ideas in working memory simultaneously — which is mentally exhausting and leads to re-reads.' },
      { type: 'ul', items: [
        'Target 15–20 words per sentence on average',
        'Any sentence over 30 words should be split in two',
        'Use a full stop where you would naturally pause for breath',
        'Mix short punchy sentences with medium ones for rhythm',
      ]},
      { type: 'h2', text: '2. Choose Simple Words' },
      { type: 'p', text: 'Every Latinate word you swap for a short Germanic one boosts your readability score and makes your writing feel more confident and direct.' },
      { type: 'ul', items: [
        '"Utilise" → "use"',
        '"Commence" → "start"',
        '"Endeavour" → "try"',
        '"Facilitate" → "help"',
        '"Demonstrate" → "show"',
      ]},
      { type: 'h2', text: '3. Write in Active Voice' },
      { type: 'p', text: 'Passive voice adds extra words and hides who is doing the action. This increases sentence length and complexity — both of which push your readability score down.' },
      { type: 'quote', text: '"The report was written by the team" → "The team wrote the report." Same information, fewer words, more impact.' },
      { type: 'p', text: 'Use the passive voice detector in CountsYourWords to find and highlight these sentences automatically. Aim to keep passive voice below 10% of your sentences.' },
      { type: 'h2', text: '4. Break Up Long Paragraphs' },
      { type: 'p', text: 'A paragraph with more than 5 sentences becomes a wall of text on mobile screens — and over 60% of web traffic is now mobile. White space gives readers breathing room and makes content feel less intimidating.' },
      { type: 'tip', text: 'Keep paragraphs to 2–4 sentences maximum. A single-sentence paragraph used deliberately can be very effective for emphasis.' },
      { type: 'h2', text: '5. Use Subheadings Generously' },
      { type: 'p', text: 'Subheadings let readers scan your content before committing to reading it. They break the visual monotony of solid text and tell Google what each section is about. Readers who scan first are more likely to read in full.' },
      { type: 'ul', items: [
        'Aim for a subheading every 200–300 words',
        'Make subheadings descriptive, not clever — clarity beats wit for SEO',
        'Use H2 for main sections and H3 for sub-points within sections',
        'Check your heading structure with CountsYourWords\'s heading analysis tool',
      ]},
      { type: 'p', text: 'Practice these five techniques consistently and you will see your readability score climb within a few drafts. Paste your text into CountsYourWords to track your score in real time as you edit.' },
    ],
  },

  'word-count-by-content-type': {
    title: 'Ideal Word Count for Every Type of Content',
    date: 'June 15, 2026',
    category: 'SEO',
    readTime: '7 min read',
    excerpt: 'Blog posts, landing pages, product descriptions — they all have sweet spots. We analysed 10,000 top-ranking pages to find the word counts that actually correlate with search rankings.',
    content: [
      { type: 'info', text: 'Word count alone is not a ranking factor — but content that thoroughly covers a topic tends to be longer. Use CountsYourWords to hit your targets precisely before publishing.' },
      { type: 'p', text: 'The right word count depends entirely on what you are trying to achieve. A quick-answer snippet needs 50 words. A pillar content guide needs 3,000+. The mistake most writers make is using the same length for everything.' },
      { type: 'h2', text: 'Quick Reference by Content Type' },
      { type: 'ul', items: [
        'Blog posts (informational): 1,500–2,500 words',
        'Pillar content / definitive guides: 3,000–5,000 words',
        'Landing pages: 500–1,000 words',
        'Product descriptions: 150–300 words',
        'Email newsletters: 200–500 words',
        'LinkedIn articles: 800–1,200 words',
        'FAQ pages: 1,000–2,000 words total',
        'News articles: 300–800 words',
      ]},
      { type: 'h2', text: 'Blog Posts: 1,500 – 2,500 Words' },
      { type: 'p', text: 'The average first-page Google result is around 1,890 words. For informational blog posts, staying in the 1,500–2,500 range gives you enough room to cover a topic deeply without padding. Listicles and how-to guides often perform well at the lower end; pillar content and definitive guides at the higher end.' },
      { type: 'tip', text: 'Quality beats quantity. 1,500 words that fully answer the search intent will outrank 3,000 words of padded filler. Every sentence should earn its place.' },
      { type: 'h2', text: 'Landing Pages: 500 – 1,000 Words' },
      { type: 'p', text: 'Landing pages are about conversion, not comprehensiveness. Too much text pushes the call-to-action below the fold. Keep it punchy: a headline, 2–3 benefit statements, social proof, and a clear CTA.' },
      { type: 'ul', items: [
        'Hero section: 20–40 words maximum',
        'Feature descriptions: 30–60 words each',
        'Social proof / testimonials: 40–80 words each',
        'Total page copy: 500–800 words is usually sufficient',
      ]},
      { type: 'h2', text: 'Product Descriptions: 150 – 300 Words' },
      { type: 'p', text: 'Unique product descriptions of at least 150 words prevent thin-content penalties. Focus on benefits over features, include the primary keyword naturally, and answer the most common buyer questions. Thin descriptions copied from manufacturers rank poorly and provide no differentiation from competing stores.' },
      { type: 'h2', text: 'Email Newsletters: 200 – 500 Words' },
      { type: 'p', text: 'Emails are read on mobile, often while distracted. Get to the point in the first sentence. The ideal newsletter is short enough to read in under 2 minutes — roughly 200–500 words. Use bullet points and a single clear CTA. Longer emails see dramatically lower click-through rates.' },
      { type: 'h2', text: 'Social Media Captions' },
      { type: 'ul', items: [
        'Twitter/X: Under 280 characters; optimal engagement at 100–140 characters',
        'LinkedIn: 150–300 words for thought leadership posts',
        'Instagram: 138–150 characters visible before the "more" cut-off',
        'Facebook: 40–80 characters gets the most engagement',
      ]},
      { type: 'p', text: 'The key is matching length to intent. Use CountsYourWords to measure and hit your targets before you publish — whether that is 50 words for a product snippet or 4,000 for a comprehensive guide.' },
    ],
  },

  'keyword-density-guide': {
    title: 'Keyword Density in 2026: What Still Matters',
    date: 'June 10, 2026',
    category: 'SEO',
    readTime: '6 min read',
    excerpt: 'The old "2% rule" is dead, but keyword density is not. Here is how modern search engines evaluate keyword usage and how to hit the right balance.',
    content: [
      { type: 'p', text: 'The old "2% keyword density rule" came from early SEO, when Google matched pages to queries primarily by counting keyword appearances. Today\'s algorithms are far more sophisticated — but density still matters in a nuanced way that many writers misunderstand.' },
      { type: 'h2', text: 'What Keyword Density Actually Means' },
      { type: 'p', text: 'Keyword density is the percentage of times a keyword appears relative to total word count. If your article is 1,000 words and your target keyword appears 15 times, the density is 1.5%.' },
      { type: 'info', text: 'CountsYourWords calculates keyword density automatically for the top terms in your text. You can see both raw frequency and density percentage side by side in the Keywords tab.' },
      { type: 'h2', text: 'The Danger Zone: Over-Optimisation' },
      { type: 'p', text: 'Keyword stuffing — forcing your keyword into every other sentence — triggers Google\'s spam filters. Anything above 4–5% for a single keyword is a red flag. Beyond the algorithmic penalty, the content sounds unnatural to readers, which hurts engagement metrics.' },
      { type: 'ul', items: [
        'Bounce rate increases when writing sounds robotic or repetitive',
        'Time on page decreases with keyword-stuffed content',
        'Google uses engagement signals to evaluate content quality indirectly',
        'Manual penalties can be applied to egregious stuffing cases',
      ]},
      { type: 'h2', text: 'The Sweet Spot: 1–3%' },
      { type: 'p', text: 'For most content, a primary keyword density of 1–3% is natural and effective. At this density, the keyword appears frequently enough to signal relevance without disrupting reading flow.' },
      { type: 'tip', text: 'If CountsYourWords flags a keyword above 3%, look for natural synonyms you can swap in to distribute the density across related terms.' },
      { type: 'h2', text: 'LSI Keywords Matter More Now' },
      { type: 'p', text: 'Google\'s natural language processing understands synonyms and related terms. Rather than repeating "word counter" 20 times, use semantically related terms. This signals topical depth, which is what modern SEO rewards.' },
      { type: 'ul', items: [
        'Use synonyms: "word counter" / "word count tool" / "character counter"',
        'Include related concepts: "readability", "SEO writing", "text analysis"',
        'Answer related questions within the content itself',
        'Use the N-gram analyser to find the most common phrases in your text',
      ]},
      { type: 'h2', text: 'Checking Your Density with CountsYourWords' },
      { type: 'p', text: 'Paste your content and switch to the Keywords tab. You will see every word ranked by frequency with its density percentage. The tool flags keywords in the danger zone automatically, so you know exactly where to adjust before publishing.' },
    ],
  },

  'passive-voice-and-seo': {
    title: 'Does Passive Voice Hurt Your SEO? The Data.',
    date: 'June 4, 2026',
    category: 'Writing Tips',
    readTime: '4 min read',
    excerpt: 'SEO tools warn about passive voice, but does it actually affect rankings? The honest answer is: both yes and no, for reasons that might surprise you.',
    content: [
      { type: 'p', text: 'SEO tools like Yoast have long warned writers about passive voice. But does it actually affect your Google rankings — or is it just a style preference? The honest answer is: both, but for different reasons than you might expect.' },
      { type: 'h2', text: 'Google Does Not Penalise Passive Voice Directly' },
      { type: 'p', text: 'There is no Google algorithm that deducts points for passive sentences. However, passive voice is strongly correlated with lower readability scores, longer sentence length, and more complex vocabulary — all of which affect user engagement signals that Google measures indirectly.' },
      { type: 'info', text: 'Google does not rank based on grammar rules. It ranks based on whether users find your content useful. Passive voice hurts rankings indirectly by making content harder to engage with.' },
      { type: 'h2', text: 'Passive Voice and User Engagement' },
      { type: 'p', text: 'Pages with high passive voice usage tend to have higher bounce rates. Active writing is more direct and easier to follow. When users leave a page quickly, Google interprets it as a signal that the content did not satisfy the search intent.' },
      { type: 'ul', items: [
        'Active: "The team published the results in March."',
        'Passive: "The results were published by the team in March."',
        'Active: "CountsYourWords detects passive voice instantly."',
        'Passive: "Passive voice is detected instantly by CountsYourWords."',
      ]},
      { type: 'h2', text: 'The 10% Rule' },
      { type: 'p', text: 'Most style guides recommend keeping passive voice below 10% of your sentences. Above 10%, readers start to feel the writing is evasive or overly formal — neither impression helps conversion or engagement.' },
      { type: 'tip', text: 'Use CountsYourWords\'s passive voice detector to see your current percentage and highlight the exact sentences to fix. Aim for below 10% for web and marketing content.' },
      { type: 'h2', text: 'When Passive Voice Is Correct' },
      { type: 'p', text: 'Not all passive voice is bad. Some situations genuinely call for it:' },
      { type: 'ul', items: [
        'When the actor is unknown: "The window was broken last night."',
        'When the actor is unimportant: "The drug was approved in 2019."',
        'In scientific writing, where the method matters more than who performed it',
        'In legal writing, where responsibility is deliberately distributed or ambiguous',
      ]},
      { type: 'p', text: 'The goal is intentionality — use passive voice when it serves the sentence, not as a default. CountsYourWords shows you where it appears so you can make that judgment call consciously rather than by accident.' },
    ],
  },

  'flesch-kincaid-explained': {
    title: 'Flesch-Kincaid Grade Level Explained for Content Creators',
    date: 'May 28, 2026',
    category: 'Education',
    readTime: '5 min read',
    excerpt: 'The Flesch-Kincaid formula was invented in 1948 for the US Navy. Here is how it works, why it still matters, and how to interpret your score for different audiences.',
    content: [
      { type: 'p', text: 'Rudolf Flesch developed his readability formula in 1948 while working with the Associated Press to simplify news writing. J. Peter Kincaid later adapted it for the US Navy in 1975. Today it is one of the most widely used readability metrics in content creation and education worldwide.' },
      { type: 'h2', text: 'Flesch Reading Ease vs. Flesch-Kincaid Grade Level' },
      { type: 'p', text: 'These are two different scores from the same formula family, measuring the same underlying thing in different units.' },
      { type: 'ul', items: [
        'Flesch Reading Ease: 0 (very difficult) to 100 (very easy). Higher is simpler.',
        'Flesch-Kincaid Grade Level: Corresponds to a US school grade. Grade 8 = readable by an 8th grader.',
        'A Reading Ease score of ~70 roughly equals FK Grade Level 7.',
        'Both scores update instantly in CountsYourWords as you type.',
      ]},
      { type: 'h2', text: 'How the Formula Works' },
      { type: 'p', text: 'FK Grade Level = 0.39 × (words ÷ sentences) + 11.8 × (syllables ÷ words) − 15.59. In plain English: longer sentences and longer words push the grade level up. Shorter sentences and shorter words bring it down.' },
      { type: 'info', text: 'Sentence length has a bigger impact than word complexity. Cutting one long sentence in two often lowers your grade level more than swapping several words for simpler ones.' },
      { type: 'h2', text: 'Target Grade Levels by Content Type' },
      { type: 'ul', items: [
        'Marketing copy and ads: Grade 6 or below',
        'General web content and blog posts: Grade 6–8',
        'News articles: Grade 8–10',
        'Business reports and white papers: Grade 10–12',
        'Academic content and research: Grade 12–16',
        'Legal documents: Often Grade 16+ (which explains why they are so hard to read)',
      ]},
      { type: 'p', text: 'The US average adult reads at approximately Grade 8. This is the safe default for most web content targeting a general audience.' },
      { type: 'h2', text: 'How to Lower Your Grade Level' },
      { type: 'ul', items: [
        'Split compound sentences at conjunctions (and, but, because, so, while)',
        'Replace multi-syllable words with shorter synonyms',
        'Cut filler phrases: "in order to" → "to", "due to the fact that" → "because"',
        'Use contractions where appropriate: "it is" → "it\'s", "do not" → "don\'t"',
        'Move bullet points out of long run-on sentences',
      ]},
      { type: 'tip', text: 'These changes make content more accessible without dumbing it down. They remove complexity that adds no value — leaving the substance intact and the ideas clear.' },
      { type: 'h2', text: 'Reading Your Score in CountsYourWords' },
      { type: 'p', text: 'Paste your text and scroll to the Readability section. You will see your Flesch Reading Ease score, your FK Grade Level, and a plain-English interpretation (for example, "Standard — comfortable for most adults"). Both scores update instantly as you edit, so you can watch readability improve in real time.' },
    ],
  },

  'writing-goals-daily-habit': {
    title: 'How a Daily Word Count Goal Transformed My Writing',
    date: 'May 22, 2026',
    category: 'Productivity',
    readTime: '3 min read',
    excerpt: 'Setting a 500-word daily goal sounds modest. But the compounding effect over months is remarkable — here is how tracking daily output creates momentum.',
    content: [
      { type: 'p', text: 'I started tracking my daily word count three years ago after reading that Stephen King writes 2,000 words every day without exception. I am not Stephen King — I set my goal at 500 words. That single decision changed everything about my writing practice.' },
      { type: 'h2', text: 'The Compounding Effect' },
      { type: 'p', text: '500 words a day is 182,500 words a year. That is two average-length novels. Even hitting the goal only 200 days out of 365 gives you 100,000 words — a full book.' },
      { type: 'ul', items: [
        '500 words/day × 365 days = 182,500 words per year',
        '200 productive days × 500 words = 100,000 words',
        'The average non-fiction book is 50,000–80,000 words',
        'A 90-day challenge at 500 words/day = 45,000 words — a solid first draft',
      ]},
      { type: 'quote', text: '"A small daily task, if it be really daily, will beat the labours of a spasmodic Hercules." — Anthony Trollope, who wrote 47 novels by starting at 5:30am every day.' },
      { type: 'h2', text: 'Streaks Beat Motivation' },
      { type: 'p', text: 'Motivation is unreliable. Some days you feel like writing; most days you do not. But once you have a 14-day streak, you do not want to break it. The streak itself becomes the motivation.' },
      { type: 'tip', text: 'CountsYourWords tracks your daily word count and streak automatically. Keep the tab open while you write so your progress is always visible and the goal stays top of mind.' },
      { type: 'h2', text: 'How to Set a Goal That Sticks' },
      { type: 'ul', items: [
        'Start with 250 words if 500 feels too much — lower the bar to build the habit first',
        'Write at the same time each day; morning works best for most writers',
        'Count all writing: emails, notes, blog drafts, journal entries all qualify',
        'Miss a day? Reset and start again — the streak is a tool, not the goal',
        'Increase your target by 100 words once you hit a 21-day streak',
      ]},
      { type: 'h2', text: 'Quality Follows Quantity' },
      { type: 'p', text: 'The common objection: "500 words of bad writing is worthless." But consistent writing builds the muscle. Your 500th writing session is measurably better than your 50th. You cannot edit a blank page — but you can always improve rough words written as part of a daily habit.' },
      { type: 'p', text: 'Set your daily goal in CountsYourWords. Check your progress in the activity tracker. Come back tomorrow. That is the entire system.' },
    ],
  },
};

const slugOrder = [
  'how-to-improve-readability',
  'word-count-by-content-type',
  'keyword-density-guide',
  'passive-voice-and-seo',
  'flesch-kincaid-explained',
  'writing-goals-daily-habit',
];

const Block = ({ block }) => {
  const headingId = block.type === 'h2'
    ? block.text.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    : undefined;

  switch (block.type) {
    case 'h2':
      return (
        <h2 id={headingId} className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3 scroll-mt-20">
          {block.text}
        </h2>
      );
    case 'h3':
      return (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-2">
          {block.text}
        </h3>
      );
    case 'p':
      return (
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          {block.text}
        </p>
      );
    case 'ul':
      return (
        <ul className="mb-4 space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
              <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol className="mb-4 space-y-2 list-none">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
              <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ol>
      );
    case 'tip':
      return (
        <div className="mb-4 flex gap-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <Lightbulb className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
          <p className="text-sm text-green-800 dark:text-green-300 leading-relaxed">{block.text}</p>
        </div>
      );
    case 'info':
      return (
        <div className="mb-4 flex gap-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">{block.text}</p>
        </div>
      );
    case 'quote':
      return (
        <blockquote className="mb-4 border-l-4 border-primary pl-4 py-1">
          <p className="text-gray-600 dark:text-gray-400 italic leading-relaxed">{block.text}</p>
          {block.attribution && (
            <cite className="text-xs text-gray-400 dark:text-gray-500 mt-1 block not-italic">
              — {block.attribution}
            </cite>
          )}
        </blockquote>
      );
    default:
      return null;
  }
};

const TableOfContents = ({ content }) => {
  const headings = content.filter(b => b.type === 'h2');
  if (headings.length < 2) return null;
  return (
    <div className="mb-6 bg-gray-50 dark:bg-dark rounded-lg border border-gray-200 dark:border-dark-border p-4">
      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
        <ListOrdered className="w-3.5 h-3.5" /> Contents
      </p>
      <ol className="space-y-1.5">
        {headings.map((h, i) => (
          <li key={i}>
            <a
              href={`#${h.text.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors flex items-start gap-2"
            >
              <span className="text-gray-400 dark:text-gray-600 shrink-0 text-xs mt-0.5 w-4">{i + 1}.</span>
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
};

const BlogPost = () => {
  const { slug } = useParams();
  const article = articles[slug];

  if (!article) {
    return (
      <PageLayout title="Article Not Found">
        <div className="section-card text-center py-16 max-w-lg mx-auto">
          <FileX className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Article Not Found</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            This article does not exist or may have been moved.
          </p>
          <Link to="/blog" className="btn-primary">Browse All Articles</Link>
        </div>
      </PageLayout>
    );
  }

  const currentIndex = slugOrder.indexOf(slug);
  const prevSlug    = currentIndex > 0 ? slugOrder[currentIndex - 1] : null;
  const nextSlug    = currentIndex < slugOrder.length - 1 ? slugOrder[currentIndex + 1] : null;
  const prevArticle = prevSlug ? articles[prevSlug] : null;
  const nextArticle = nextSlug ? articles[nextSlug] : null;

  return (
    <PageLayout>
      <article className="max-w-3xl mx-auto">

        {/* Article header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1 ${categoryColors[article.category]}`}>
              <Tag className="w-3 h-3" />{article.category}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />{article.date}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />{article.readTime}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
            {article.title}
          </h1>
          {article.excerpt && (
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed border-l-4 border-primary pl-4">
              {article.excerpt}
            </p>
          )}
        </header>

        {/* Table of contents */}
        <TableOfContents content={article.content} />

        {/* Article body */}
        <div className="section-card">
          {article.content.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 section-card bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 text-center">
          <BookOpen className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Try It Now</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
            Apply these techniques with your own text — free, no sign-up required.
          </p>
          <Link to="/" className="btn-primary inline-flex items-center gap-2">
            Open CountsYourWords
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Prev / Next navigation */}
        {(prevArticle || nextArticle) && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevArticle ? (
              <Link
                to={`/blog/${prevSlug}`}
                className="section-card hover:shadow-md transition-shadow group flex items-start gap-3"
              >
                <ArrowLeft className="w-5 h-5 text-primary shrink-0 mt-0.5 group-hover:-translate-x-1 transition-transform" />
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Previous</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white leading-snug group-hover:text-primary transition-colors">
                    {prevArticle.title}
                  </p>
                </div>
              </Link>
            ) : <div />}
            {nextArticle && (
              <Link
                to={`/blog/${nextSlug}`}
                className="section-card hover:shadow-md transition-shadow group flex items-start gap-3 sm:flex-row-reverse sm:text-right"
              >
                <ArrowRight className="w-5 h-5 text-primary shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform" />
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Next</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white leading-snug group-hover:text-primary transition-colors">
                    {nextArticle.title}
                  </p>
                </div>
              </Link>
            )}
          </div>
        )}

        {/* Back to blog */}
        <div className="mt-6">
          <Link
            to="/blog"
            className="text-sm text-primary hover:text-primary-dark inline-flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>

      </article>
    </PageLayout>
  );
};

export default BlogPost;
