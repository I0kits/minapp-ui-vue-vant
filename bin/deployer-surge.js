const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// prepare work dir and add CORS
const distDir = path.resolve(process.env.DIST_DIR_PATH || './dist');
fs.writeFileSync(`${distDir}/CORS`, '*');

const ext = process.platform === 'win32' ? '.cmd' : '';
const surge = path.resolve(path.dirname(require.resolve('surge')), `../../.bin/surge${ext}`);

const domain = process.env.SURGE_DOMAIN || 'smart-shuili.surge.sh';

spawn(surge, [distDir, domain], { stdio: 'inherit' });
