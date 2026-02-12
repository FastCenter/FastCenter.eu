module.exports = {
  content: ["./src/**/*.{html,js,ejs}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#003366',    // Deep Corporate Blue
          secondary: '#00AEEF',  // Bright Cyan/Blue
          accent: '#7dd3fc',     // Sky Blue (Gradient/Accents)
          dark: '#111827',       // Dark Gray
          light: '#F3F4F6',      // Light Gray
          white: '#FFFFFF',      // Pure White
        },
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to right, #003366, #004080)',
      },
      animation: {
        blob: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
}
