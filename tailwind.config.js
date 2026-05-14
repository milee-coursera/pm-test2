/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Source Sans 3"', '"Source Sans Pro"', 'sans-serif'],
      },
      colors: {
        cds: {
          blue:        { 700: '#0056d2', 950: '#002761' },
          neutral: {
            primary:         '#0f1114',
            'primary-invert':'#ffffff',
            background:      '#ffffff',
            stroke:          '#8495b0',
            divider:         '#929599',
          },
          interactive: {
            primary: '#0056d2',
            focus:   '#6923de',
          },
          success: '#1D7C50',
          error:   '#D30001',
          warning: '#ffc936',
          overlay: 'rgba(15,17,20,0.50)',
        },
      },
      fontSize: {
        'display':        ['64px', { lineHeight: '72px', letterSpacing: '-1px',   fontWeight: '600' }],
        'title-lg':       ['48px', { lineHeight: '56px', letterSpacing: '-1px',   fontWeight: '600' }],
        'title-md':       ['36px', { lineHeight: '42px', letterSpacing: '-0.5px', fontWeight: '600' }],
        'title-sm':       ['30px', { lineHeight: '36px', letterSpacing: '-0.5px', fontWeight: '600' }],
        'subtitle-lg':    ['20px', { lineHeight: '24px', letterSpacing: '-0.3px', fontWeight: '600' }],
        'subtitle-md':    ['16px', { lineHeight: '20px', letterSpacing: '-0.3px', fontWeight: '600' }],
        'body-primary':   ['16px', { lineHeight: '24px', letterSpacing: '0',      fontWeight: '400' }],
        'body-secondary': ['14px', { lineHeight: '20px', letterSpacing: '0',      fontWeight: '400' }],
        'action-primary': ['16px', { lineHeight: '24px', letterSpacing: '1px',    fontWeight: '600' }],
        'action-secondary':['14px',{ lineHeight: '20px', letterSpacing: '1px',    fontWeight: '600' }],
      },
    },
  },
  plugins: [],
}
