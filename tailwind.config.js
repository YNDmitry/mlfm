/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/components/*.{js,ts,vue}',
    './src/pages/*.{js,ts,vue}',
    './src/layouts/*.{js,ts,vue}',
    './src/assets/css/*.css',
  ],
  theme: {
    colors: {
      'black': '#3C3C3C',
      'white': '#ffffff',
    },
    fontSize: {
      'h1': '48px'
    },
    fontFamily: {
      sans: ['Unbounded', 'sans-serif'],
    },
    container: {
      padding: {
        DEFAULT: '2rem',
        sm: '1rem'
      },
      center: true,
      padding: '2rem',
    }
  },
}