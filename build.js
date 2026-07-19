const { execSync } = require('child_process');
const path = require('path');
const nextDir = path.join(__dirname, 'node_modules', 'next');
const nextBin = path.join(nextDir, 'dist', 'bin', 'next');
process.env.NODE_ENV = 'production';
console.log('Running next build...');
try {
  execSync(`node "${nextBin}" build`, { cwd: __dirname, stdio: 'inherit' });
} catch (e) {
  console.error('Build failed:', e.message);
  process.exit(1);
}