#!/usr/bin/env bun
/**
 * Zip the project with only essential files/folders.
 * Usage: bun zip
 */

import { execSync } from "child_process";
import { existsSync, statSync } from "fs";
import { join, basename } from "path";
import * as p from "@clack/prompts";
import color from "picocolors";

// ─── Config ──────────────────────────────────────────────────────────────────

const ROOT_DIR = join(import.meta.dir, "..");
const PROJECT_NAME = basename(ROOT_DIR);

const INCLUDE_DIRS = ["apps", "packages", "scripts", "_docs"];
const INCLUDE_FILES = [".gitignore", ".npmrc", "bun.lock", "package.json", "turbo.json"];

// Patterns to exclude (node_modules, .git, and .gitignore entries)
const EXCLUDE_PATTERNS = [
  "node_modules",
  ".git",
  // .gitignore entries
  ".pnp",
  ".pnp.js",
  ".env",
  ".env.local",
  ".env.development.local",
  ".env.test.local",
  ".env.production.local",
  "coverage",
  ".turbo",
  ".vercel",
  ".next",
  "out",
  "build",
  "dist",
  ".expo",
  "*.jks",
  "*.p8",
  "*.p12",
  "*.key",
  "*.mobileprovision",
  "*.orig.*",
  "web-build",
  "ios",
  "android",
  "npm-debug.log*",
  "yarn-debug.log*",
  "yarn-error.log*",
  ".DS_Store",
  "*.pem",
  "uniwind-types.d.ts",
  // Auto-generated
  ".source",
];

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  p.intro(`${color.bgCyan(color.black(" @sdbank"))} ${color.dim("project zipper")}`);

  // Validate that included paths exist
  const missing: string[] = [];
  for (const dir of INCLUDE_DIRS) {
    const full = join(ROOT_DIR, dir);
    if (!existsSync(full) || !statSync(full).isDirectory()) {
      missing.push(`${dir}/`);
    }
  }
  for (const file of INCLUDE_FILES) {
    if (!existsSync(join(ROOT_DIR, file))) {
      missing.push(file);
    }
  }

  if (missing.length > 0) {
    p.log.warn(`Missing paths (will be skipped): ${color.yellow(missing.join(", "))}`);
  }

  // Filter to only existing paths
  const dirs = INCLUDE_DIRS.filter((d) => existsSync(join(ROOT_DIR, d)));
  const files = INCLUDE_FILES.filter((f) => existsSync(join(ROOT_DIR, f)));

  // Show what will be included
  p.note(
    [
      `${color.dim("Folders")}  ${dirs.map((d) => color.cyan(d + "/")).join(", ")}`,
      `${color.dim("Files")}    ${files.map((f) => color.cyan(f)).join(", ")}`,
      `${color.dim("Exclude")}  node_modules, .git, .gitignore patterns`,
    ].join("\n"),
    "Contents"
  );

  // Ask for output filename
  const nameResult = await p.text({
    message: "Output filename",
    initialValue: `${PROJECT_NAME}.zip`,
    validate(value) {
      if (!value) return undefined; // use default
      if (!value.endsWith(".zip")) return "Filename must end with .zip";
    },
  });

  if (p.isCancel(nameResult)) {
    p.cancel("Cancelled.");
    process.exit(0);
  }

  const zipName = nameResult as string;
  const zipPath = join(ROOT_DIR, "..", zipName);

  // Confirm
  const shouldProceed = await p.confirm({
    message: `Create ${color.cyan(zipName)} in parent directory?`,
  });

  if (p.isCancel(shouldProceed) || !shouldProceed) {
    p.cancel("Cancelled.");
    process.exit(0);
  }

  // Build zip
  const s = p.spinner();
  s.start("Creating zip archive");

  try {
    // Build exclude flags for zip
    const excludeFlags = EXCLUDE_PATTERNS.flatMap((pat) => [
      `-x "${PROJECT_NAME}/${pat}"`,
      `-x "${PROJECT_NAME}/${pat}/*"`,
      `-x "${PROJECT_NAME}/*/${pat}/*"`,
      `-x "${PROJECT_NAME}/*/*/${pat}/*"`,
      `-x "${PROJECT_NAME}/*/*/*/${pat}/*"`,
    ]).join(" ");

    // Build include list: dirs with trailing /* and individual files
    const includePaths = [
      ...dirs.map((d) => `"${PROJECT_NAME}/${d}"`),
      ...files.map((f) => `"${PROJECT_NAME}/${f}"`),
    ].join(" ");

    // Remove existing zip if present
    const rmCmd = existsSync(zipPath) ? `rm -f "${zipPath}" && ` : "";

    const cmd = `${rmCmd}cd "${join(ROOT_DIR, "..")}" && zip -r "${zipName}" ${includePaths} ${excludeFlags}`;

    execSync(cmd, { stdio: "pipe", maxBuffer: 50 * 1024 * 1024 });

    // Get file size
    const stats = statSync(zipPath);
    const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);

    s.stop(`Zip created ${color.dim(`(${sizeMB} MB)`)}`);

    p.note(
      `${color.dim(zipPath)}`,
      `${color.green("✓")} ${zipName}`
    );

    p.outro(color.green("Done!"));
  } catch (err: unknown) {
    s.stop("Failed");
    const msg = err instanceof Error ? err.message : String(err);
    p.log.error(msg);
    p.cancel("Zip creation failed.");
    process.exit(1);
  }
}

main().catch((err) => {
  p.cancel(err instanceof Error ? err.message : String(err));
  process.exit(1);
});
