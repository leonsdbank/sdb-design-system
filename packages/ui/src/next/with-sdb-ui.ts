import path from "path";

// ---------------------------------------------------------------------------
// Minimal inline types — avoids requiring `next` as a dependency
// ---------------------------------------------------------------------------

interface TurbopackConfig {
  resolveAlias?: Record<string, string>;
  rules?: Record<string, { loaders: string[]; as: string }>;
}

interface WebpackConfig {
  resolve: {
    extensions: string[];
  };
  plugins: any[];
}

export interface NextConfig {
  transpilePackages?: string[];
  turbopack?: TurbopackConfig;
  webpack?: (config: WebpackConfig, context: any) => WebpackConfig;
  [key: string]: any;
}

// ---------------------------------------------------------------------------
// Resolve paths relative to this file's package root
// ---------------------------------------------------------------------------

// Both in dev (src/next/) and published (dist/next/): ../.. = package root
const packageRoot = path.resolve(__dirname, "../..");

const shimPath = path.resolve(packageRoot, "src/next/react-native-shim.tsx");
const loaderPath = path.resolve(
  packageRoot,
  "loaders/replace-rnw-stylesheet.cjs"
);

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface SdbUIOptions {
  /**
   * Extra packages to transpile (merged with the defaults).
   * @default []
   */
  extraTranspilePackages?: string[];
}

/**
 * Wraps a Next.js config with everything needed to render `@sdbank/ui` components
 * via react-native-web with correct Tailwind CSS class support.
 *
 * ```ts
 * // next.config.ts
 * import { withSdbUI } from "@sdbank/ui/next";
 * export default withSdbUI({ /* your NextConfig *\/ });
 * ```
 */
export function withSdbUI(
  nextConfig: NextConfig = {},
  options: SdbUIOptions = {}
): NextConfig {
  const { extraTranspilePackages = [] } = options;

  // Turbopack resolveAlias requires a relative path (from project root).
  // Compute it at call time so process.cwd() reflects the consumer's project.
  const relativeShimPath =
    "./" + path.relative(process.cwd(), shimPath).split(path.sep).join("/");

  // --- transpilePackages ---------------------------------------------------
  const transpilePackages = Array.from(
    new Set([
      "@sdbank/ui",
      "react-native-web",
      ...(nextConfig.transpilePackages ?? []),
      ...extraTranspilePackages,
    ])
  );

  // --- Turbopack -----------------------------------------------------------
  const consumerTurbopack = nextConfig.turbopack ?? {};

  const turbopack: TurbopackConfig = {
    ...consumerTurbopack,
    resolveAlias: {
      ...consumerTurbopack.resolveAlias,
      "react-native": relativeShimPath,
    },
    rules: {
      ...consumerTurbopack.rules,
      "**/createOrderedCSSStyleSheet.js": {
        loaders: [loaderPath],
        as: "*.js",
      },
    },
  };

  // --- Webpack (fallback for `next dev --webpack`) -------------------------
  const consumerWebpack = nextConfig.webpack;

  function webpack(config: WebpackConfig, context: any): WebpackConfig {
    // Prepend .web.* extensions
    config.resolve.extensions = [
      ".web.tsx",
      ".web.ts",
      ".web.js",
      ...config.resolve.extensions,
    ];

    // Alias react-native → shim
    const { NormalModuleReplacementPlugin } = require("webpack");
    config.plugins.push(
      new NormalModuleReplacementPlugin(/^react-native$/, shimPath)
    );

    // Chain consumer's webpack if present
    return consumerWebpack ? consumerWebpack(config, context) : config;
  }

  // --- Merge & return ------------------------------------------------------
  return {
    ...nextConfig,
    transpilePackages,
    turbopack,
    webpack,
  };
}
