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
    './build/specs/smoke/smoke.large.spec.js',
  ],
}, { clone: false });
