module.exports = {
  mode: 'jit',
  purge: ['./app/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontSize: {
      xs: ['10px', { lineHeight: '14px', letterspacing: '-0.03em' }],
      sm: ['14px', { lineHeight: '18px', letterspacing: '-0.03em' }],
      lg: ['18px', { lineHeight: '24px', letterspacing: '-0.03em' }],
      xl: ['24px', { lineHeight: '36px', letterspacing: '-0.03em' }],
      '2xl': ['30px', { lineHeight: '48px', letterspacing: '-0.032em' }],
      '3xl': ['38px', { lineHeight: '56px', letterspacing: '-0.032em' }],
      '4xl': ['56px', { lineHeight: '64px', letterspacing: '-0.032em' }],
      '5xl': ['80px', { lineHeight: '80px', letterspacing: '-0.032em' }],
    },
    fontFamily: {
      body: ['Lato', 'sans-serif'],
      title: ['Montserrat', 'sans-serif'],
      input: ['Mali', 'sans-serif'],
    },
    screens: {
      tablet: '960px',
      desktop: '1248px',
    },
    colors: {
      // based off of https://coolors.co/18020c-f6e8ea-ce2d4f-ee8434-4aad52-420039-fff94f-f5e960-4056f4
      transparent: 'transparent',
      current: 'currentColor',
      purple: {
        100: 'rgb(130,65,121)',
        300: 'rgb(102, 0, 88)',
        DEFAULT: 'rgb(66, 0, 57)',
        700: 'rgb(41, 0, 35)',
      },
      blue: {
        300: 'rgb(81, 101, 245)',
        DEFAULT: 'rgb(64, 86, 244)',
        700: 'rgb(13, 39, 231)',
      },
      yellow: {
        300: 'rgb(255, 251, 133)',
        DEFAULT: 'rgb(255, 249, 79)',
        700: 'rgb(255, 248, 31)',
      },
      //    'accent-alt': rgb(245, 233, 96),
      black: {
        DEFAULT: 'rgb(24, 2, 12)',
      },
      white: {
        DEFAULT: 'rgb(251, 245, 243)',
      },
      purewhite: {
        DEFAULT: 'rgb(255,255,255)',
      },
      red: {
        DEFAULT: 'rgb(206, 45, 79)',
      },
      orange: 'rgb(238, 132, 52)',
      error: 'rgb(206, 45, 79)',
      warning: 'rgb(238, 132, 52)',
      // cancel: 'rgb(206, 45, 79)',
      cancel: 'rgb(85, 92, 98)',
      success: 'rgb(74, 173, 82)',
      green: 'rgb(74, 173, 82)',
      grey: {
        100: 'rgb(245,245,245)',
        200: 'rgb(235,235,235)',
        300: 'rgb(146, 153, 160)',
        DEFAULT: 'rgb(108, 117, 125)',
        700: 'rgb(85, 92, 98)',
      },
    },
    extend: {
      spacing: {
        maxwidth: '1200px',
      },
    },
  },
  variants: {
    extend: {},
  },
  // eslint-disable-next-line global-require
  plugins: [require('@tailwindcss/forms')],
}
