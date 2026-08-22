import { readdir } from "node:fs/promises";
import { resolve, relative } from "node:path";

const pagesDirectory = resolve("src/pages");
const projectDirectory = resolve(".");
const ignoredDirectories = new Set([
  ".astro",
  ".git",
  ".wrangler",
  "dist",
  "local-conflicts",
  "node_modules",
]);
const routes = new Map();
const failures = [];

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      if (ignoredDirectories.has(entry.name)) continue;
      await walk(filename);
      continue;
    }
    const pathname = relative(projectDirectory, filename);
    if (
      /\s/.test(entry.name) ||
      /(?:conflicted copy|conflict|copy \d*|\.bak|~)$/i.test(entry.name)
    ) {
      failures.push(`Unsafe source filename: ${pathname}`);
    }
    if (!filename.startsWith(`${pagesDirectory}/`)) continue;
    if (!entry.name.endsWith(".astro")) continue;
    const pagePathname = relative(pagesDirectory, filename);
    const route =
      `/${pagePathname
        .replace(/\\/g, "/")
        .replace(/(?:^|\/)index\.astro$/, "")
        .replace(/\.astro$/, "")}`.replace(/\/$/, "") || "/";
    const key = route.toLowerCase();
    if (routes.has(key))
      failures.push(
        `Conflicting page routes: ${routes.get(key)} and ${pagePathname}`,
      );
    routes.set(key, pagePathname);
  }
}

await walk(projectDirectory);

if (failures.length) {
  console.error(
    `Source hygiene validation failed:\n- ${failures.join("\n- ")}`,
  );
  process.exit(1);
}

console.log("Source hygiene validation passed.");
