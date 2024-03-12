import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    spacing: {
      "0": "0rem",
      "01": "0.1rem",
      "02": "0.2rem",
      "03": "0.3rem",
      "04": "0.4rem",
      "05": "0.5rem",
      "06": "0.6rem",
      "07": "0.7rem",
      "08": "0.8rem",
      "09": "0.9rem",
      "011": "1.1rem",
      "012": "1.2rem",
      "013": "1.3rem",
      "014": "1.4rem",
      "015": "1.5rem",
      "016": "1.6rem",
      "017": "1.7rem",
      "018": "1.8rem",
      "1": "1rem",
      "2": "2rem",
      "3": "3rem",
      "4": "4rem",
      "5": "5rem",
      "6": "6rem",
      "7": "7rem",
      "8": "8rem",
      "9": "9rem",
      "10": "10rem",
      a4w: "23cm",
      a4h: "31.7cm",
    },

    fontFamily: {
      main: ['"Mali"', "cursive"],
      header: ['"Amatic SC"', "cursive"],
    },
    extend: {
      fontSize: {
        "1": ["1rem", "1.5rem"],
        "2": ["2rem", "1.5rem"],
        "3": ["3rem", "1.5rem"],
        "4": ["4rem", "1.5rem"],
        "5": ["5rem", "1.5rem"],
        "6": ["6rem", "1.5rem"],
        "7": ["7rem", "1.5rem"],
        "8": ["8rem", "1.5rem"],
        "9": ["9rem", "1.5rem"],
        "10": ["10rem", "1.5rem"],
      },

      gridTemplateColumns: {
        "devices": "repeat(auto-fit, minmax(25rem, 35rem))",
      },

      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        lg: "0 4px 8px var(--tw-shadow-color)",
        xl: "0 8px 16px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
      },

      backgroundImage: {
        "main-header": "url('/images/home-background.jpg')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        background: "rgb(var(--color-background) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        error: "#B00020",
        onPrimary: "rgb(var(--color-onPrimary) / <alpha-value>)",
        onSecondary: "rgb(var(--color-onSecondary) / <alpha-value>)",
        onBackground: "rgb(var(--color-onBackground) / <alpha-value>)",
        onSurface: "rgb(var(--color-onSurface) / <alpha-value>)",
        onError: "#FFFFFF",
        divider: "#BDBDBD",
      },
      keyframes: {
        fadeIn: {
          from: {
            opacity: "0",
          },

          to: {
            opacity: "1",
          },
        },

        fadeInUp: {
          from: {
            transform: "translate3d(0, 20%, 0)",
            visibility: "visible",
            opacity: "0",
          },

          to: {
            transform: "translate3d(0, 0, 0)",
            visibility: "visible",
            opacity: "1",
          },
        },

        fadeInDown: {
          from: {
            opacity: "0",
            transform: "translate3d(0, -100%, 0)",
            visibility: "visible",
          },
          to: {
            opacity: "1",
            transform: "translate3d(0, 0, 0)",
            visibility: "visible",
          },
        },

        bgAnim: {
          from: {
            filter: "blur(2rem)",
          },
          to: {
            filter: "blur(0rem)",
          },
        },
      },

      animation: {
        fadeInDown:
          "fadeInDown 1s cubic-bezier(0.25,0.1,0.25,1.5) 0s 1 forwards",
        fadeInUp: "fadeInUp 1s ease 0s 1 forwards",
        bgAnim: "bgAnim 1s ease-in 0s 1 forwards",
        slideInLeft:
          "slideInLeft 1s cubic-bezier(0.25,0.1,0.25,1.5) 0.5s 1 forwards",
        slideInRight:
          "slideInRight 1s cubic-bezier(0.25,0.1,0.25,1.5) 0.5s 1 forwards",
        slideInDown:
          "slideInDown 1s cubic-bezier(0.25,0.1,0.25,1.5) 0.5s 1 forwards",
        slideInUp:
          "slideInUp 1s cubic-bezier(0.25,0.1,0.25,1.5) 0.5s 1 forwards",
        fadeIn: "fadeIn 1s linear 1s 1 forwards",
      },

      animationDelay: {
        "0": "0ms",
        "1": "1s",
        "2": "2s",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") },
      );
    }),
  ],
};
export default config;