/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        phonepe: {
          purple: '#5f259f',
          lightPurple: '#7b40bc',
          green: '#22c55e',
          gray: '#f5f5f5',
          darkGray: '#4a4a4a',
          blue: '#1a73e8'
        }
      },
      boxShadow: {
        'inner-light': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
