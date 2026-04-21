import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        nexus: {
          bg: '#0B0F1A',
          panel: '#111827',
          border: '#1F2937',
          accent: '#6366F1',
          accent2: '#22D3EE',
          success: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444',
          muted: '#9CA3AF',
        },
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
