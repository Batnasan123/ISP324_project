module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      Montserrat: ["Montserrat"],
    },
    extend: {
      width: {
        128: "32rem",
        196: "48rem",
        256: "64rem",
      },
    },
  },
  plugins: [],
};
