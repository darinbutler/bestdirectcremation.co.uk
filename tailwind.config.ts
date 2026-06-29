import type { Config } from 'tailwindcss';

/**
 * Tailwind config — tokens reproduce the existing BDC visual.
 * Colours sampled from the live site (gold accent, cream, sage, navy).
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand
        gold: { DEFAULT: '#A77A2F', dark: '#8B6526', light: '#C49B5C' },
        navy: { DEFAULT: '#1F2A44', dark: '#15203A' },
        sage: { 50: '#F4F7F4', 100: '#E8EDE9', 700: '#4D6657', 800: '#3F564A', 900: '#3B5447' },
        cream: { DEFAULT: '#FAF6EE', warm: '#F4ECDA' },
        stone: '#EFEAE0',
        ink: '#1A1A1A',
      },
      fontFamily: {
        serif: ['var(--font-literata)', 'Georgia', 'serif'],
        sans:  ['var(--font-cabin)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'section': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.2' }],
      },
      maxWidth: {
        'container': '1280px',
        'prose-wide': '72ch',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(31, 42, 68, 0.06), 0 1px 2px rgba(31, 42, 68, 0.04)',
        'lift': '0 8px 24px rgba(31, 42, 68, 0.08), 0 2px 6px rgba(31, 42, 68, 0.04)',
      },
      borderRadius: {
        'card': '0.75rem',
      },
      backgroundImage: {
        'gradient-overlay': 'linear-gradient(to bottom, rgba(31,42,68,0.55), rgba(31,42,68,0.25))',
      },
    },
  },
  plugins: [],
};

export default config;
