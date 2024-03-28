import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    extend: {
      animation: {
        sliding: "sliding 30s linear infinite",
      },
      colors: {
        "violet": "#7b63ff",
        "violet-secondary": "#dde4fc",
        "black": "#414042",
        "black-secondary": "#f2f2f2",
        "gray-primary": "#898b8e",
        "gray-secondary": "#e7e8e8",
        "green": "#00ad 6c",
        "off-white": "#f6f6f6",
        "blue-niivo": "#00ad6c",
        "blue-facebook": "#1877F2",
      },
      keyframes: {
        sliding: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
};
