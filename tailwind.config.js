/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        // dark blue
        primary:'#00334C',
        // light blue
        secondary:'#D0F6FF',
        // bright light blue
        accent:'#21B7E2',
        // white
        neutral:'#F7FEFF',
        //grey
        grey:'#263238',
      },
      fontSize:{
        //14px
        xsmall:'0.875rem',
        //18px
        small:'1.125rem',
        //22px
        base:'1.375rem',
        //25px
        medium:'1.5625rem',
        //30px
        large:'1.875rem',
        //60px
        xlarge:'3.75rem',

      },
      fontWeight:{
        regular:'400',
        bold:'600',
      },
      fontFamily:{
        grandstander:['grandstander', 'sans-serif'],
        inter:['inter', 'sans-serif'],
        outfit:['outfit', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}
