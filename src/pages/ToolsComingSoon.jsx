import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';

const tools = [
  {
    icon: '🔧',
    name: 'JSON Formatter',
    description: 'Format, validate, and beautify your JSON data with a collapsible tree view.',
  },
  {
    icon: '🌐',
    name: 'HTML / XML Formatter',
    description: 'Format and minify your HTML or XML code for better readability.',
  },
  {
    icon: '📊',
    name: 'SQL Formatter',
    description: 'Clean and beautify your SQL queries with proper indentation.',
  },
];

const ToolsComingSoon = () => (
  <PageLayout
    title="Developer Tools"
    subtitle="Powerful tools coming soon to complement your writing workflow."
  >
    <div className="max-w-4xl">
      <div className="text-center mb-10">
        <span className="text-6xl block mb-4">🛠️</span>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">New Tools Coming Soon!</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          We're building powerful developer tools to complement your writing workflow.
          Here's what's on the horizon:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {tools.map(({ icon, name, description }) => (
          <div
            key={name}
            className="section-card border-2 border-dashed border-gray-200 dark:border-dark-border text-center"
          >
            <div className="text-4xl mb-3">{icon}</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{description}</p>
            <span className="inline-block px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-semibold rounded-full">
              Coming Soon
            </span>
          </div>
        ))}
      </div>

      <div className="section-card text-center bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">💡 Want to suggest a tool?</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Have an idea for a tool you'd find useful? Let us know!
        </p>
        <Link
          to="/contact"
          className="inline-block px-6 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors"
        >
          Suggest a Tool
        </Link>
      </div>
    </div>
  </PageLayout>
);

export default ToolsComingSoon;
