const merge = require('deepmerge');
const wdioConf = require( './wdio.conf.js');

wdioConf.config.capabilities = [{
  browserName: 'chrome',
  'goog:chromeOptions': {
    args: [
      'disable-infobars',
      '--window-size=1024,800',
    ]
  }
}];

exports.config = merge(wdioConf.config, {
  specs: [
    './build/specs/*medium*/*.spec.js',
    './build/specs/common/*.spec.js'],
}, { clone: false });

