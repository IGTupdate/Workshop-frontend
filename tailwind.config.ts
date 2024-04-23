import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      xmd: "980px",
      lg: "1024px",
      xl: "1250px",
      "2xl": "1536px",
    },
    extend: {
      boxShadow: {
        'top': '0px -8px 30px #0000001f',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        white1: "#fff",
        black1: "#141414",
        gray1: "#8c8c8c",
        blue1: "#1890ff",
        blue2: "#001529",
        green1: "#24ae55",
        customGray: "#2E3033",
        customLightGray: "#CDCDCE",
        customYellow: "#FFE200",
        customBrown: "#A49339",
        antGreay: "#00000073"
      },
      fontFamily: {
        kanit: [
          "Kanit-Thin",
          "Kanit-Light",
          "Kanit-ExtraLight",
          "Kanit-Regular",
          "Kanit-Medium",
          "Kanit-SemiBold",
          "Kanit-Bold",
          "Kanit-ExtraBold",
          "Kanit-Black",
          "Kanit-UltraBold",
          "Kanit-Heavy",
          "Kanit-ExtraBlack",
          "Kanit-ThinItalic",
          "Kanit-LightItalic",
          "Kanit-Italic",
          "Kanit-MediumItalic",
          "Kanit-BoldItalic",
          "Kanit-BlackItalic",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
  important: true
};

export default config;
