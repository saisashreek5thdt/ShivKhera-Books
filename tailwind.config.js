/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Include all colors used in chapterData
    "from-green-600",
    "from-blue-600",
    "from-gray-600",
    // Add other colors from your chapterData
  ],
  theme: {
    extend: {
      keyframes: {
        reveal: {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        fill: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
        },
      },
      animation: {
        reveal: 'reveal 0.8s ease-out', // Adjust duration/easing here
        fill: 'fill 1.2s forwards',
      },
    },
  },
  plugins: [],
}

