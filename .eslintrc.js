module.exports = {
  extends: ["react-app", "react-app/jest", "plugin:prettier/recommended"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
        semi: true,
        jsxSingleQuote: false,
      },
    ],
    quotes: ["error", "single"],
    "jsx-quotes": ["error", "prefer-double"],
  },
};
