const { execSync } = require('child_process');

console.log('[DrodCode Release Script] Preparing GitHub Release artifacts...');
try {
  execSync('node scripts/package.js', { stdio: 'inherit' });
  console.log('[DrodCode Release Script] Release artifacts built ready for publishing!');
} catch (err) {
  console.error('[DrodCode Release Script] Release failed:', err.message);
  process.exit(1);
}
