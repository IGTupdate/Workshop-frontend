import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
      },
    },
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
        top: "0px -8px 30px #0000001f",
        "3d": "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
        topDivSmall: "inset -1px -5px 40px 0px rgba(0, 0, 0, 0.5)",
        topDiv: "inset -1px -30px 74px 30px rgba(0, 0, 0, 0.5)",
        bottom: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
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
        customYellow: "#F9DC04",
        customBrown: "#A49339",
        antGreay: "#00000073",
        matalicYellow: "#B5A22E",
        customWhite: "rgba(255, 255, 255, 0.6)",
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
        Inter: ["Inter"],
        RobotoFlex: ["Roboto Flex", "sans-serif"],
        RobotoFlexThin: ["Roboto-Flex-Thin", "sans-serif"],
      },
    },
  },
  plugins: [],
  important: true,
};

export default config;
