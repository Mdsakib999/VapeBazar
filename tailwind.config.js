/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Dancing: ["Dancing Script", "cursive"],
        Poppins: ["Poppins", "sans-serif"],
        barrio: ["Barrio", "sans-serif"],
      },
      backgroundImage: {
        bannerBgImage: "url('/public/homePage/banner.jpg')",
      },
      keyframes: {
        fadeLeft: {
          "0%": { opacity: 0, transform: "translateX(50px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        fadeRight: {
          "0%": { opacity: 0, transform: "translateX(-100px) scaleX(-1)" },
          "100%": { opacity: 1, transform: "translateX(0) scaleX(-1)" },
        },
      },
      animation: {
        fadeLeft: "fadeLeft 1s ease-out",
        fadeRight: "fadeRight 1s ease-in",
        fade: "fade linear forwards",
      },
      colors: {
        primaryColor: "#6366F1",
        secondaryColor: "#9C27B0",
        accentColor: "#00FFFF",
        backgroundColor: "#2C2C2C",
        textColor: "#FFFFFF",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".rotate-180": {
          transform: "rotate(180deg)",
        },
      });
    },
    require("@tailwindcss/typography"),
  ],
};
