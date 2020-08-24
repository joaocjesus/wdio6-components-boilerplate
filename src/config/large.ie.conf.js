const merge = require('deepmerge');
const wdioConf = require( './wdio.conf.js');

wdioConf.config.capabilities = [{
  browserName: 'internet explorer',
  "se:ieOptions": {
    "acceptUntrustedCertificates": true,
    "ignoreProtectedModeSettings": true,
    "ignoreZoomSetting": true,
    "ie.ensureCleanSession": true,
  },
}];

exports.config = merge(wdioConf.config, {
  specs: [
    './build/specs/*large*/*.spec.js',
    './build/specs/common/*.spec.js'
  ],
}, { clone: false });
