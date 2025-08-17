/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/tw-elements/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        // dark blue
        primary: "#00334C",
        // light blue
        secondary: "#D0F6FF",
        // bright light blue
        accent: "#21B7E2",
        // white
        neutral: "#F7FEFF",
        //grey
        grey: "#263238",
      },
      fontSize: {
        //12px
        tiny: "0.8rem",
        //14px
        xsmall: "0.875rem",
        //18px
        small: "1.125rem",
        //22px
        base: "1.375rem",
        //25px
        medium: "1.5625rem",
        //30px
        large: "1.875rem",
        //36px
        larger: "2.25rem",
        //45px
        largest: "2.813rem",
        //60px
        xlarge: "3.75rem",
      },
      fontWeight: {
        regular: "400",
        semiBold: "500",
        bold: "600",
      },
      fontFamily: {
        grandstander: ["grandstander", "sans-serif"],
        inter: ["inter", "sans-serif"],
        outfit: ["outfit", "sans-serif"],
        rasa: ["rasa", "sans-serif"],
      },

      keyframes: {
        "rotate-tr": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }, // full rotation
        },
      },
      animation: {
        "rotate-tr": "rotate-tr 70s linear infinite both",
        "rotate-tr-rev": "rotate-tr 80s linear infinite both reverse",
        "rotate-tr-rev2": "rotate-tr 100s linear infinite both reverse",
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("tw-elements/plugin.cjs")],
};
