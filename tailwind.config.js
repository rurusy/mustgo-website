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
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // 히어로 크로스페이드(@keyframes heroCrossfade)는 src/index.css 에 정의되어
        // 있습니다. Tailwind 쪽에 중복 정의를 두면 두 값이 어긋나기 쉬워 의도적으로 제거.
      },
    },
  },
  plugins: [],
}
