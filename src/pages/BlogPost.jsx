import { useParams, Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';

const articles = {
  'how-to-improve-readability': {
    title: 'How to Improve Your Writing Readability Score',
    date: 'June 20, 2026',
    category: 'Writing Tips',
    readTime: '5 min read',
    content: [
      { type: 'p', text: 'The Flesch Reading Ease score measures how easy your writing is to read on a scale from 0 to 100. A score above 70 means most adults can read it comfortably. A score below 30 is considered very difficult — think legal contracts or academic journals.' },
      { type: 'h2', text: '1. Shorten Your Sentences' },
      { type: 'p', text: 'The single biggest driver of readability is sentence length. Aim for an average of 15–20 words per sentence. Long sentences force readers to hold multiple ideas in their head at once, which is mentally draining. When you see a sentence creeping past 25 words, break it in two.' },
      { type: 'h2', text: '2. Choose Simple Words' },
      { type: 'p', text: 'Replace "utilise" with "use." Replace "commence" with "start." Replace "endeavour" with "try." Every Latinate word you swap for a short Germanic one boosts your readability score. It also makes your writing feel more direct and confident.' },
      { type: 'h2', text: '3. Write in Active Voice' },
      { type: 'p', text: 'Passive voice adds extra words and hides who is doing the action. "The report was written by the team" is weaker than "The team wrote the report." Use our passive voice detector to find and fix these sentences automatically.' },
      { type: 'h2', text: '4. Break Up Long Paragraphs' },
      { type: 'p', text: 'A paragraph with more than 5 sentences is a wall of text on mobile screens. Keep paragraphs to 2–4 sentences. White space on the page gives readers breathing room and makes content feel less intimidating.' },
      { type: 'h2', text: '5. Use Subheadings Generously' },
      { type: 'p', text: 'Subheadings let readers scan your content before committing to reading it. They also break the visual monotony. Aim for a subheading every 200–300 words. Use our heading analysis tool to check your H1, H2, and H3 structure.' },
      { type: 'p', text: 'Practice these five techniques consistently and you will see your readability score climb within a few drafts. Paste your text into WordCounter to track your score in real time as you edit.' },
    ],
  },
  'word-count-by-content-type': {
    title: 'Ideal Word Count for Every Type of Content',
    date: 'June 15, 2026',
    category: 'SEO',
    readTime: '7 min read',
    content: [
      { type: 'p', text: 'Word count is not a ranking factor by itself — but content that thoroughly covers a topic tends to be longer, and thorough content tends to rank better. Here are the benchmarks that actually matter.' },
      { type: 'h2', text: 'Blog Posts: 1,500 – 2,500 Words' },
      { type: 'p', text: 'The average first-page Google result is around 1,890 words. For informational blog posts, staying in the 1,500–2,500 range gives you enough room to cover a topic deeply without padding. Listicles and how-to guides often perform well at the lower end; pillar content and definitive guides at the higher end.' },
      { type: 'h2', text: 'Landing Pages: 500 – 1,000 Words' },
      { type: 'p', text: 'Landing pages are about conversion, not comprehensiveness. Too much text pushes the call-to-action below the fold. Keep it punchy: a headline, 2–3 benefit statements, social proof, and a clear CTA. 500–800 words is usually sufficient.' },
      { type: 'h2', text: 'Product Descriptions: 150 – 300 Words' },
      { type: 'p', text: 'Unique product descriptions of at least 150 words prevent thin-content penalties. Focus on benefits over features, include the primary keyword naturally, and answer the most common buyer questions.' },
      { type: 'h2', text: 'Email Newsletters: 200 – 500 Words' },
      { type: 'p', text: 'Emails are read on mobile, often while distracted. Get to the point fast. The ideal email is short enough to read in under 2 minutes — that is roughly 200–500 words. Use bullet points and a single clear CTA.' },
      { type: 'h2', text: 'Social Media Captions' },
      { type: 'p', text: 'Twitter/X: under 280 characters. LinkedIn posts: 150–300 words for thought leadership. Instagram captions: 138–150 characters show before the "more" cut-off. Facebook: 40–80 characters gets the most engagement.' },
      { type: 'p', text: 'The key is matching length to intent. A quick answer post can be 300 words. A complete guide should be 2,000+. Use WordCounter to hit your targets precisely before publishing.' },
    ],
  },
  'keyword-density-guide': {
    title: 'Keyword Density in 2026: What Still Matters',
    date: 'June 10, 2026',
    category: 'SEO',
    readTime: '6 min read',
    content: [
      { type: 'p', text: 'The old "2% keyword density rule" came from early SEO, when Google matched pages to queries primarily by counting how many times a keyword appeared. Today\'s search algorithms are far more sophisticated — but keyword density still matters in a nuanced way.' },
      { type: 'h2', text: 'What Keyword Density Actually Means' },
      { type: 'p', text: 'Keyword density is the percentage of times a keyword appears relative to total word count. If your article is 1,000 words and your target keyword appears 15 times, the density is 1.5%. Our keyword analyzer calculates this automatically for the top 10 terms in your text.' },
      { type: 'h2', text: 'The Danger Zone: Over-Optimisation' },
      { type: 'p', text: 'Keyword stuffing — forcing your keyword into every other sentence — triggers Google\'s spam filters. Anything above 4–5% for a single keyword is a red flag. The content starts to sound unnatural, which also hurts user engagement metrics like bounce rate and time on page.' },
      { type: 'h2', text: 'The Sweet Spot: 1–3%' },
      { type: 'p', text: 'For most content, a primary keyword density of 1–3% is natural and effective. At this density, the keyword appears frequently enough to signal relevance but not so often that it disrupts reading flow. Our keyword density tool flags when you are above or below this range.' },
      { type: 'h2', text: 'LSI Keywords Matter More Now' },
      { type: 'p', text: 'Google\'s natural language processing means it understands synonyms and related terms. Rather than repeating "word counter" 20 times, use related terms: "character count," "text analysis," "writing tool," "readability checker." This signals topical depth, which is what modern SEO rewards.' },
      { type: 'p', text: 'Use our N-gram analysis to find the most common phrases in your text — they often reveal whether you are hitting keyword targets naturally or over-stuffing a single term.' },
    ],
  },
  'passive-voice-and-seo': {
    title: 'Does Passive Voice Hurt Your SEO? The Data.',
    date: 'June 4, 2026',
    category: 'Writing Tips',
    readTime: '4 min read',
    content: [
      { type: 'p', text: 'SEO tools like Yoast have long warned writers about passive voice. But does it actually affect your Google rankings — or is it just a style preference? The honest answer is: both, but for different reasons.' },
      { type: 'h2', text: 'Google Does Not Penalise Passive Voice Directly' },
      { type: 'p', text: 'There is no Google algorithm that deducts points for passive sentences. However, passive voice is strongly correlated with lower readability scores, longer sentence length, and more complex vocabulary — all of which do affect user engagement signals that Google measures indirectly.' },
      { type: 'h2', text: 'Passive Voice and User Engagement' },
      { type: 'p', text: 'Pages with high passive voice usage tend to have higher bounce rates. Readers find active writing more direct and easier to follow. When users leave your page quickly, Google interprets it as a signal that the content did not satisfy the search intent.' },
      { type: 'h2', text: 'The 10% Rule' },
      { type: 'p', text: 'Most style guides recommend keeping passive voice below 10% of your sentences. Our passive voice detector shows you the exact percentage and highlights the specific sentences to fix. For most web content, keeping it under 10% will keep your readability scores healthy.' },
      { type: 'h2', text: 'When Passive Voice Is Correct' },
      { type: 'p', text: 'Not all passive voice is bad. "The results were published in 2024" is fine — the passive is appropriate when the actor is unknown or unimportant. Scientific writing, legal documents, and formal reports often use passive voice legitimately. The goal is intentionality, not elimination.' },
    ],
  },
  'flesch-kincaid-explained': {
    title: 'Flesch-Kincaid Grade Level Explained for Content Creators',
    date: 'May 28, 2026',
    category: 'Education',
    readTime: '5 min read',
    content: [
      { type: 'p', text: 'Rudolf Flesch developed his readability formula in 1948 while working with the Associated Press to simplify news writing. J. Peter Kincaid later adapted it for the US Navy in 1975. Today it is one of the most widely used readability metrics in content creation and education.' },
      { type: 'h2', text: 'Flesch Reading Ease vs. Flesch-Kincaid Grade Level' },
      { type: 'p', text: 'These are two different scores from the same formula family. The Flesch Reading Ease score goes from 0 (very hard) to 100 (very easy). The Flesch-Kincaid Grade Level converts the score into a US school grade: a score of 8.0 means an 8th grader can understand it.' },
      { type: 'h2', text: 'The Formula' },
      { type: 'p', text: 'FK Grade = 0.39 × (words/sentences) + 11.8 × (syllables/words) − 15.59. In plain English: longer sentences and longer words push the grade level up. Shorter sentences and shorter words bring it down. WordCounter calculates both scores automatically.' },
      { type: 'h2', text: 'What Grade Level Should You Target?' },
      { type: 'p', text: 'General web content: Grade 6–8 (most adults read comfortably at this level). News articles: Grade 8–10. Academic content: Grade 12–16. Marketing copy: Grade 6 or below. The US average adult reads at around a Grade 8 level — this is the safe default for most content.' },
      { type: 'h2', text: 'How to Lower Your Grade Level' },
      { type: 'p', text: 'Shorten your sentences. Replace multi-syllable words with shorter alternatives. Break up compound sentences with semicolons into two separate sentences. These changes bring the FK grade down without dumbing down your content — they just make it more accessible.' },
    ],
  },
  'writing-goals-daily-habit': {
    title: 'How a Daily Word Count Goal Transformed My Writing',
    date: 'May 22, 2026',
    category: 'Productivity',
    readTime: '3 min read',
    content: [
      { type: 'p', text: 'I started tracking my daily word count three years ago after reading that Stephen King writes 2,000 words every day without exception. I am not Stephen King — I set my goal at 500 words. That decision changed everything.' },
      { type: 'h2', text: 'The Compounding Effect' },
      { type: 'p', text: '500 words a day is 182,500 words a year. That is two average-length novels. Even hitting the goal only 200 days out of 365 gives you 100,000 words — a full novel\'s worth of material. The math is brutally simple: small daily habits compound into large outputs.' },
      { type: 'h2', text: 'Streaks Beat Motivation' },
      { type: 'p', text: 'Motivation is unreliable. Some days you feel like writing; most days you do not. But once you have a 14-day streak, you do not want to break it. The fear of losing the streak becomes more powerful than any motivational speech. WordCounter\'s daily tracker keeps your streak visible.' },
      { type: 'h2', text: 'Quality Follows Quantity' },
      { type: 'p', text: 'The common objection is: "500 words of bad writing is worthless." But consistent writing builds the muscle. Your 500th writing session is measurably better than your 50th. You cannot edit a blank page — but you can always improve rough words written in a daily habit.' },
      { type: 'p', text: 'Set your daily goal in WordCounter. Check your progress in the activity tracker. Come back tomorrow. That is the entire system.' },
    ],
  },
};

const BlogPost = () => {
  const { slug } = useParams();
  const article = articles[slug];

  if (!article) {
    return (
      <PageLayout title="Article Not Found">
        <div className="section-card text-center py-16">
          <div className="text-5xl mb-4">📄</div>
          <p className="text-gray-500 dark:text-gray-400 mb-6">This article does not exist.</p>
          <Link to="/blog" className="btn-primary">Back to Blog</Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <article className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <nav className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:text-primary">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 dark:text-white">{article.title}</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
              {article.category}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{article.date}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">· {article.readTime}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
            {article.title}
          </h1>
        </div>

        {/* Body */}
        <div className="section-card prose-custom">
          {article.content.map((block, i) => {
            if (block.type === 'h2') {
              return (
                <h2 key={i} className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3 first:mt-0">
                  {block.text}
                </h2>
              );
            }
            return (
              <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {block.text}
              </p>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-8 section-card bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 text-center">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Try these techniques now with your own text.
          </p>
          <Link to="/" className="btn-primary inline-flex items-center gap-2">
            Open WordCounter
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Back link */}
        <div className="mt-6">
          <Link to="/blog" className="text-sm text-primary hover:text-primary-dark inline-flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
        </div>
      </article>
    </PageLayout>
  );
};

export default BlogPost;
