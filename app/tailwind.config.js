/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'textColor': 'hsl(var(--text))',
        'backgroundColor': 'hsl(var(--background))',
        'backgroundHoverColor': 'hsl(var(--backgroundHover))',
        'primaryColor': 'hsl(var(--primary))',
        'secondaryColor': 'hsl(var(--secondary))',
        'accentColor': 'hsl(var(--accent))',
       },
    },
  },
  plugins: [],
}

