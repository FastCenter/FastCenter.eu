/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ejs}"],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#66FCF1', // Neon Blue/Cyan
          dark: '#0B0C10',  // Deep Black/Gray
          accent: '#45A29E', // Muted Cyan
          secondary: '#1F2833', // Dark Gray Blue
          white: '#C5C6C7', // Light Gray (Text)
        },
        surface: {
          bg: '#0B0C10',
          card: 'rgba(31, 40, 51, 0.7)', // Glass effect base
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #45A29E' },
          '100%': { boxShadow: '0 0 20px #66FCF1, 0 0 10px #45A29E' },
        }
      }
    },
  },
  plugins: [],
}
