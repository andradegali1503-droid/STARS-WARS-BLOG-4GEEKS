/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#030303',
          900: '#050505',
          800: '#0c0c0e',
          700: '#101014',
          card: 'rgba(16, 16, 20, 0.72)',
          border: 'rgba(216, 180, 90, 0.2)',
        },
        sw: {
          gold: '#D8B45A',
          goldLight: '#F5D98A',
          goldDark: '#8C7030',
          white: '#F5F5F5',
          gray: '#888888',
          grayLight: '#AAAAAA',
          cyan: '#48CAE4',
          cyanGlow: 'rgba(72, 202, 228, 0.4)',
          red: '#E63946',
          yellowLogo: '#FFE81F',
        }
      },
      fontFamily: {
        cinematic: ['Orbitron', 'Cinzel', 'sans-serif'],
        tech: ['Rajdhani', 'monospace', 'sans-serif'],
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gold-sm': '0 0 10px rgba(216, 180, 90, 0.25)',
        'gold-md': '0 0 20px rgba(216, 180, 90, 0.35)',
        'gold-lg': '0 0 35px rgba(216, 180, 90, 0.5)',
        'cyan-md': '0 0 20px rgba(72, 202, 228, 0.4)',
        'holo': 'inset 0 0 15px rgba(216, 180, 90, 0.1), 0 0 20px rgba(216, 180, 90, 0.15)',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: 0.2, transform: 'scale(0.8)' },
          '50%': { opacity: 1, transform: 'scale(1.2)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 0.8 },
        }
      },
      animation: {
        twinkle: 'twinkle 4s ease-in-out infinite',
        scanline: 'scanline 8s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
