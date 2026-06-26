/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xs: '320px',
      },
      colors: {
        primary: '#2563eb',
        'primary-dark': '#1d4ed8',
        secondary: '#7c3aed',
        dark: '#0f172a',
        'dark-card': '#1e293b',
        'dark-border': '#334155',
        light: '#f8fafc',
      },
    },
  },
  plugins: [],
};
