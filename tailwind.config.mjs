/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'neu-light':
          '6px 6px 6px 0px rgba(0, 0, 0, 0.08),-6px -6px 6px 0px rgba(255, 255, 255, 0.7)',
        'neu-dark':
          '0px 0px 20px 0px #083344,0 0 8px 0px #164e63,0 0 3px 0px #155e75',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tw-neumorphism'),
  ],
  darkMode: 'selector',
};
