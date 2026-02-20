import { config } from "@sdbank/eslint-config/react-internal";

export default [
  ...config,
  // CJS config files (babel, metro) use require/module/__dirname
  {
    files: ["babel.config.js", "metro.config.js"],
    rules: {
      "no-undef": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];
