const { fontFamily } = require('tailwindcss/defaultTheme')

const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      heading: ['FC Neo Classic', ...fontFamily.sans],
      sans: ['IBM Plex Sans Thai Looped', ...fontFamily.sans],
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#940FA3',
          accent: '#660A70',
        },
        gold: {
          DEFAULT: '#E4D0A2',
          dark: '#CEB273',
          darker: '#AF8633',
        },
        brown: {
          DEFAULT: '#6B541F',
          dark: '#413313',
        },
        black: '#0A101E',
        'cool-gray': '#2A3551',
      },
    },
  },
  plugins: [],
}

module.exports = config
