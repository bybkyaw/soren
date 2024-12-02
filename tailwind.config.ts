import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F5F7F2",  //baby-powder
        navbar: "#ffffff",
        accent: {
          moonstone: "#9BB6C7",
          af_white: "#F3F6F6",
          vista: "#7E9CDD",
          minBlue: "#4F5E7F",
          black_olive: "#2A2C24",
          raisin_black: "#222731",
          mindaro: "#D5E68D",
          oxford_blue: "#192131",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;