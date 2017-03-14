var path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
   config  = require('./webpack.base.config');

var setHtmlPages = config.method.setHtmlPages,
    getEntry = config.method.getEntry;
/*output*/
config.devtool = 'eval-source-map'; // source-map
config.output.publicPath = '/views/';
/*plugins*/

config.plugins = (config.plugins || []).concat([
    // auto open browser
    new BrowserSyncPlugin({
      host:"127.0.0.1",
      port:8080,
      proxy: 'http://127.0.0.1:' + 8080,
      startPath:'/views/'
    },{
      reload:false
    })
  ]);
setHtmlPages(config);
module.exports = config;