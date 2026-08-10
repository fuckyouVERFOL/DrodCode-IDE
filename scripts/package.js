const { execSync } = require('child_process');

console.log('[DrodCode Package Script] Packaging Electron app into installers...');
try {
  execSync('node scripts/build.js', { stdio: 'inherit' });
  execSync('npx electron-builder --win --linux --mac', { stdio: 'inherit' });
  console.log('[DrodCode Package Script] Packaging complete! Installers saved to /release');
} catch (err) {
  console.error('[DrodCode Package Script] Packaging failed:', err.message);
  process.exit(1);
}
