import PageLayout from '../components/layout/PageLayout';

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h2>
    <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-3 text-sm">
      {children}
    </div>
  </div>
);

const TermsOfService = () => (
  <PageLayout title="Terms of Service" subtitle="Last updated: June 27, 2026">
    <div className="section-card max-w-3xl">
      <Section title="Acceptance of Terms">
        <p>
          By accessing or using WordCounter ("the Service"), you agree to be bound by these Terms of
          Service. If you do not agree to these terms, please do not use the Service. We reserve the
          right to update these terms at any time; continued use of the Service after changes are
          posted constitutes acceptance.
        </p>
      </Section>

      <Section title="Description of Service">
        <p>
          WordCounter is a free, browser-based text analysis tool. It provides word counting,
          character counting, readability analysis, keyword density measurement, and related writing
          tools. The Service operates entirely client-side; no user data is transmitted to our servers.
        </p>
      </Section>

      <Section title="Permitted Use">
        <p>You may use WordCounter for any lawful purpose, including:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Personal writing and editing</li>
          <li>Academic and educational work</li>
          <li>Professional content creation</li>
          <li>SEO research and content optimisation</li>
          <li>Integration into personal or commercial workflows</li>
        </ul>
      </Section>

      <Section title="Prohibited Use">
        <p>You agree not to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Use the Service for any unlawful purpose or in violation of any applicable laws</li>
          <li>Attempt to reverse engineer, decompile, or extract the source code for commercial redistribution without permission</li>
          <li>Use automated tools to scrape, crawl, or stress-test the Service in a way that impacts availability for other users</li>
          <li>Misrepresent your affiliation with WordCounter or use our branding without permission</li>
        </ul>
      </Section>

      <Section title="Intellectual Property">
        <p>
          The WordCounter application code, design, and branding are the property of WordCounter and
          its contributors. The underlying open-source libraries (React, Tailwind CSS, Mammoth.js,
          PDF.js) are subject to their respective licenses.
        </p>
        <p>
          You retain full ownership of any text you enter into the editor. We claim no intellectual
          property rights over your content.
        </p>
      </Section>

      <Section title="Disclaimer of Warranties">
        <p>
          The Service is provided "as is" and "as available" without any warranty of any kind,
          express or implied. We do not warrant that the Service will be uninterrupted, error-free,
          or free of viruses. Readability scores, keyword density figures, and other analysis outputs
          are estimates and should not be relied upon as professional editorial, legal, or medical advice.
        </p>
      </Section>

      <Section title="Limitation of Liability">
        <p>
          To the maximum extent permitted by applicable law, WordCounter and its contributors shall
          not be liable for any indirect, incidental, special, or consequential damages arising from
          your use of or inability to use the Service, even if advised of the possibility of such damages.
        </p>
      </Section>

      <Section title="Governing Law">
        <p>
          These Terms shall be governed by and construed in accordance with applicable law. Any
          disputes arising under these Terms shall be subject to the exclusive jurisdiction of the
          courts of competent jurisdiction.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Questions about these Terms? Email us at{' '}
          <a href="mailto:legal@wordcounter.app" className="text-primary hover:text-primary-dark">
            legal@wordcounter.app
          </a>.
        </p>
      </Section>
    </div>
  </PageLayout>
);

export default TermsOfService;
