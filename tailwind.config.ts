const plugin = require('tailwindcss/plugin');
/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        font: '#030753',
        darkBlue: '#163E6D',
        blue: '#287EB6',
        lightBlue: '#54BBEB',
        lightOrange: '#F27C38',
        darkOrange: '#D94B2B',
        light: '#EEECE8',
        sandGrey: '#CEC8BD',
        black: '#202124',
      },
      screens: {
        xs: '500px'
      }
    },
  },
  plugins: [
    require('./namedColors'),
    require('@tailwindcss/forms')({ strategy: 'class' }),
    require('tailwind-scrollbar-hide')
  ]
}
