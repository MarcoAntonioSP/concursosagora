/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: 'Poppins, sans-serif',
    },
    extend: {
      width: { '7/10': '70%', '3/10': '30%', },
    },
  },
  plugins: [
    require('tailwindcss-textshadow'),
  ],
}
