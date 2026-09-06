/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        seagreen: {
          primary: '#176B63', // Deep Sea Green
          secondary: '#2F8F83', // Sea Green
          dark: '#0E4F4A', // Dark Teal
          seafoam: '#D8F0EA', // Seafoam Light
          aqua: '#EAF7F4', // Pale Aqua
          cream: '#F6F3EC', // Warm Cream Neutral
          charcoal: '#17201F', // Charcoal Text
          gold: '#C8A96B', // Muted Champagne Accent
          deep: '#176B63',
          light: 'rgba(47, 143, 131, 0.15)',
          border: 'rgba(47, 143, 131, 0.28)',
        },
        ivory: {
          50: '#FAF8F5',
          100: '#F6F3EC',
          200: '#EAE6DD',
          300: '#D5CFC3',
          400: '#B0A89A',
        },
        stone: {
          surface: '#124E47',
          border: 'rgba(47, 143, 131, 0.25)',
          subtle: '#D8F0EA',
          card: 'rgba(14, 79, 74, 0.85)',
        },
        charcoal: {
          900: '#061D1C',
          800: '#0A2D2A',
          700: '#0E3E3B',
          600: '#145550',
          500: '#2F8F83',
          400: '#64B8AD',
          300: '#9FE0D6',
        },
        sage: {
          light: '#D8F0EA',
          DEFAULT: '#2F8F83',
          dark: '#176B63',
          subtle: 'rgba(47, 143, 131, 0.2)',
        },
        dusty: {
          light: '#EAF7F4',
          DEFAULT: '#2F8F83',
          dark: '#0E4F4A',
          subtle: 'rgba(23, 107, 99, 0.2)',
        },
        lavender: {
          light: '#EBE8F1',
          DEFAULT: '#7B738D',
          dark: '#5D566E',
          subtle: 'rgba(123, 115, 141, 0.2)',
        },
        terracotta: {
          light: '#F4E9E2',
          DEFAULT: '#C8A96B',
          dark: '#A6874B',
          subtle: 'rgba(200, 169, 107, 0.2)',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        script: ['"Pinyon Script"', 'cursive'],
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(14, 79, 74, 0.2)',
        'card': '0 10px 30px -4px rgba(6, 29, 28, 0.35)',
        'lift': '0 20px 40px -6px rgba(6, 29, 28, 0.5)',
        'gold': '0 4px 25px -2px rgba(200, 169, 107, 0.35)',
        'seagreen': '0 8px 30px -4px rgba(47, 143, 131, 0.45)',
      },
    },
  },
  plugins: [],
}
