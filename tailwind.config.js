/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
      },
      fontWeight: {
        normal: 400,
        medium: 700,
      },
      scale: {
        '102': '1.02',
      }
    },
  },
  plugins: [],
};