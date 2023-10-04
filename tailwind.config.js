/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  theme: {
    colors: {
      'white': '#ffffff',
      'primary': '#0079FF',
      'title-color': '#1E1E1E',
      'acc-color': '#777777',
      'pl-color': '#aaaaaa',
      'input-color': '#F6F7F9',
      'acc-btn': '#D9D9D9',
      'acc-color-2': '#737373',
      'main-bg':'#F1F1F1'
    },
  }
}
