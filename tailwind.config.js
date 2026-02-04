/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ejs}"],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#60A5FA',
          dark: '#0F172A',
          accent: '#2563EB',
        },
        surface: {
          bg: '#EFF6FF',
        },
        card: {
          bg: '#FFFFFF',
        },
      },
    },
  },
  plugins: [],
}
