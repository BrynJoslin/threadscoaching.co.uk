import { readdir, stat } from 'node:fs/promises';
import { resolve, relative } from 'node:path';

const dist = resolve('dist');
const limits = {
  totalBytes: 2_500_000,
  largestAssetBytes: 400_000,
  htmlBytes: 150_000,
};
const files = [];

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = resolve(directory, entry.name);
    if (entry.isDirectory()) await walk(filename);
    else files.push({ filename, size: (await stat(filename)).size });
  }
}

await walk(dist);
const failures = [];
const totalBytes = files.reduce((total, file) => total + file.size, 0);
if (totalBytes > limits.totalBytes) failures.push(`Output is ${(totalBytes / 1_000_000).toFixed(2)} MB; limit is ${limits.totalBytes / 1_000_000} MB`);

for (const file of files) {
  const pathname = relative(dist, file.filename);
  if (pathname.endsWith('.html') && file.size > limits.htmlBytes) failures.push(`${pathname} exceeds the HTML budget`);
  if (!pathname.endsWith('.html') && file.size > limits.largestAssetBytes) failures.push(`${pathname} exceeds the single-asset budget`);
}

if (failures.length) {
  console.error(`Output budget validation failed:\n- ${failures.join('\n- ')}`);
  process.exit(1);
}

console.log(`Output budget validation passed (${(totalBytes / 1_000_000).toFixed(2)} MB).`);
