import PageLayout from '../components/layout/PageLayout';

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h2>
    <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-3 text-sm">
      {children}
    </div>
  </div>
);

const PrivacyPolicy = () => (
  <PageLayout title="Privacy Policy" subtitle="Last updated: June 27, 2026">
    <div className="section-card max-w-3xl">
      <Section title="Overview">
        <p>
          WordCounter is a client-side web application. All text analysis is performed locally in
          your browser using JavaScript. No text you enter is ever transmitted to our servers or any
          third party. This privacy policy explains what limited data we do handle and how.
        </p>
      </Section>

      <Section title="Data We Do Not Collect">
        <p>We do not collect, store, or transmit:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Any text you type or paste into the editor</li>
          <li>Any files you upload (TXT, DOCX, PDF)</li>
          <li>Your analysis results or statistics</li>
          <li>Your writing history or session data</li>
          <li>Your IP address or device fingerprint</li>
        </ul>
      </Section>

      <Section title="Local Storage">
        <p>
          WordCounter uses your browser's <strong>localStorage</strong> to save your text drafts,
          content history, theme preference (light/dark), and daily writing activity. This data is
          stored entirely on your own device and is never sent to us. You can clear it at any time
          by clearing your browser's site data.
        </p>
      </Section>

      <Section title="Cookies">
        <p>
          WordCounter does not use cookies for tracking or advertising. We do not set any third-party
          cookies. The only browser storage we use is localStorage, which is described above.
        </p>
      </Section>

      <Section title="Analytics">
        <p>
          We do not use Google Analytics, Facebook Pixel, or any other behavioural tracking or
          analytics service that reads your content. If we ever introduce aggregate, anonymous usage
          analytics in the future, we will update this policy and notify users with a prominent
          banner before the change takes effect.
        </p>
      </Section>

      <Section title="Third-Party Services">
        <p>
          When you upload a PDF file, the PDF.js library (loaded from your own device via the bundled
          application) processes the file entirely in your browser. No data is sent to Mozilla or any
          other third party. When you upload a DOCX file, the Mammoth.js library similarly processes
          it locally.
        </p>
      </Section>

      <Section title="Children's Privacy">
        <p>
          WordCounter does not knowingly collect any information from children under the age of 13.
          The service is a read/write text tool with no account system and no data collection, making
          it inherently safe for educational use.
        </p>
      </Section>

      <Section title="Changes to This Policy">
        <p>
          If we make material changes to this privacy policy, we will update the "last updated" date
          at the top and, where required by law, notify users via a site notice. Continued use of
          WordCounter after changes are posted constitutes acceptance of the updated policy.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          If you have questions about this privacy policy, please contact us at{' '}
          <a href="mailto:privacy@wordcounter.app" className="text-primary hover:text-primary-dark">
            privacy@wordcounter.app
          </a>.
        </p>
      </Section>
    </div>
  </PageLayout>
);

export default PrivacyPolicy;
