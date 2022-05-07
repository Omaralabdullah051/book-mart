module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'mobile': '320px'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
