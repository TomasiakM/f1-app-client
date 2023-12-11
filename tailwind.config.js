import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
    },
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
        link: colors.sky[500],
        "link-hover": colors.sky[600],
      },
    },
  },
  plugins: [],
};
