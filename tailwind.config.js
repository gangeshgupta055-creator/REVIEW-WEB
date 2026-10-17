/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#fbf5ec',
        espresso: '#3b2116',
        terracotta: '#ad5a35',
        sage: '#60775c',
        ink: '#30221d',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        card: '0 16px 42px rgba(77, 40, 22, 0.11)',
        float: '0 22px 60px rgba(52, 28, 16, 0.20)',
      },
    },
  },
  plugins: [],
}
