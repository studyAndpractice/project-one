var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin'),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var path = require('path'),
    webpack = require('webpack'),
    glob = require('glob'),
    PATHS = require('./build/PATHS'),
    VENDOR = require('./build/VENDOR'),
    PORTS = require('./build/PORTS');
var config = require('./webpack.base.config');

config.plugins = (config.plugins || []).concat([
    new BrowserSyncPlugin({
        host: '127.0.0.1',
        port: 8080,
        proxy: 'http://127.0.0.1:' + PORTS.DEV_SERVER,
        notify: false,
        startPath: '/'
    }, {
        reload: false
    }),
])
//html files
config.methods.generateHtml(config);
module.exports = config

