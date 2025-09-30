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
        "blur-in-from-left": {
          "0%": { 
            opacity: "0",
            filter: "blur(10px)",
            transform: "translateX(-100%)"
          },
          "100%": {
            opacity: "1",
            filter: "blur(0)",
            transform: "translateX(0)"
          }
        },
        "blur-in-from-right": {
          "0%": { 
            opacity: "0",
            filter: "blur(10px)",
            transform: "translateX(100%)"
          },
          "100%": {
            opacity: "1",
            filter: "blur(0)",
            transform: "translateX(0)"
          }
        },
        "blur-in-from-top": {
          "0%": { 
            opacity: "0",
            filter: "blur(10px)",
            transform: "translateY(-100%)"
          },
          "100%": {
            opacity: "1",
            filter: "blur(0)",
            transform: "translateY(0)"
          }
        },
        "quiver": {
          "0%, 100%": { transform: "translateY(0)" },
          "25%": { transform: "translateY(-2px)" },
          "75%": { transform: "translateY(2px)" }
        },
        "bubble-float-1": {
          "0%": { 
            transform: "translateY(0px) translateX(-30px) rotate(0deg) scale(1)"
          },
          "25%": {
            transform: "translateY(-40px) translateX(50px) rotate(90deg) scale(1.1)"
          },
          "50%": {
            transform: "translateY(-80px) translateX(-20px) rotate(180deg) scale(0.9)"
          },
          "75%": {
            transform: "translateY(-40px) translateX(70px) rotate(270deg) scale(1.05)"
          },
          "100%": {
            transform: "translateY(0px) translateX(-30px) rotate(360deg) scale(1)"
          }
        },
        "bubble-float-2": {
          "0%": { 
            transform: "translateY(20px) translateX(60px) rotate(0deg) scale(0.8)"
          },
          "33%": {
            transform: "translateY(-50px) translateX(-40px) rotate(120deg) scale(1.2)"
          },
          "66%": {
            transform: "translateY(-20px) translateX(80px) rotate(240deg) scale(0.9)"
          },
          "100%": {
            transform: "translateY(20px) translateX(60px) rotate(360deg) scale(0.8)"
          }
        },
        "bubble-float-3": {
          "0%": { 
            transform: "translateY(-10px) translateX(-50px) rotate(0deg) scale(1.1)"
          },
          "20%": {
            transform: "translateY(-60px) translateX(30px) rotate(72deg) scale(0.85)"
          },
          "40%": {
            transform: "translateY(-100px) translateX(-30px) rotate(144deg) scale(1.15)"
          },
          "60%": {
            transform: "translateY(-50px) translateX(90px) rotate(216deg) scale(0.95)"
          },
          "80%": {
            transform: "translateY(-20px) translateX(-20px) rotate(288deg) scale(1.05)"
          },
          "100%": {
            transform: "translateY(-10px) translateX(-50px) rotate(360deg) scale(1.1)"
          }
        }
      },
      animation: {
        "blur-in-from-left": "blur-in-from-left 1s ease-out forwards",
        "blur-in-from-right": "blur-in-from-right 1s ease-out forwards",
        "blur-in-from-top": "blur-in-from-top 1s ease-out forwards",
        "quiver": "quiver 2s ease-in-out infinite",
        "bubble-1": "bubble-float-1 8s ease-in-out infinite",
        "bubble-2": "bubble-float-2 12s ease-in-out infinite 2s",
        "bubble-3": "bubble-float-3 10s ease-in-out infinite 4s",
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("tw-elements/plugin.cjs")],
};
