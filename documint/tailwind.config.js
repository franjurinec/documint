module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './static/index.html'],
  darkMode: false,
  theme: {
    extend: {
      height: {
        '9/10': '90%',
      },
      colors: {
        'mint': '#1FA37F',
        'mint-dark': '#057351',
      },
    },
  },
  variants: {
    extend: {
      backgroundOpacity: ['active'],
      backgroundColor: ['active']
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
