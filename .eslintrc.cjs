module.exports = {
  parser: "@typescript-eslint/parser", // needed for TS/TSX
  plugins: ["@typescript-eslint", "unused-imports"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  rules: {
    // Automatically remove unused imports on fix
    "unused-imports/no-unused-imports": "error",

    // Optionally highlight unused vars too
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
  },
};
