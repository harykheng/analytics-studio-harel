/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // MD3 light color roles, tuned toward a deep-green brand accent
        bg: '#F4F6F5',
        surface: '#FFFFFF',
        'surface-variant': '#EEF1EF',
        'surface-1': '#FFFFFF',
        'surface-2': '#F1F4F2',
        'surface-3': '#E8ECE9',
        'surface-4': '#E1E6E2',
        'surface-5': '#DAE0DB',
        primary: '#14532D',
        'on-primary': '#FFFFFF',
        'primary-container': '#DCFCE7',
        'on-primary-container': '#0F3D22',
        secondary: '#3F6B57',
        'on-secondary': '#FFFFFF',
        'secondary-container': '#E3EEE7',
        'on-secondary-container': '#1F3A2C',
        tertiary: '#F97362',
        'on-tertiary': '#FFFFFF',
        'tertiary-container': '#FFE4DF',
        'on-tertiary-container': '#7A2A1E',
        'on-surface': '#111827',
        'on-surface-variant': '#6B7280',
        outline: '#D1D5DB',
        'outline-variant': '#E5E7EB',
        error: '#DC2626',
        'on-error': '#FFFFFF',
        success: '#16A34A',
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
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        popIn: {
          '0%': { opacity: 0, transform: 'scale(0.96)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        countUp: {
          '0%': { opacity: 0, transform: 'translateY(4px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.4s ease-in-out infinite',
        pulseLive: 'pulseLive 1.6s ease-in-out infinite',
        fadeInUp: 'fadeInUp 0.45s cubic-bezier(0.16, 1, 0.3, 1) both',
        popIn: 'popIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
        countUp: 'countUp 0.35s ease-out both',
      },
    },
  },
  plugins: [],
}
