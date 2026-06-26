import { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required.';
    if (!form.email.trim()) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.';
    if (!form.message.trim()) e.message = 'Message is required.';
    return e;
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setSubmitted(true);
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 text-sm text-gray-900 dark:text-white bg-white dark:bg-dark border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
      errors[field]
        ? 'border-red-400 dark:border-red-500'
        : 'border-gray-200 dark:border-dark-border'
    }`;

  if (submitted) {
    return (
      <PageLayout title="Contact Us">
        <div className="section-card max-w-lg mx-auto text-center py-12">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message Sent</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Thanks for reaching out, <strong>{form.name}</strong>. We will get back to you at{' '}
            <strong>{form.email}</strong> within 1–2 business days.
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
            { icon: '🐙', title: 'GitHub', desc: 'github.com/wordcounter', sub: 'Report bugs or open feature requests.' },
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
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={inputClass('name')}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={inputClass('email')}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
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

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={6}
                placeholder="Tell us how we can help..."
                className={inputClass('message') + ' resize-none'}
              />
              {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
              <p className="text-xs text-gray-400 mt-1">{form.message.length} characters</p>
            </div>

            <button type="submit" className="btn-primary w-full sm:w-auto px-8 py-3 text-base">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default Contact;
