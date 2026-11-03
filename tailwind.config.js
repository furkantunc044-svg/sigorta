/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        artse: {
          navy: '#031738',
          deepnavy: '#001A3F',
          cream: '#FBF9F4',
          orange: '#F05A28',
          orangeAccent: '#FF5722',
          preheading: '#C85A17',
          darkgray: '#1E293B',
          muted: '#8D99AE'
        }
      },
      fontFamily: {
        serif: ['"Zodiak"', '"DM Serif Display"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Satoshi"', '"Inter"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
