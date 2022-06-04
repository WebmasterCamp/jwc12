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
        gold: '#E4D0A2',
        brown: {
          dark: '#413313',
          light: '#6b541f',
        },
        ct: '#1dc5b2',
        pg: '#dc4223',
        mk: '#7423dc',
        ds: '#a1dd40',
      },
    },
  },
  plugins: [],
}

module.exports = config
