/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Source Serif Pro"', '"Source Serif 4"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Okabe–Ito-inspired, color-blind safe.
        ink: '#1f2933',
        paper: '#fafaf7',
        rule: '#e5e3dc',
        muted: '#5b6470',
        nash: '#d55e00',     // vermillion (cases)
        control: '#0072b2',  // blue (controls)
        accent: '#009e73',   // bluish-green
        warn: '#e69f00',     // orange-yellow
        danger: '#cc79a7',   // reddish-purple
      },
      maxWidth: {
        prose: '70ch',
      },
    },
  },
  plugins: [],
};
