const { execSync } = require('child_process');

const args = process.argv.slice(2).join(' ');
const targetFlag = args || '--win';

console.log(`[DrodCode Package Script] Packaging Electron app (${targetFlag})...`);
try {
  execSync('node scripts/build.js', { stdio: 'inherit' });
  execSync(`npx electron-builder ${targetFlag}`, { stdio: 'inherit' });
  console.log('[DrodCode Package Script] Packaging complete! Installers saved to /release');
} catch (err) {
  console.error('[DrodCode Package Script] Packaging failed:', err.message);
  process.exit(1);
}
