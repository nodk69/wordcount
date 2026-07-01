import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import posts from '../data/articles.json';

const categoryColors = {
  'Writing Tips': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  'SEO': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  'Education': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
  'Productivity': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
};

const BlogPost = ({ slug, title, date, category, excerpt, readTime }) => (
  <article className="section-card hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3 mb-3">
      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[category]}`}>
        {category}
      </span>
      <span className="text-xs text-gray-500 dark:text-gray-400">{date}</span>
      <span className="text-xs text-gray-500 dark:text-gray-400">· {readTime}</span>
    </div>
    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-snug">
      <Link to={`/blog/${slug}`} className="hover:text-primary transition-colors">
        {title}
      </Link>
    </h2>
    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">{excerpt}</p>
    <Link
      to={`/blog/${slug}`}
      className="text-sm font-medium text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-1"
    >
      Read article
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  </article>
);

const Blog = () => (
  <PageLayout
    title="Blog"
    subtitle="Writing tips, SEO guides, and insights for content creators."
    centered
  >
    {/* Featured post */}
    <div className="section-card mb-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary text-white">Featured</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">{posts[0].date} · {posts[0].readTime}</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{posts[0].title}</h2>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{posts[0].excerpt}</p>
      <Link to={`/blog/${posts[0].slug}`} className="btn-primary inline-flex items-center gap-1">
        Read article
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>

    {/* Categories filter row */}
    <div className="flex flex-wrap gap-2 mb-6">
      {['All', 'Writing Tips', 'SEO', 'Education', 'Productivity'].map((cat) => (
        <span
          key={cat}
          className={`text-sm px-3 py-1.5 rounded-full cursor-default border ${
            cat === 'All'
              ? 'bg-primary text-white border-primary'
              : 'border-gray-200 dark:border-dark-border text-gray-600 dark:text-gray-400 hover:border-primary hover:text-primary'
          } transition-colors`}
        >
          {cat}
        </span>
      ))}
    </div>

    {/* Post grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {posts.slice(1).map((post) => (
        <BlogPost key={post.slug} {...post} />
      ))}
    </div>
  </PageLayout>
);

export default Blog;
