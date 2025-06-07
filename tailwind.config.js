/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard'],
      },
      colors: {
        category: {
          none: 'transparent',
          red: '#EF4444',
          orange: '#F97316',
          amber: '#F59E0B',
          yellow: '#EAB308',
          lime: '#84CC16',
          green: '#10B981',
          emerald: '#34D399',
          teal: '#14B8A6',
          cyan: '#06B6D4',
          blue: '#3B82F6',
          indigo: '#6366F1',
          purple: '#8B5CF6',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'media',
}
