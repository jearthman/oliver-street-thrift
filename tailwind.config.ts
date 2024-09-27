import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        "max-height": "max-height",
        width: "width",
        "height-and-opacity": "height, opacity",
        height: "height",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        parchment: {
          "50": "#f9f7ed",
          "100": "#f0ead1",
          "200": "#e2d4a6",
          "300": "#d2b972",
          "400": "#c49e4b",
          "500": "#b48a3e",
          "600": "#9b6e33",
          "700": "#7c522c",
          "800": "#69442a",
          "900": "#5a3b29",
          "950": "#341f14",
        },
        cinnabar: {
          "50": "#fdf4f3",
          "100": "#fce7e4",
          "200": "#f9d4cf",
          "300": "#f4b5ad",
          "400": "#ec897d",
          "500": "#dd5342",
          "600": "#cc4636",
          "700": "#ab382a",
          "800": "#8e3126",
          "900": "#762f26",
          "950": "#40140f",
        },
      },
    },
  },
  plugins: [],
};
export default config;
