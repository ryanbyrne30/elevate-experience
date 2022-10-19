/** @type {import('tailwindcss').Config} */

const generateColorClass = (variable) => {
  return ({ opacityValue }) =>
    opacityValue
      ? `rgba(var(--${variable}), ${opacityValue})`
      : `rgb(var(--${variable}))`;
};

const colors = {
  primary: generateColorClass("primary"),
  primaryLight: generateColorClass("primaryLight"),
  primaryDark: generateColorClass("primaryDark"),
  error: generateColorClass("error"),
  secondary: generateColorClass("secondary"),
  secondaryLight: generateColorClass("secondaryLight"),
  secondaryDark: generateColorClass("secondaryDark"),
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
