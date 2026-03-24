/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--bg-base)',
        surface: 'var(--bg-surface)',
        primary: 'var(--color-primary)',
        accent: 'var(--color-accent)',
        content: 'var(--text-main)',
        muted: 'var(--text-muted)',
        border: 'var(--border-color)',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-main)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
