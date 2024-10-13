import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5", // Softer blue
        secondary: "#F9FAFB", // Light background
        accent: "#10B981", // Green accent for buttons
        dark: "#111827", // Dark text
      },
      fontFamily: {
        sans: ["Inter", "Helvetica", "Arial", "sans-serif"], // Professional, clean font
      },
      spacing: {
        "128": "32rem",
        "144": "36rem",
      },
    },
  },
  plugins: [],
};
export default config;
