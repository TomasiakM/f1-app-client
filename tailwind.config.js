import colors from "tailwindcss/colors";

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.red[600],
        "primary-hover": colors.red[700],
        secondary: colors.zinc[700],
        "secondary-hover": colors.zinc[800],
        success: colors.green[700],
        danger: colors.red[700],
        background: colors.gray[200],
        gray: colors.gray[400],
        card: colors.gray[100],
      },
    },
  },
  plugins: [],
};