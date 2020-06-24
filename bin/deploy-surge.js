const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

module.exports = (api, opts) => {
  api.registerCommand('deploy-surge', {
    description: `deploy the [${opts.outputDir}] to surge.sh[${process.env.SURGE_DOMAIN}].`,
    usage: 'vue-cli-service inspect [options] [...paths]',
  }, () => {
    // prepare work dir and add CORS
    const distDir = path.resolve(opts.outputDir);
    fs.writeFileSync(`${distDir}/CORS`, '*');

    const ext = process.platform === 'win32' ? '.cmd' : '';
    const surge = path.resolve(path.dirname(require.resolve('surge')), `../../.bin/surge${ext}`);

    const domain = process.env.SURGE_DOMAIN || 'smart-shuili.surge.sh';
    spawn(surge, [distDir, domain], { stdio: 'inherit' });
  });
};

module.exports.defaultModes = {
  'deploy-surge': 'production',
};
