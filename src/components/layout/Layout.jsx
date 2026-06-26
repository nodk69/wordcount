import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, theme, toggleTheme, onShare }) => (
  <div className="min-h-screen flex flex-col bg-light dark:bg-dark transition-colors duration-200">
    <Navbar theme={theme} toggleTheme={toggleTheme} onShare={onShare} />
    <main id="main-content" className="flex-1 w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;
