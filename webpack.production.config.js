var devConfig = require('./webpack.config.js');

delete devConfig.devtool;

module.exports = devConfig;
