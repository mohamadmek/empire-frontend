module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        purple1f223a: "#1f223a",
        purple110e1d: "#110e1d",
      },
      screens: {
        xsm: "400px",
        // => @media (min-width: 640px) { ... }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
