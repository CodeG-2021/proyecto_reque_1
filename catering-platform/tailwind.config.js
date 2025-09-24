/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#7F135F',
        secondary: '#A0667A',
        neutral: {
          100: '#F8F8F4',
          200: '#C7DCCA',
          300: '#C4CAB0',
          400: '#C2B895',
          500: '#8A8D7A'
        }
      },
      fontFamily: {
        inter: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(127, 19, 95, 0.35)'
      }
    }
  },
  plugins: []
};
