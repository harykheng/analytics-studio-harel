/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // MD3 dark color roles
        bg: '#0f1117',
        surface: '#1a1d23',
        'surface-variant': '#1e2128',
        'surface-1': '#202430',
        'surface-2': '#232838',
        'surface-3': '#262c3f',
        'surface-4': '#282f45',
        'surface-5': '#2b334a',
        primary: '#D0BCFF',
        'on-primary': '#381E72',
        'primary-container': '#4F378B',
        'on-primary-container': '#EADDFF',
        secondary: '#CCC2DC',
        'on-secondary': '#332D41',
        'secondary-container': '#4A4458',
        'on-secondary-container': '#E8DEF8',
        tertiary: '#EFB8C8',
        'on-tertiary': '#492532',
        'tertiary-container': '#633B48',
        'on-tertiary-container': '#FFD8E4',
        'on-surface': '#E6E1E5',
        'on-surface-variant': '#C9C5D0',
        outline: '#938F99',
        'outline-variant': '#49454F',
        error: '#F2B8B5',
        'on-error': '#601410',
        success: '#7DD8A4',
      },
      borderRadius: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '28px',
      },
      fontFamily: {
        sans: ['"Roboto"', '"Google Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Roboto Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        pulseLive: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.4 },
        },
      },
      animation: {
        shimmer: 'shimmer 1.4s ease-in-out infinite',
        pulseLive: 'pulseLive 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
