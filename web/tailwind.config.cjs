/** @type {import('tailwindcss').Config} */

const generateColorClass = (variable) => {
  return ({ opacityValue }) =>
    opacityValue
      ? `rgba(var(--${variable}), ${opacityValue})`
      : `rgb(var(--${variable}))`;
};

const colors = {
  primary: generateColorClass("primary"),
  "primary-light": generateColorClass("primary-light"),
  "primary-dark": generateColorClass("primary-dark"),
  error: generateColorClass("error"),
  secondary: generateColorClass("secondary"),
  "secondary-light": generateColorClass("secondary-light"),
  "secondary-dark": generateColorClass("secondary-dark"),
  accent1: generateColorClass("accent1"),
  accent2: generateColorClass("accent2"),
};

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,astro}"],
  theme: {
    extend: {
      textColor: colors,
      backgroundColor: colors,
      borderColor: colors,
      fillColor: colors,
      outlineColor: colors,
      fontFamily: {
        heading: ["Pragati Narrow", "sans-serif"],
      },
    },
  },
  plugins: [],
};
