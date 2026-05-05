/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand — accents used throughout the marketing site
        brand: {
          blue: {
            DEFAULT: '#42b2e6',
            dark: '#3aa8dc',
            light: '#5ac4f0',
          },
          green: {
            DEFAULT: '#6cbd45',
            light: '#82c95f',
          },
        },
        // Primary CTA color (Tailwind's amber, anchored to design tokens)
        amber: {
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
        // Surface / ink scale used by dark sections and footer
        ink: {
          900: '#1A1A1A',
          800: '#2C2C2C',
        },
        surface: {
          soft: '#F8F9FA',
        },
        // Legacy tokens kept for parity with the original design config
        mustgo: {
          navy: '#D97706',
          'navy-light': '#F59E0B',
          green: '#4B5563',
          'green-light': '#9CA3AF',
          dark: '#2C2C2C',
          text: '#374151',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans KR"', 'sans-serif'],
        eng: ['"Inter"', 'sans-serif'],
      },
      maxWidth: {
        layout: '1440px',
      },
      letterSpacing: {
        wide2: '0.2em',
      },
      boxShadow: {
        floating: '0 20px 40px -16px rgba(0,0,0,0.25)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'hero-crossfade': 'heroCrossfade 24s infinite linear',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        heroCrossfade: {
          '0%, 20%': { opacity: '1', transform: 'scale(1.0)' },
          '25%': { opacity: '0', transform: 'scale(1.05)' },
          '95%': { opacity: '0', transform: 'scale(1.05)' },
          '100%': { opacity: '1', transform: 'scale(1.0)' },
        },
      },
    },
  },
  plugins: [],
}
