/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'olive': {
          50: '#f6f7f3',
          100: '#e8ebe0',
          200: '#d1d7c2',
          300: '#b4bd9c',
          400: '#96a377',
          500: '#7a8a5c',
          600: '#5f6d47',
          700: '#4a5539',
          800: '#3d4530',
          900: '#343a29',
        },
        'sage': {
          50: '#f5f7f4',
          100: '#e7ebe3',
          200: '#d0d8c9',
          300: '#afbda5',
          400: '#8a9c7d',
          500: '#6d8160',
          600: '#56674b',
          700: '#45523d',
          800: '#394333',
          900: '#30382b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        jp: ['Noto Sans JP', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'zen-pattern': "url('/zen-bg.svg')",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
