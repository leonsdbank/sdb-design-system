#!/usr/bin/env bun
/**
 * Interactive publish script for @sdbank/ui
 * Usage: bun publish:ui
 *
 * Full pipeline:
 *   1. Check clean git working tree
 *   2. Check npm registry
 *   3. Prompt for new version
 *   4. Run tests, type-check, lint
 *   5. Build
 *   6. Bump version in package.json
 *   7. Git commit
 *   8. Publish to npm
 *   9. Git tag + push
 */

import { execSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import * as p from "@clack/prompts";
import color from "picocolors";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ROOT_DIR = join(import.meta.dir, "..");
const UI_PKG_PATH = join(ROOT_DIR, "packages/ui/package.json");
const ROOT_PKG_PATH = join(ROOT_DIR, "package.json");

function readPkg(): Record<string, unknown> {
  return JSON.parse(readFileSync(UI_PKG_PATH, "utf-8"));
}

function getCurrentVersion(): string {
  return readPkg().version as string;
}

function setVersion(version: string) {
  const pkg = readPkg();
  pkg.version = version;
  writeFileSync(UI_PKG_PATH, JSON.stringify(pkg, null, 2) + "\n");

  // Keep root package.json version in sync
  const rootPkg = JSON.parse(readFileSync(ROOT_PKG_PATH, "utf-8"));
  rootPkg.version = version;
  writeFileSync(ROOT_PKG_PATH, JSON.stringify(rootPkg, null, 2) + "\n");
}

function isValidSemver(v: string): boolean {
  return /^\d+\.\d+\.\d+(-[\w.]+)?$/.test(v);
}

/** Returns the version string if that exact version exists on npm, null otherwise. */
function checkNpmVersion(version: string): string | null {
  try {
    const out = execSync(`npm view @sdbank/ui@${version} version 2>/dev/null`, {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "pipe"],
    }).trim();
    return out || null;
  } catch {
    return null;
  }
}

/** Returns the latest published version on npm, or null if not yet published. */
function getLatestNpmVersion(): string | null {
  try {
    const out = execSync(`npm view @sdbank/ui version 2>/dev/null`, {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "pipe"],
    }).trim();
    return out || null;
  } catch {
    return null;
  }
}

/** Returns true if the git working tree is clean. */
function isGitClean(): boolean {
  try {
    const out = execSync("git status --porcelain", {
      encoding: "utf-8",
      cwd: ROOT_DIR,
    }).trim();
    return out === "";
  } catch {
    return false;
  }
}

function exec(cmd: string, opts: { cwd?: string; inherit?: boolean } = {}) {
  execSync(cmd, {
    cwd: opts.cwd ?? ROOT_DIR,
    stdio: opts.inherit ? "inherit" : "pipe",
  });
}

