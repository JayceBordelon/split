/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#15202b', // Very dark (almost black) background
          800: '#22303c', // Slightly lighter for card backgrounds or similar
          700: '#8899a6', // Even lighter for elements like modals or dropdowns
        },
        secondary: {
          500: '#f97316', // A vibrant orange for buttons, icons, etc.
          600: '#ea580c', // Slightly darker orange for hover states
          700: '#c2410c', // Even darker for active or selected states
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Example font
      },
    },
  },
  plugins: [],
}
