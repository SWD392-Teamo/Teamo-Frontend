const flowbite = require("flowbite-react/tailwind");
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{scss,css}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        logo: '#46AFE9',
        primary: '#4CA4CD',
        secondary: '#1C1C1C',
        tertiary: '#FCFCFC',
        danger: '#E90000',
        grey: '#606261',
        darkgrey: '#3E424A',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        poppins: ["Poppins", "regular"],
        righteous: ["Righteous", "regular"],
      },
    },
  },
  plugins: [
    flowbite.plugin()
  ],
};