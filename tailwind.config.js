/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx'
  ],
  theme: {
    screens: {
      'tablet': '650px',
      'desktop': '1050px'
    },
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif'
      },
      backgroundImage: {
        app: 'url(/app-bg.png)'
      },
      colors: {
        gray: {
          900: '#121214',
          800: '#202024',
          700: '#323238',
          600: '#8d8d99',
          200: '#c4c4cc',
          100: '#e1e1e6'
        },
        green: {
          500: '#129e57'
        },
        yellow: {
          500: '#f7dd43'
        },
        blue: {
          500: '#20234F'
        }
      }
    },
  },
  plugins: [],
}
