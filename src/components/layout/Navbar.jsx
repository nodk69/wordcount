import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import {
  Wrench, Globe, BarChart2, ChevronDown,
  Menu, X, Moon, Sun, Lock, Rocket, Scale,
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const [theme, toggleTheme] = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsToolsOpen(false);
  }, [location]);

  const navBefore = [{ path: '/', label: 'Home' }];
  const navAfter  = [
    { path: '/blog',    label: 'Blog' },
    { path: '/about',   label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const toolLinks = [
    { label: 'JSON Formatter', icon: <Wrench className="w-6 h-6" />, description: 'Format & validate JSON data', path: '/json-formatter', available: true, hidden: true },
    { label: 'Content Comparison', icon: <Scale className="w-6 h-6" />, description: 'Compare two texts for similarity', path: '/content-comparison', available: true },
    { label: 'HTML/XML Formatter', icon: <Globe className="w-6 h-6" />, description: 'Format & minify HTML/XML', available: false, hidden: true },
    { label: 'SQL Formatter', icon: <BarChart2 className="w-6 h-6" />, description: 'Clean & beautify SQL queries', available: false, hidden: true },
  ];

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={`sticky top-0 z-50 transition-all duration-300 border-b border-gray-200 dark:border-dark-border ${
        isScrolled
          ? 'bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-md shadow-lg'
          : 'bg-white dark:bg-dark shadow-sm'
      }`}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0 flex-1">
            <img
              src="/android-chrome-192x192.png"
              alt="CountsYourWords logo"
              className="h-8 w-8 rounded-lg"
              width="32"
              height="32"
            />
            <span className="text-xl font-bold text-gray-900 dark:text-white">CountsYourWords</span>
          </Link>

          {/* Desktop nav — centered */}
          <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {navBefore.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === path
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-primary'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-dark-card'
                }`}
              >
                {label}
              </Link>
            ))}

            {/* Tools dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsToolsOpen(true)}
              onMouseLeave={() => setIsToolsOpen(false)}
            >
              <button className="px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-dark-card">
                <Wrench className="w-4 h-4" />
                Tools
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isToolsOpen ? 'rotate-180' : ''}`} />
              </button>

              <div
                className={`absolute left-0 mt-2 w-80 bg-white dark:bg-dark-card rounded-xl shadow-lg border border-gray-200 dark:border-dark-border overflow-hidden transition-all duration-200 ${
                  isToolsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}
              >
                <div className="p-2">
                  {toolLinks.filter(t => !t.hidden).map(({ label, icon, description, path, available }) =>
                    available ? (
                      <Link
                        key={label}
                        to={path}
                        className="flex items-start gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-border transition-colors group"
                      >
                        <span className="shrink-0 text-gray-600 dark:text-gray-400 mt-0.5">{icon}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors">{label}</span>
                            <span className="text-[10px] font-semibold uppercase tracking-wider bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">
                              New
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
                        </div>
                      </Link>
                    ) : (
                      <div
                        key={label}
                        className="flex items-start gap-3 px-4 py-3 rounded-lg opacity-60 cursor-not-allowed"
                      >
                        <span className="shrink-0 text-gray-400 dark:text-gray-600 mt-0.5">{icon}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900 dark:text-white">{label}</span>
                            <span className="text-[10px] font-semibold uppercase tracking-wider bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full">
                              Soon
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
                        </div>
                        <Lock className="w-4 h-4 text-gray-300 dark:text-gray-600 shrink-0 mt-0.5" />
                      </div>
                    )
                  )}
                  <div className="border-t border-gray-100 dark:border-dark-border mt-2 pt-2 px-2">
                    <p className="text-xs text-gray-400 dark:text-gray-500 text-center italic flex items-center justify-center gap-1.5">
                      <Rocket className="w-3.5 h-3.5" />
                      More tools coming soon — stay tuned!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {navAfter.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === path
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-primary'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-dark-card'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right side: theme toggle + support */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-end">
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-card transition-colors"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* <Link
              to="/support"
              className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all hover:scale-105"
            >
              <Coffee className="w-4 h-4" /> Support
            </Link> */}
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-card transition-colors"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen((o) => !o)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-card"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-dark-border py-3 space-y-1">
            {navBefore.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === path
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-primary'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-dark-card'
                }`}
              >
                {label}
              </Link>
            ))}

            {/* Mobile Tools section */}
            <div className="pt-1">
              <p className="px-3 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5" /> Tools
              </p>
              {toolLinks.filter(t => !t.hidden).map(({ label, icon, path, available }) =>
                available ? (
                  <Link
                    key={label}
                    to={path}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-dark-card transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-gray-600 dark:text-gray-400">{icon}</span>
                      <span>{label}</span>
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">
                      New
                    </span>
                  </Link>
                ) : (
                  <div
                    key={label}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400 opacity-60 cursor-not-allowed"
                  >
                    <div className="flex items-center gap-3">
                      <span>{icon}</span>
                      <span>{label}</span>
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full">
                      Soon
                    </span>
                  </div>
                )
              )}
            </div>

            {navAfter.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === path
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-primary'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-dark-card'
                }`}
              >
                {label}
              </Link>
            ))}

            {/* <Link
              to="/support"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 mt-1 px-4 py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-semibold rounded-lg shadow-sm w-full"
            >
              <Coffee className="w-4 h-4" /> Support Me
            </Link> */}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
