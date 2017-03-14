var path = require('path'),
    webpack = require('webpack'),
    SpritesmithPlugin = require('webpack-spritesmith'),
    config  = require('./webpack.base.config');

var setHtmlPages = config.method.setHtmlPages,
    getEntry = config.method.getEntry;
/*output*/
config.devtool = 'eval-source-map'; // source-map
config.output.publicPath = '/views/';
/*plugins*/

config.plugins = (config.plugins || []).concat([
    // auto open browser
    new SpritesmithPlugin({
      src:{
        cwd: path.resolve(__dirname,'src/assets/img/icons/'),
        glob:'*.png'
      },
      target:{
        image: path.resolve(__dirname,'src/assets/img/_icons.png'),
        css:path.resolve(__dirname,'src/assets/sass/_icons.scss')
      },
      apiOptions:{
        cssImageRef:"~img/_icons.png"
      }
    })
  ]);
setHtmlPages(config);
module.exports = config;