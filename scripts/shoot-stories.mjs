// Storybook の story を1枚ずつ PNG に撮って screenshots/ に置く。
// 部品の見た目を直したら、送る前に `npm run shoot` で撮り直し、PNG も同じコミットに入れる。
// レビューでは PNG の変更前・変更後を比べて、どの状態の見た目が変わったかを確かめる。
//
// 撮り直しのたびに関係ない差が出ないよう、画面の幅・倍率・アニメーションを固定している。
// ファイル名は story の ID（例: components-breadcard--sold-out.png）。消えた story の PNG は消す。

import { chromium } from 'playwright-core';
import { execFileSync } from 'node:child_process';
import { createServer } from 'node:http';
import { readFile, readdir, mkdir, unlink } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const staticDir = join(root, 'storybook-static');
const outDir = join(root, 'screenshots');

console.log('Storybook を書き出しています…');
execFileSync('npx', ['storybook', 'build', '--quiet', '--output-dir', staticDir], { cwd: root, stdio: 'inherit' });

// 書き出した Storybook を配る小さなサーバー
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
const server = createServer(async (req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^\/+/, '');
  try {
    const body = await readFile(join(staticDir, path || 'index.html'));
    res.writeHead(200, { 'content-type': types[extname(path)] ?? 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((ok) => server.listen(0, '127.0.0.1', ok));
const base = `http://127.0.0.1:${server.address().port}`;

const index = JSON.parse(await readFile(join(staticDir, 'index.json'), 'utf8'));
const stories = Object.values(index.entries).filter((e) => e.type === 'story');

await mkdir(outDir, { recursive: true });
// GPU・文字のなめらかさ・色の扱いで、同じ画面でも数画素ずれることがあるので固定する
const browser = await chromium.launch({
  args: ['--disable-gpu', '--force-color-profile=srgb', '--disable-lcd-text', '--font-render-hinting=none', '--disable-skia-runtime-opts'],
});
const page = await browser.newPage({ viewport: { width: 1024, height: 768 }, deviceScaleFactor: 2, reducedMotion: 'reduce' });

const written = new Set();
for (const story of stories) {
  await page.goto(`${base}/iframe.html?id=${story.id}&viewMode=story`);
  await page.waitForSelector('#storybook-root > *');
  await page.addStyleTag({
    content: `*, *::before, *::after { animation: none !important; transition: none !important; caret-color: transparent !important; }
      body.sb-main-padded { padding: 0 !important; }
      #storybook-root { display: inline-block; padding: 16px; }`,
  });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map((img) => img.complete || new Promise((ok) => { img.onload = img.onerror = ok; })));
  });
  // 中身の大きさ（と周りの 16px）で切り抜く
  const file = `${story.id}.png`;
  await page.locator('#storybook-root').screenshot({ path: join(outDir, file) });
  written.add(file);
  console.log(`  ${file}  (${story.title} / ${story.name})`);
}

for (const f of await readdir(outDir)) {
  if (f.endsWith('.png') && !written.has(f)) {
    await unlink(join(outDir, f));
    console.log(`  消した: ${f}（story が無くなった）`);
  }
}

await browser.close();
server.close();
console.log(`${written.size} 枚を screenshots/ に撮りました。`);
