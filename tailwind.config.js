/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      margin: {
        '2rem': '2rem',
        '1rem': '1rem',
        '0.2rem': '0.2rem',
        '0.75rem': '0.75rem',
      },
      transitionProperty: {
        'height': 'height',
      }
    },
    fontFamily: {
      sans: ['Khula', 'sans-serif'],
      highlight: ['Playfair Display', 'serif'],
    },
  },
  plugins: [],
}
