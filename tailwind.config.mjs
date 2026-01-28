/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['Geist Mono', 'Monaco', 'Courier New', 'monospace'],
      },
      colors: {
        // Vercel color palette
        vercel: {
          black: '#000000',
          white: '#FFFFFF',
          gray: {
            50: '#FAFAFA',
            100: '#F5F5F5',
            200: '#E5E5E5',
            300: '#D4D4D4',
            400: '#A3A3A3',
            500: '#737373',
            600: '#525252',
            700: '#404040',
            800: '#262626',
            900: '#171717',
            950: '#0A0A0A',
          },
          accent: {
            50: '#F0F9FF',
            100: '#E0F2FE',
            200: '#BAE6FD',
            300: '#7DD3FC',
            400: '#38BDF8',
            500: '#0EA5E9',
            600: '#0284C7',
            700: '#0369A1',
            800: '#075985',
            900: '#0C4A6E',
          },
        },
      },
      spacing: {
        // Vercel-style generous spacing
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        // Subtle, modern radius
        'vercel': '5px',
        'vercel-lg': '8px',
        'vercel-xl': '12px',
      },
      boxShadow: {
        // Vercel-style minimal shadows
        'vercel-sm': '0 2px 4px rgba(0,0,0,0.06)',
        'vercel': '0 4px 8px rgba(0,0,0,0.08)',
        'vercel-md': '0 8px 16px rgba(0,0,0,0.10)',
        'vercel-lg': '0 16px 32px rgba(0,0,0,0.12)',
        'vercel-glow': '0 0 20px rgba(14,165,233,0.15)',
      },
      borderColor: {
        // Subtle border colors using rgba
        'vercel-border': 'rgba(255,255,255,0.1)',
        'vercel-border-light': 'rgba(0,0,0,0.1)',
      },
      animation: {
        // Smooth transitions
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
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
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      transitionDuration: {
        '250': '250ms',
      },
      transitionTimingFunction: {
        'vercel': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
