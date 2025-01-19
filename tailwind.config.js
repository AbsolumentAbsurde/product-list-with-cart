/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        "box":"42rem",
        "button-meow":"17rem",
        "cart": "34rem",
        "cart-list": "32rem",
        "big-cart-list": "50rem",
      },
      fontFamily: {
        "RedHat-Italic" : ["RedHat-Italic"],
        "RedHat-Variable" : ["RedHat-VariableFont"],
        "RedHat-Text-Bold" : ["RedHat-Text-Bold"],
        "RedHat-Text-Regular" : ["RedHat-Text-Regular"],
        "RedHat-Text-SemiBold" : ["RedHat-Text-SemiBold"],
      },
      lineHeight: {
        "menu" : "0.50rem"
      },
    },
  },
  plugins: [],
}