function handleCancel(value: unknown) {
  if (p.isCancel(value)) {
    p.cancel("Publish cancelled.");
    process.exit(0);
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  p.intro(`${color.bgCyan(color.black(" @sdbank/ui "))} ${color.dim("publish wizard")}`);

  // ── 1. Check clean working tree ────────────────────────────────────────
  if (!isGitClean()) {
    p.log.error(
      `Git working tree is not clean. Commit or stash changes first.`
    );
    p.cancel("Aborted.");
    process.exit(1);
  }
  p.log.success("Git working tree is clean");

  // ── 2. Check npm registry ──────────────────────────────────────────────
  const current = getCurrentVersion();

  const s = p.spinner();
  s.start("Checking npm registry");
  const npmLatest = getLatestNpmVersion();
  s.stop(
    npmLatest
      ? `npm latest: ${color.green(npmLatest)}`
      : `npm latest: ${color.dim("not published yet")}`
  );

  p.note(
    [
      `${color.dim("Package")}    ${color.cyan("@sdbank/ui")}`,
      `${color.dim("Local")}      ${color.yellow(current)}`,
      `${color.dim("npm")}        ${npmLatest ? color.green(npmLatest) : color.dim("—")}`,
    ].join("\n"),
    "Current state"
  );

  // ── 3. Version input ───────────────────────────────────────────────────
  const versionResult = await p.text({
    message: "New version",
    placeholder: "x.y.z",
    validate(value) {
      if (!value) return "Version is required.";
      if (!isValidSemver(value)) return `Invalid semver "${value}". Use x.y.z format.`;
      if (value === current) return `"${value}" is already the local version.`;
      const exists = checkNpmVersion(value);
      if (exists) return `v${value} is already published on npm.`;
    },
  });
  handleCancel(versionResult);
  const newVersion = versionResult as string;
  const tagName = `v${newVersion}`;

  // ── 4. Confirmation ────────────────────────────────────────────────────
  p.note(
    [
      `${color.dim("Package")}    ${color.cyan("@sdbank/ui")}`,
      `${color.dim("Version")}    ${color.yellow(current)} ${color.dim("→")} ${color.green(newVersion)}`,
      `${color.dim("Tag")}        ${color.green(tagName)}`,
      `${color.dim("Steps")}      test → types → lint → build → bump → commit → publish → tag`,
    ].join("\n"),
    "Summary"
  );

  const shouldProceed = await p.confirm({
    message: "Proceed with publish?",
  });
  handleCancel(shouldProceed);

  if (!shouldProceed) {
    p.cancel("Publish cancelled.");
    process.exit(0);
  }

  // ── 5. Run publish pipeline ────────────────────────────────────────────
  await p.tasks([
    {
      title: "Running tests",
      task: async () => {
        try {
          exec("bunx turbo run test --filter=@sdbank/ui");
          return "All tests passed";
        } catch(err) {
          const msg = err instanceof Error ? err.message : String(err);
          throw new Error(`Tests failed: ${msg}`);
        }
      },
    },
    {
      title: "Checking types",
      task: async () => {
        try {
          exec("bunx turbo run check-types --filter=@sdbank/ui");
          return "No type errors";
        } catch {
          throw new Error("Type errors found. Fix them before publishing.");
        }
      },
    },
    {
      title: "Linting",
      task: async () => {
        try {
          exec("bunx turbo run lint --filter=@sdbank/ui");
          return "No lint errors";
        } catch {
          throw new Error("Lint errors found. Fix them before publishing.");
        }
      },
    },
    {
      title: "Building @sdbank/ui",
      task: async () => {
        try {
          exec("bunx turbo run build --filter=@sdbank/ui");
          return "Build succeeded";
        } catch {
          throw new Error("Build failed. Aborting.");
        }
      },
    },
    {
      title: `Bumping version to ${newVersion}`,
      task: async () => {
        setVersion(newVersion);
        return `version → ${newVersion}`;
      },
    },
    {
      title: "Creating git commit",
      task: async () => {
        const commitMsg = `chore: release @sdbank/ui v${newVersion}`;
        exec("git add packages/ui/package.json package.json");
        exec(`git commit -m "${commitMsg}"`);
        return commitMsg;
      },
    },
    {
      title: "Publishing to npm",
      task: async () => {
        try {
          execSync("npm publish --access public", {
            cwd: join(ROOT_DIR, "packages/ui"),
            stdio: "inherit",
          });
          return "Published successfully";
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          throw new Error(`Publish failed: ${msg}`);
        }
      },
    },
    {
      title: `Creating git tag ${tagName}`,
      task: async () => {
        exec(`git tag ${tagName}`);
        return `Tagged ${tagName}`;
      },
    },
    {
      title: "Pushing commit and tag",
      task: async () => {
        try {
          exec("git push");
          exec(`git push origin ${tagName}`);
          return "Pushed to remote";
        } catch {
          return "Skipped: no remote or push failed (run manually)";
        }
      },
    },
  ]);

  // ── Done ───────────────────────────────────────────────────────────────
  p.note(
    [
      `${color.dim("npm")}  ${color.dim("https://www.npmjs.com/package/@sdbank/ui/v/")}${newVersion}`,
      `${color.dim("tag")}  ${color.green(tagName)}`,
    ].join("\n"),
    `${color.green("✓")} @sdbank/ui@${newVersion} published!`
  );

  p.outro(color.green("All done!"));
}

main().catch((err) => {
  p.cancel(err instanceof Error ? err.message : String(err));
  process.exit(1);
});
