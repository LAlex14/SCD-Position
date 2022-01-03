module.exports = {
  mode: 'jit',
  purge: {
    enable: true,
    content: [
      './index.html',
      './src/**/*.{vue,js,ts,jsx,tsx}',
      './safelist.txt'
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--primary-50)',
          100: 'var(--primary-100)',
          200: 'var(--primary-200)',
          300: 'var(--primary-300)',
          400: 'var(--primary-400)',
          500: 'var(--primary-500)',
          600: 'var(--primary-600)',
          700: 'var(--primary-700)',
          800: 'var(--primary-800)',
          900: 'var(--primary-900)',
        },
        background: '#F7F3EF'
      },
      fontSize: {
        'xxs': '.625rem'
      },
      screens: {
        'print': {'raw': 'print'},
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
