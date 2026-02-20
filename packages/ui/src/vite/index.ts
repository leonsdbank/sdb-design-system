import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const _require = createRequire(import.meta.url);

// ---------------------------------------------------------------------------
// Minimal inline types — avoids requiring `vite` as a dependency
// ---------------------------------------------------------------------------

interface AliasConfig {
  find: string | RegExp;
  replacement: string;
}

interface EsbuildPlugin {
  name: string;
  setup: (build: any) => void;
}

export interface ViteConfig {
  plugins?: any[];
  resolve?: {
    alias?: Record<string, string> | AliasConfig[];
    extensions?: string[];
    [key: string]: any;
  };
  optimizeDeps?: {
    esbuildOptions?: {
      plugins?: EsbuildPlugin[];
      [key: string]: any;
    };
    [key: string]: any;
  };
  [key: string]: any;
}

// ---------------------------------------------------------------------------
// Resolve paths relative to this file's package root
// ---------------------------------------------------------------------------

// Both in dev (src/vite/) and published (dist/vite/): ../.. = package root
const packageRoot = path.resolve(__dirname, "../..");

// Dev: src/index.ts exists at package root. Published (dist-only): it doesn't.
const isDev = fs.existsSync(path.resolve(packageRoot, "src/index.ts"));
const assetsBase = isDev ? packageRoot : path.resolve(packageRoot, "dist");

const shimPath = path.resolve(assetsBase, "src/next/react-native-shim.tsx");
const loaderPath = path.resolve(
  assetsBase,
  "loaders/replace-rnw-stylesheet.cjs"
);

// ---------------------------------------------------------------------------
// Load the RNW stylesheet replacement code
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-require-imports
const loaderFn = _require(loaderPath);
const rnwReplacementCode: string = loaderFn();

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface SdbUIViteOptions {
  /**
   * Additional resolve aliases to merge.
   * @default {}
   */
  extraAliases?: Record<string, string>;
}

/**
 * Wraps a Vite config with everything needed to render `@sdbank/ui` components
 * via react-native-web with correct Tailwind CSS class support.
 *
 * What it does:
 * 1. **resolve.alias** — Maps `react-native` imports to the `$$css` className bridge shim.
 * 2. **resolve.extensions** — Prepends `.web.*` extensions so web-specific files are preferred.
 * 3. **optimizeDeps.esbuildOptions.plugins** — Patches react-native-web's
 *    `createOrderedCSSStyleSheet` during pre-bundling to wrap base styles in `@layer rnw`,
 *    so Tailwind utilities always take priority.
 *
 * ```ts
 * // vite.config.ts
 * import { withSdbUI } from "@sdbank/ui/vite";
 * import react from "@vitejs/plugin-react";
 * import tailwindcss from "@tailwindcss/vite";
 *
 * export default withSdbUI({
 *   plugins: [react(), tailwindcss()],
 * });
 * ```
 */
export function withSdbUI(
  viteConfig: ViteConfig = {},
  options: SdbUIViteOptions = {}
): ViteConfig {
  const { extraAliases = {} } = options;

  // --- resolve ---------------------------------------------------------------
  const consumerResolve = viteConfig.resolve ?? {};
  const consumerAliases =
    Array.isArray(consumerResolve.alias) ? consumerResolve.alias : [];
  const consumerAliasRecord = Array.isArray(consumerResolve.alias)
    ? {}
    : consumerResolve.alias ?? {};

  const alias: Record<string, string> = {
    ...consumerAliasRecord,
    "react-native": shimPath,
    ...extraAliases,
  };

  // If consumer used array-style aliases, convert them to record entries
  for (const a of consumerAliases) {
    if (typeof a.find === "string") {
      alias[a.find] = a.replacement;
    }
  }

  const extensions = [
    ".web.tsx",
    ".web.ts",
    ".web.js",
    ...(consumerResolve.extensions ?? [".tsx", ".ts", ".js"]),
  ];

  // --- optimizeDeps (esbuild pre-bundling) -----------------------------------
  const consumerOptimizeDeps = viteConfig.optimizeDeps ?? {};
  const consumerEsbuild = consumerOptimizeDeps.esbuildOptions ?? {};
  const consumerEsbuildPlugins = consumerEsbuild.plugins ?? [];

  const rnwLayerPlugin: EsbuildPlugin = {
    name: "sdbank-rnw-layer",
    setup(build) {
      build.onLoad(
        { filter: /createOrderedCSSStyleSheet/ },
        () => ({
          contents: rnwReplacementCode,
          loader: "js",
        })
      );
    },
  };

  // --- Merge & return --------------------------------------------------------
  return {
    ...viteConfig,
    resolve: {
      ...consumerResolve,
      alias,
      extensions,
    },
    optimizeDeps: {
      ...consumerOptimizeDeps,
      esbuildOptions: {
        ...consumerEsbuild,
        plugins: [...consumerEsbuildPlugins, rnwLayerPlugin],
      },
    },
  };
}
