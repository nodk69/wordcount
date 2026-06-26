import PageLayout from '../components/layout/PageLayout';

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h2>
    <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-3 text-sm">
      {children}
    </div>
  </div>
);

const CookiePolicy = () => (
  <PageLayout title="Cookie Policy" subtitle="Last updated: June 27, 2026">
    <div className="section-card max-w-3xl">
      <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg mb-8">
        <span className="text-2xl shrink-0">🍪</span>
        <p className="text-sm text-green-800 dark:text-green-300">
          <strong>Short version:</strong> WordCounter does not use cookies. We use localStorage
          instead, which stays on your device and is never transmitted anywhere.
        </p>
      </div>

      <Section title="What Are Cookies?">
        <p>
          Cookies are small text files placed on your device by websites you visit. They are
          typically used for session management, personalisation, and tracking. Cookies are sent
          with every HTTP request to the server that set them.
        </p>
      </Section>

      <Section title="Does WordCounter Use Cookies?">
        <p>
          <strong>No.</strong> WordCounter does not set any cookies — neither first-party nor
          third-party. We do not use cookies for authentication, analytics, advertising, or
          any other purpose.
        </p>
      </Section>

      <Section title="What We Use Instead: localStorage">
        <p>
          WordCounter uses your browser's <strong>localStorage</strong> API to save the following
          data entirely on your device:
        </p>
        <div className="overflow-x-auto mt-3">
          <table className="w-full text-sm border border-gray-200 dark:border-dark-border rounded-lg overflow-hidden">
            <thead className="bg-gray-50 dark:bg-dark">
              <tr>
                <th className="text-left px-4 py-2 text-gray-500 dark:text-gray-400 font-medium">Key</th>
                <th className="text-left px-4 py-2 text-gray-500 dark:text-gray-400 font-medium">Purpose</th>
                <th className="text-left px-4 py-2 text-gray-500 dark:text-gray-400 font-medium">Transmitted?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
              {[
                ['wordcounter_text', 'Auto-saved editor text', 'Never'],
                ['wordcounter_theme', 'Light/dark preference', 'Never'],
                ['wordcounter_activity', 'Daily word count goal progress', 'Never'],
                ['wordcounter_history', 'Content history (last 20 sessions)', 'Never'],
              ].map(([key, purpose, transmitted]) => (
                <tr key={key} className="bg-white dark:bg-dark-card">
                  <td className="px-4 py-2 font-mono text-xs text-gray-700 dark:text-gray-300">{key}</td>
                  <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{purpose}</td>
                  <td className="px-4 py-2 text-green-600 dark:text-green-400 font-medium">{transmitted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3">
          Unlike cookies, localStorage data is <strong>never sent to any server</strong> with HTTP
          requests. It is accessible only to JavaScript running on the WordCounter domain.
        </p>
      </Section>

      <Section title="Third-Party Cookies">
        <p>
          WordCounter does not embed any third-party scripts that set cookies. We do not use Google
          Analytics, Facebook Pixel, advertising networks, social media widgets, or any other
          service that would introduce third-party cookies.
        </p>
      </Section>

      <Section title="How to Clear Your Data">
        <p>
          To remove all data WordCounter has stored in your browser, open your browser's developer
          tools (F12), navigate to Application → Storage → localStorage, find the WordCounter
          entries, and delete them. Alternatively, use your browser's "Clear site data" option in
          the privacy or history settings.
        </p>
      </Section>

      <Section title="Changes to This Policy">
        <p>
          If we ever introduce cookies in the future — for example, to support user accounts — we
          will update this policy, update the "last updated" date, and display a clear notice to
          users before the change takes effect.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Questions about cookies or localStorage? Email{' '}
          <a href="mailto:privacy@wordcounter.app" className="text-primary hover:text-primary-dark">
            privacy@wordcounter.app
          </a>.
        </p>
      </Section>
    </div>
  </PageLayout>
);

export default CookiePolicy;
