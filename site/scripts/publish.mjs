// Copy the Vite build to the repo root, which is what GitHub Pages serves.
import { cp, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, '../..');
const dist = resolve(here, '../dist');

await rm(resolve(repo, 'assets'), { recursive: true, force: true });
await cp(resolve(dist, 'assets'), resolve(repo, 'assets'), { recursive: true });
await cp(resolve(dist, 'index.html'), resolve(repo, 'index.html'));

try {
  await cp(resolve(dist, 'favicon.svg'), resolve(repo, 'favicon.svg'));
} catch {
  // favicon is optional
}

console.log('Published dist/ to the repo root for GitHub Pages.');
