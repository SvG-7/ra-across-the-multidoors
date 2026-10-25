/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spider: {
          dark: '#08090D',
          navy: '#0B1120',
          midnight: '#0D1527',
          red: '#E62429',
          crimson: '#FF1744',
          hotpink: '#FF2A55',
          blue: '#00D2FF',
          cyan: '#00F0FF',
          azure: '#0066FF',
          yellow: '#FFE600',
          gwenPink: '#FF007F',
          gwenTeal: '#00FFA3',
          paper: '#F6F6F4',
          ink: '#0C0D12'
        }
      },
      fontFamily: {
        comic: ['"Bangers"', 'cursive', 'sans-serif'],
        display: ['"Teko"', 'Impact', 'sans-serif'],
        sans: ['"Outfit"', 'sans-serif'],
      },
      boxShadow: {
        'comic-sm': '3px 3px 0px #000000',
        'comic': '5px 5px 0px #000000',
        'comic-lg': '8px 8px 0px #000000',
        'comic-red': '6px 6px 0px #E62429',
        'comic-cyan': '6px 6px 0px #00F0FF',
        'comic-yellow': '6px 6px 0px #FFE600',
        'neon-red': '0 0 20px rgba(230, 36, 41, 0.6), 0 0 40px rgba(255, 23, 68, 0.3)',
        'neon-cyan': '0 0 20px rgba(0, 240, 255, 0.6), 0 0 40px rgba(0, 210, 255, 0.3)',
      },
      animation: {
        'glitch': 'glitch 2s infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-fast': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
