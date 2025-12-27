import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        instagram: {
          purple: '#833AB4',
          pink: '#E1306C',
          orange: '#F77737',
          yellow: '#FCAF45',
        },
      },
    },
  },
  plugins: [],
}
export default config
