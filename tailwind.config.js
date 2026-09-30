/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './script.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ground: '#F4F4F2',
        ink: '#0A0A0A',
        soft: '#3A3A37',
        muted: '#5E5E5B',
        faint: '#8E8E8A',
        line: '#DCDCD8',
      },
    },
  },
  plugins: [],
};
