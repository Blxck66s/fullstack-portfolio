/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {},
  },

  plugins: [require("tailwindcss-animate")],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
};
