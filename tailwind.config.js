/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0B2447',
          900: '#0F2A52',
          800: '#123B6B',
          700: '#154684',
        },
        brand: {
          DEFAULT: '#1D5FAE',
          light: '#3B82D6',
          soft: '#EAF3FC',
        },
        teal: {
          accent: '#14B8A6',
        },
        slate: {
          copy: '#5B6B82',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 8px 24px -12px rgba(15, 42, 82, 0.18)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
