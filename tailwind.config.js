/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#f78c40",
          blue: "#1a3952",
          gray: "#333333",
          lightgray: "#666666"
        }
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.06)",
      },
      borderRadius: {
        xl2: "1rem",
        "2xl": "1.25rem"
      }
    },
  },
  plugins: [],
}