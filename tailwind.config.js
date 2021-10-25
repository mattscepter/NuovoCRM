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
        white: '#FFFFFF',
      },
      height: {
        '90vh': '94vh',
        95: '95%',
        lead: '76vh',
      },
      width: {
        100: '30rem',
        95: '25rem',
      },
      maxHeight: {
        lead: '76vh',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
