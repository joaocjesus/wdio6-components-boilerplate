const merge = require('deepmerge');
const wdioConf = require('./wdio.conf.js');

wdioConf.config.capabilities = [{
  browserName: 'chrome',
  'goog:chromeOptions': {
    args: [
      'disable-infobars',
      '--window-size=1280,1024',
    ],
  },
}];

exports.config = merge(wdioConf.config, {
  specs: [
    './build/specs/*large*/*.spec.js',
    './build/specs/common/*.spec.js',
  ],
}, { clone: false });
