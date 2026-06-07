import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        chaos: {
          bg: '#fbe7ff',
          ink: '#0a0a0a',
          marker: '#ff2ea5',
          highlight: '#fffb00',
          cyan: '#00f0ff',
          puke: '#9aff00',
          tan: '#e8dfc6',
          blood: '#d00000',
        },
      },
      fontFamily: {
        marker: ['"Permanent Marker"', 'cursive'],
        scrawl: ['"Caveat"', '"Permanent Marker"', 'cursive'],
        mono: ['"Space Mono"', '"Courier New"', 'monospace'],
        impact: ['Impact', '"Anton"', 'sans-serif'],
        serif: ['"Times New Roman"', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        comic: ['"Comic Sans MS"', '"Comic Neue"', 'cursive'],
      },
      rotate: {
        '1': '1deg',
        '2': '2deg',
        '3': '3deg',
        '-1': '-1deg',
        '-2': '-2deg',
        '-3': '-3deg',
      },
      keyframes: {
        wobble: {
          '0%,100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
        jitter: {
          '0%,100%': { transform: 'translate(0,0)' },
          '25%': { transform: 'translate(-1px,1px)' },
          '50%': { transform: 'translate(1px,-1px)' },
          '75%': { transform: 'translate(-1px,-1px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        wobble: 'wobble 1.4s ease-in-out infinite',
        jitter: 'jitter 0.15s steps(2) infinite',
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
