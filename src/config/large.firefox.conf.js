const merge = require('deepmerge');
const wdioConf = require('./wdio.conf.js');

wdioConf.config.capabilities = [{
  browserName: 'firefox',
  acceptInsecureCerts: true,
}];

exports.config = merge(wdioConf.config, {
  specs: [
    './build/specs/*large*/*.spec.js',
    './build/specs/common/*.spec.js',
  ],
}, { clone: false });
