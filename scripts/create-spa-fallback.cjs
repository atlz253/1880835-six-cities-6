const fs = require('node:fs');
const path = require('node:path');

const distPath = path.resolve(__dirname, '..', 'dist');
const indexPath = path.join(distPath, 'index.html');
const fallbackPath = path.join(distPath, '404.html');

if (!fs.existsSync(indexPath)) {
  throw new Error('Cannot create SPA fallback: dist/index.html does not exist.');
}

fs.copyFileSync(indexPath, fallbackPath);
