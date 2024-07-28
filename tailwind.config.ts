import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'ui-sans-serif', 'system-ui'],
        serif: ['Georgia', 'Times New Roman', 'ui-serif', 'serif'],
        mono: ['Courier New', 'Lucida Console', 'ui-monospace', 'monospace'],
        cursive: ['Comic Sans MS', 'Brush Script MT', 'cursive'],
        fantasy: ['Impact', 'Charcoal', 'fantasy'],
      },
      colors : {
        primary: '#2B42F3', //blue
        secondary: '#BB2532', //red
        tertiary: '#067A1F', //green
        dark: '#2E2E3A', //dark gray
        light: '#F0F0F0', //light gray
        light_highlight: '#E7E7E7', //light gray but darker
      },
      width : {
        '1/8' : '12.5%',
        '1/10' : '10%',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
