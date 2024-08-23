/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/*.{js,jsx}", "./src/**/*.{js,jsx}"],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },

    extend: {
      colors: {
        main: "#0D6AAB",
        secondary: "#085a94",
      },
    },
  },
  plugins: [],
};
