import { config } from "@sdbank/eslint-config/react-internal";

export default [
  ...config,
  // Shims, mocks, and loaders use `any` intentionally
  {
    files: [
      "src/next/react-native-shim.tsx",
      "src/next/with-sdb-ui.ts",
      "test/react-native-mock.ts",
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  // CJS loader — `module` is a global, @ts-nocheck is needed for shim
  {
    files: ["loaders/**/*.cjs"],
    rules: {
      "no-undef": "off",
    },
  },
  // Shim requires @ts-nocheck and dynamic require
  {
    files: ["src/next/react-native-shim.tsx"],
    rules: {
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },
  {
    files: ["src/next/with-sdb-ui.ts"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];
