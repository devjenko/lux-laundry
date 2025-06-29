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
      fontSize:{
        //14px
        small:'0.875rem',
        //18px
        base:'1.125rem',
        //28px
        large:'1.75rem',
        //60px
        xlarge:'3.75rem',

      },
      fontWeight:{
        
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
