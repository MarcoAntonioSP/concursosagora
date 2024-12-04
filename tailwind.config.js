/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
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
    require('tailwindcss-animated'),
  ],
}
