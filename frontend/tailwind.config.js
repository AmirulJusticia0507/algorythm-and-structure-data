/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0d1117',
        'bg-secondary': '#161b22',
        'bg-tertiary': '#21262d',
        border: '#30363d',
        text: '#e6edf3',
        'text-muted': '#8b949e',
        accent: '#58a6ff',
        'accent-hover': '#79b8ff',
        success: '#3fb950',
        danger: '#f85149',
        warning: '#d29922',
        purple: '#a371f7',
        orange: '#f78166',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}