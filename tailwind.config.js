/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  safelist: [
    "w-64",
    "w-1/2",
    "rounded-l-lg",
    "rounded-r-lg",
    "bg-gray-200",
    "grid-cols-4",
    "grid-cols-7",
    "h-6",
    "leading-6",
    "h-9",
    "leading-9",
    "shadow-lg",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    fontFamily: {
      sans: ["Montserrat", "sans-serif", 'thin'],
    },
    extend: {
      colors: {
        primary: {
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
          700: "#be123c",
          800: "#9f1239",
          900: "#881337",
        }
      },
      screens: {
        xs: "374px"
      },  
      keyframes: {
        //WIP
        slidein: {
          '0%, 20%': { transform: 'translateY(130px)' },
          '20%, 80%': {},
          '80%, 100%': {transform: 'translateY(-130px)'},
        }
      },      
      animation: {
        slidein: 'slidein 6s ease-in-out',
      }
    },
  },
  plugins: [require("flowbite/plugin")],
};
