/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6E5E1',
          100: '#BAD0CC',
          500: '#409891',
          600: '#48ADB7',
        },
        background: '#E6E5E1',
        accent: '#48ADB7',
        secondary: '#409891',
        muted: '#BAD0CC',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #E6E5E1 0%, #BAD0CC 100%)',
        'gradient-accent': 'linear-gradient(135deg, #409891 0%, #48ADB7 100%)',
      },
    },
  },
  plugins: [],
}
