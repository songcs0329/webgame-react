module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["react-app", "plugin:prettier/recommended"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        printWidth: 100,
        tabWidth: 2,
        singleQuote: false,
        bracketSpacing: true,
        semi: false,
        useTabs: false,
        trailingComma: "all",
        arrowParens: "avoid",
        endOfLine: "auto",
      },
    ],
  },
}
