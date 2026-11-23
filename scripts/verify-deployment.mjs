import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
const base = process.env.BASE_URL;
assert.ok(base && process.env.GITHUB_SHA, 'Se requieren BASE_URL y GITHUB_SHA.');
let lastError, verified = false;
for (let attempt = 0; attempt < 12; attempt++) {
  try {
    const response = await fetch(new URL(`version.json?sha=${process.env.GITHUB_SHA}&try=${attempt}`, base), { signal: AbortSignal.timeout(15000) });
    assert.ok(response.ok, `HTTP ${response.status}`);
    const manifest = await response.json(); assert.equal(manifest.commit, process.env.GITHUB_SHA);
    assert.deepEqual(Object.keys(manifest.hashes).sort(), ['app.js', 'domain.js', 'index.html', 'styles.css']);
    for (const [file, expected] of Object.entries(manifest.hashes)) {
      assert.ok(['index.html', 'app.js', 'domain.js', 'styles.css'].includes(file));
      const asset = await fetch(new URL(`${file}?sha=${process.env.GITHUB_SHA}`, base), { signal: AbortSignal.timeout(15000) });
      assert.ok(asset.ok); assert.equal(createHash('sha256').update(Buffer.from(await asset.arrayBuffer())).digest('hex'), expected);
    }
    console.log(`Despliegue e integridad verificados: ${base} (${manifest.commit})`); verified = true; break;
  } catch (error) { lastError = error; console.log(`Intento ${attempt + 1}: esperando propagación de Pages.`); await new Promise(r => setTimeout(r, 5000)); }
}
if (!verified) throw lastError;
