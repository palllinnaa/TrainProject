/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      spacing:{
        '72': '18rem',
        '80': '20rem',
      },
      padding: {
        '5/6': '83.3333333%'
      }
    },

    customForms: theme => ({
      default: {
        select: {
          borderRadius: theme('borderRadius.lg'),
          boxShadow: theme('boxShadow.default'),
          backgroundColor: theme('colors.gray.700'),
          borderColor: 'transparent',
          icon: '<svg fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>',
          lineHeight: theme('lineHeight.snug'),
        },
        checkbox: {
          checkboxSize: '1.5em',
          radioSize: '1.5em',
          checkedColor: theme('colors.indigo.500'),
          focusBorderColor: 'transparent',
          focusShadow: "none"
        },
      }

    })

  },
  plugins: [
    require('@tailwindcss/custom-forms')
  ],
}

