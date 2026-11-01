import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { assetUrl, assetSrcSet, safeWebUrl } from '../src/lib/assets.js';

const json = (name) => JSON.parse(readFileSync(new URL('../src/data/' + name + '.json', import.meta.url), 'utf8'));

test('every image and responsive variant is included in the export', () => {
  const records = [...Object.values(json('images')), ...json('designs')];
  assert.equal(records.length, 25);
  for (const image of records) {
    const paths = [image.file, image.preview, image.original, ...image.srcset.split(',').map((entry) => entry.trim().split(' ')[0])].filter(Boolean);
    for (const path of paths) assert.ok(existsSync(new URL('../public/' + path, import.meta.url)), 'Missing image: ' + path);
    assert.ok(image.width > 0 && image.height > 0);
  }
});

test('asset URLs work at both root and GitHub project subpaths', () => {
  for (const base of ['./', '/', '/my-portfolio/']) {
    const page = new URL(base === '/my-portfolio/' ? 'https://example.github.io/my-portfolio/' : 'https://example.github.io/');
    const file = assetUrl('assets/image.webp', base);
    assert.equal(new URL(file, page).pathname, (base === '/my-portfolio/' ? '/my-portfolio/' : '/') + 'assets/image.webp');
  }
  assert.equal(assetSrcSet('assets/a.webp 480w, assets/b.webp 960w', '/portfolio/'), '/portfolio/assets/a.webp 480w, /portfolio/assets/b.webp 960w');
});

test('optional profile links reject executable and non-web schemes', () => {
  assert.equal(safeWebUrl('javascript:alert(1)'), null);
  assert.equal(safeWebUrl('data:text/html,test'), null);
  assert.equal(safeWebUrl('https://github.com/example'), 'https://github.com/example');
});
