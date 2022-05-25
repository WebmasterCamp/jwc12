const { fontFamily } = require('tailwindcss/defaultTheme')

const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['IBM Plex Sans Thai', ...fontFamily.sans],
      serif: ['IBM Plex Sans Thai Looped', ...fontFamily.serif],
    },
  },
  plugins: [],
}

module.exports = config
