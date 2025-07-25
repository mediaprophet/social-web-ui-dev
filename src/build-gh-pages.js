const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

// Paths
const srcPieces = path.join(__dirname, 'pieces');
const docsDir = path.join(__dirname, '..', 'docs');
const assetsSrc = path.join(__dirname, 'assets');
const assetsDest = path.join(docsDir, 'assets');

// 1. Build Tailwind CSS
const { execSync } = require('child_process');
console.log('Building Tailwind CSS...');
execSync('npx tailwindcss -i ./src/tailwind.css -o ../docs/style.css --minify', { stdio: 'inherit' });

// 2. Copy HTML files and update CSS link
console.log('Copying HTML files...');
glob.sync('**/*.html', { cwd: srcPieces }).forEach(file => {
  const srcFile = path.join(srcPieces, file);
  const destFile = path.join(docsDir, file);
  let html = fs.readFileSync(srcFile, 'utf8');
  // Replace CSS link
  html = html.replace(/<link rel="stylesheet" href="[^"]*style\.css"/g, '<link rel="stylesheet" href="style.css"');
  fs.ensureDirSync(path.dirname(destFile));
  fs.writeFileSync(destFile, html);
});

// 3. Copy assets
console.log('Copying assets...');
fs.copySync(assetsSrc, assetsDest, { overwrite: true });

console.log('Build complete. Deploy /docs to GitHub Pages.', docsDir);
