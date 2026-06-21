module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./data/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "ui-sans-serif", "system-ui"] },
      colors: { ink: "#0b0f12", mist: "#eef5f4", sage: "#b9d7c8", ocean: "#0f766e" },
      boxShadow: { glow: "0 0 40px rgba(15,118,110,.25)" }
    }
  },
  plugins: []
};
