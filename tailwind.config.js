const { fontFamily } = require('tailwindcss/defaultTheme')

const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['IBM Plex Sans Thai', ...fontFamily.sans],
    },
  },
  plugins: [],
}

module.exports = config
