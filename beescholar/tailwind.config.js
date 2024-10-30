/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/index.html",],
  theme: {
    extend: {
      animation: {
        'drum-hit': 'ping 1s'
      }
    },
  },
  plugins: [],
}

