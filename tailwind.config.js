/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00ACD0',
        secondary: '#232240', 
        accent: '#EACE04',
        neutral: '#FFFFFF',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
