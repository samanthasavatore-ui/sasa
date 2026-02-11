/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        atletica: {
          50: '#eef4ff',
          500: '#1d4ed8',
          700: '#1e3a8a'
        }
      }
    }
  },
  plugins: []
};
