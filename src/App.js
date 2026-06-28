import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import CookieConsent from './components/CookieConsent';

// Secondary pages are lazy-loaded — they're code-split into separate chunks
// so the main word counter tool loads immediately without waiting for them.
const Blog         = lazy(() => import('./pages/Blog'));
const BlogPost     = lazy(() => import('./pages/BlogPost'));
const About        = lazy(() => import('./pages/About'));
const FAQ          = lazy(() => import('./pages/FAQ'));
const WritingTips  = lazy(() => import('./pages/WritingTips'));
const Sitemap      = lazy(() => import('./pages/Sitemap'));
const PrivacyPolicy   = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService  = lazy(() => import('./pages/TermsOfService'));
const CookiePolicy    = lazy(() => import('./pages/CookiePolicy'));
const Contact         = lazy(() => import('./pages/Contact'));
const Support         = lazy(() => import('./pages/Support'));
const ToolsComingSoon = lazy(() => import('./pages/ToolsComingSoon'));
const JsonFormatter        = lazy(() => import('./pages/JsonFormatter'));
const ContentComparisonPage = lazy(() => import('./pages/ContentComparisonPage'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-light dark:bg-dark">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/"                element={<Home />} />
          <Route path="/blog"            element={<Blog />} />
          <Route path="/blog/:slug"      element={<BlogPost />} />
          <Route path="/about"           element={<About />} />
          <Route path="/faq"             element={<FAQ />} />
          <Route path="/writing-tips"    element={<WritingTips />} />
          <Route path="/sitemap"         element={<Sitemap />} />
          <Route path="/privacy-policy"  element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookie-policy"   element={<CookiePolicy />} />
          <Route path="/contact"         element={<Contact />} />
          <Route path="/support"         element={<Support />} />
          <Route path="/tools"           element={<ToolsComingSoon />} />
          <Route path="/json-formatter"       element={<JsonFormatter />} />
          <Route path="/content-comparison"  element={<ContentComparisonPage />} />
          <Route path="*"                element={<NotFound />} />
        </Routes>
      </Suspense>
      <CookieConsent />
    </BrowserRouter>
  );
}

export default App;
