// site/tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg:             'var(--color-bg)',
        surface:        'var(--color-surface)',
        'surface-soft': 'var(--color-surface-soft)',
        text:           'var(--color-text)',
        muted:          'var(--color-muted)',
        accent:         'var(--color-accent)',
        divider:        'var(--color-divider)',
      },
      fontFamily: {
        // matches Hugo PaperMod / lilianweng.github.io system stack
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          '"Open Sans"',
          '"Helvetica Neue"',
          'sans-serif',
        ],
        mono: ['monospace'],
      },
      maxWidth: {
        column: '720px',
        content: '55rem',
      },
    },
  },
  plugins: [],
};
