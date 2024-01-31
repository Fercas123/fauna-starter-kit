/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
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
      sans: ['Abel', 'sans-serif'],
      highlight: ['Playfair', 'serif'],
    },
  },
  plugins: [],
}
