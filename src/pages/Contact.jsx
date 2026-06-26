import { useForm, ValidationError } from '@formspree/react';
import PageLayout from '../components/layout/PageLayout';

const inputBase =
  'w-full px-4 py-3 text-sm text-gray-900 dark:text-white bg-white dark:bg-dark border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors';

const Contact = () => {
  const [state, handleSubmit] = useForm('mnjkdozw');

  const inputClass = (field) => {
    const hasError = state.errors?.some?.((e) => e.field === field);
    return `${inputBase} ${hasError ? 'border-red-400 dark:border-red-500' : 'border-gray-200 dark:border-dark-border'}`;
  };

  if (state.succeeded) {
    return (
      <PageLayout title="Contact Us">
        <div className="section-card max-w-lg mx-auto text-center py-12">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message Sent</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Thanks for reaching out. We will get back to you within 1–2 business days.
          </p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="Contact Us"
      subtitle="Have a question, bug report, or feature request? We'd love to hear from you."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl">
        {/* Info sidebar */}
        <div className="space-y-4">
          {[
            { icon: '📧', title: 'Email', desc: 'hello@wordcounter.app', sub: 'We reply within 1–2 business days.' },
            { icon: '🐦', title: 'Twitter', desc: '@wordcounterapp', sub: 'Quick questions and updates.' },
          ].map(({ icon, title, desc, sub }) => (
            <div key={title} className="section-card flex gap-3">
              <span className="text-2xl shrink-0">{icon}</span>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white text-sm">{title}</div>
                <div className="text-sm text-primary">{desc}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="lg:col-span-2 section-card">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Send a Message</h2>

          {/* Formspree form-level error */}
          <ValidationError errors={state.errors} className="text-sm text-red-500 mb-4" />

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  className={inputClass('name')}
                />
                <ValidationError field="name" errors={state.errors} className="text-xs text-red-500 mt-1 block" />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className={inputClass('email')}
                />
                <ValidationError field="email" errors={state.errors} className="text-xs text-red-500 mt-1 block" />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                className={inputClass('subject')}
              >
                <option value="">Select a topic...</option>
                <option>General Question</option>
                <option>Bug Report</option>
                <option>Feature Request</option>
                <option>Partnership</option>
                <option>Other</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                placeholder="Tell us how we can help..."
                className={inputClass('message') + ' resize-none'}
              />
              <ValidationError field="message" errors={state.errors} className="text-xs text-red-500 mt-1 block" />
            </div>

            <button
              type="submit"
              disabled={state.submitting}
              className="btn-primary w-full sm:w-auto px-8 py-3 text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {state.submitting ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default Contact;
