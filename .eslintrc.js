module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    sourceType: "module",
    allowImportExportEverywhere: false,
    ecmaFeatures: {
      globalReturn: false,
    },
  },
  extends: "google",
  rules: {
    quotes: ["never", "double"],
    "no-unused-vars": "warn",
    "object-curly-spacing": "always",
  },
};
