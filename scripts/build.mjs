import { mkdir, copyFile, writeFile, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
await mkdir('dist', { recursive: true });
const files = ['index.html', 'app.js', 'domain.js', 'styles.css'];
const hashes = {};
for (const name of files) {
  await copyFile(`src/${name}`, `dist/${name}`);
  hashes[name] = createHash('sha256').update(await readFile(`dist/${name}`)).digest('hex');
}
await writeFile('dist/version.json', JSON.stringify({ version: '1.0.0', commit: process.env.GITHUB_SHA || 'local', builtAt: new Date().toISOString(), hashes }, null, 2));
console.log('Construcción lista: dist/ con manifiesto SHA-256.');
