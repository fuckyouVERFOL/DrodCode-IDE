const { execSync } = require('child_process');

console.log('[DrodCode Build Script] Building Webpack bundles...');
try {
  execSync('npx webpack --config webpack.config.js --mode production', { stdio: 'inherit' });
  console.log('[DrodCode Build Script] Build succeeded!');
} catch (err) {
  console.error('[DrodCode Build Script] Build failed:', err.message);
  process.exit(1);
}
