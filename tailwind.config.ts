import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {     
      backgroundSize: {
        'size-200': '200% 200%',
        'size-300': '300% 300%'
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-100': '100% 100%',
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'ui-sans-serif', 'system-ui'],
        serif: ['Georgia', 'Times New Roman', 'ui-serif', 'serif'],
        mono: ['Courier New', 'Lucida Console', 'ui-monospace', 'monospace'],
        cursive: ['Comic Sans MS', 'Brush Script MT', 'cursive'],
        fantasy: ['Impact', 'Charcoal', 'fantasy'],
      },
      colors: {
        // Primary colors
        'primary-light': '#3A5CF7', // light version of primary color
        'primary': '#2B42F3',       // main primary color
        'primary-dark': '#2438D3',  // dark version of primary color

        // Secondary colors
        'secondary-light': '#33813F', // light version of secondary color
        'secondary': '#107329',       // main secondary color
        'secondary-dark': '#0C6322',  // dark version of secondary color

        // Tertiary colors
        'tertiary-light': '#BE4042', // light version of tertiary color
        'tertiary': '#B1222E',       // main tertiary color
        'tertiary-dark': '#991C27',  // dark version of tertiary color

        // Light and dark shades
        'less-light': '#A9A3A7',           // light shade
        'light': '#D4D0D2',      // slightly less light shade
        'more-light': '#FFFFFF',      // even lighter shade

        'more-dark': '#2D2D39',            // dark shade
        'dark': '#44414B',       // slightly less dark shade
        'less-dark': '#7E7880', // even darker shade

        'line-gray':'#CCCCCC',
      },
      width: {
        '1/8': '12.5%',
        '1/10': '10%',
        '18':'4.5rem',
        '76':'19rem',
        '100': '25rem',
        '58': '14.5rem',
        '54': '13.5rem',
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
