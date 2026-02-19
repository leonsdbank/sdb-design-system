const { getDefaultConfig } = require("expo/metro-config");
const { withUniwindConfig } = require("uniwind/metro");
const path = require("path");

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// Watch the entire monorepo so changes in packages/ui are picked up
config.watchFolders = [monorepoRoot];

// Resolve modules from both project and monorepo root node_modules
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(monorepoRoot, "node_modules"),
];

// Force single copies of critical packages to prevent duplicate React in monorepo
const singletonPkgs = ["react", "react-dom", "react-native-web"];
const singletonDirs = {};
for (const pkg of singletonPkgs) {
  singletonDirs[pkg] = path.resolve(projectRoot, "node_modules", pkg);
}
config.resolver.extraNodeModules = singletonDirs;

// Critical: 1) Pin react/react-dom to single copy (incl. subpaths), 2) Redirect RN → RNW on web
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Force singleton resolution for react, react-dom, react-native-web (and subpaths like react-dom/client)
  for (const pkg of singletonPkgs) {
    if (moduleName === pkg || moduleName.startsWith(pkg + "/")) {
      return context.resolveRequest(
        { ...context, originModulePath: path.join(singletonDirs[pkg], "dummy.js") },
        moduleName,
        platform,
      );
    }
  }

  // Redirect react-native → react-native-web for non-node_modules on web
  if (
    platform === "web" &&
    moduleName === "react-native" &&
    !context.originModulePath.includes(`${path.sep}node_modules${path.sep}`)
  ) {
    return context.resolveRequest(context, "react-native-web", platform);
  }

  return context.resolveRequest(context, moduleName, platform);
};

// Uniwind must be outermost wrapper; cssEntryFile must be relative
module.exports = withUniwindConfig(config, { cssEntryFile: "./global.css" });
