module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        body: ['Poppins'],
      },
      fontSize: {
        xs: '1.2rem',
      },
      colors: {
        'logo-pink': '#E51A4B',
      },
      height: {
        '90vh': '94vh',
        95: '95%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
