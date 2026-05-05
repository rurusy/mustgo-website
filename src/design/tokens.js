// Single source of truth for design tokens (mirrors tailwind.config.js).
// Values are also exposed here so they can be used in JS contexts: hero
// background images, programmatic styles, the styleguide page, etc.

export const colors = {
  brand: {
    blue: { DEFAULT: '#42b2e6', dark: '#3aa8dc', light: '#5ac4f0' },
    green: { DEFAULT: '#6cbd45', light: '#82c95f' },
  },
  amber: { 500: '#F59E0B', 600: '#D97706', 700: '#B45309' },
  ink: { 900: '#1A1A1A', 800: '#2C2C2C' },
  surface: { soft: '#F8F9FA' },
}

export const typography = {
  sans: '"Noto Sans KR", sans-serif',
  eng: '"Inter", sans-serif',
  scale: {
    'display-1': '2.25rem / 1.2 / 700',
    'display-2': '1.875rem / 1.25 / 700',
    'heading': '1.5rem / 1.3 / 700',
    'subheading': '1.25rem / 1.4 / 600',
    'body': '0.9375rem / 1.7 / 400',
    'caption': '0.75rem / 1.5 / 500',
  },
}

export const spacing = {
  section: { y: 'py-24 lg:py-32', x: 'px-6 lg:px-12' },
  container: 'max-w-layout mx-auto',
}

export const radius = {
  sharp: 'rounded-sm',
  default: 'rounded',
  card: 'rounded-lg',
  pill: 'rounded-full',
}

// Hero cinematic 4-shot sequence (Unsplash License — free for commercial use).
// Order: airport runway → business class seat → Seoul night skyline → VIP chauffeur.
export const heroImages = [
  {
    src: 'https://images.unsplash.com/photo-1608601006827-c052e2358d6d?auto=format&fit=crop&q=80&w=1920',
    alt: 'Airport runway at dawn',
  },
  {
    src: 'https://images.unsplash.com/photo-1747441977439-f8ded946d957?auto=format&fit=crop&q=80&w=1920',
    alt: 'Business class cabin',
  },
  {
    src: 'https://images.unsplash.com/photo-1671160394835-d871e3d19eb2?auto=format&fit=crop&q=80&w=1920',
    alt: 'Seoul skyline at night',
  },
  {
    src: 'https://images.unsplash.com/photo-1627285886624-5cd637dafb50?auto=format&fit=crop&q=80&w=1920',
    alt: 'VIP chauffeur car',
  },
]

// Cinematic crossfade timing — synced with `@keyframes heroCrossfade` in index.css.
export const heroCycleSeconds = 32
export const heroStepSeconds = 8
