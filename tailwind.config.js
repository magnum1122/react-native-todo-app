/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
      extend: {
        colors:{
          todo: {
          mutedBlue: "#6A89A7",
          lightBlue: "#BDDDFC",
          mediumBrightBlue: '#88BDF2',
          darkBlue: '#122B68'
          },
        }
      }
  },
  plugins: [],
}