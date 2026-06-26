import { Link } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import { useTheme } from '../../hooks/useTheme';

const PageLayout = ({ children, title, subtitle }) => {
  const [theme, toggleTheme] = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-light dark:bg-dark transition-colors duration-200">
      <Navbar theme={theme} toggleTheme={toggleTheme} onShare={() => {}} />
      <main className="flex-1 w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {title && (
          <div className="mb-8">
            <nav className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900 dark:text-white">{title}</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{title}</h1>
            {subtitle && <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">{subtitle}</p>}
          </div>
        )}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
