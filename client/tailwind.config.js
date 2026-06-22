/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: { center: true, padding: '1rem' },
    extend: {
      colors: {
        // Yellow brand palette — matches clinic signboard (vivid golden yellow)
        brand: {
          50:  '#fffbeb',
          100: '#fff3c4',
          200: '#ffe48a',
          300: '#ffd24d',
          400: '#ffc01f',
          500: '#FFC72C', // primary signature yellow
          600: '#e6a800',
          700: '#b88100',
          800: '#8a5e00',
          900: '#5c3f00',
          950: '#3a2700',
        },
        // True-black ink palette — matches clinic card / chevron walls
        ink: {
          950: '#000000',
          900: '#0a0a0a',
          800: '#171717',
          700: '#262626',
          500: '#525252',
          400: '#737373',
          300: '#a3a3a3',
          200: '#d4d4d4',
          100: '#f5f5f5',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Manrope"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(0, 0, 0, 0.18)',
        gold: '0 12px 40px -10px rgba(255, 199, 44, 0.55)',
        ring: '0 0 0 6px rgba(255, 199, 44, 0.18)',
      },
      borderRadius: {
        xl: '14px',
        '2xl': '18px',
        '3xl': '26px',
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        floaty: 'floaty 4s ease-in-out infinite',
        shimmer: 'shimmer 2.4s linear infinite',
      },
    },
  },
  plugins: [],
};
