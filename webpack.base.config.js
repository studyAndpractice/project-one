var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin'),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin');
  
var node_dir = path.join(__dirname, './node_modules/');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var filterFolder = 'views';
// 获取所有入口文件
var getEntry = function(globPath) {
    var entries = {
        // vendor: ['jquery','react','react-dom'] // 类库
    };
    var basename,entryArr=[],pathname,tempArr=[],deletNum=1;
    glob.sync(globPath).forEach(function(entry) {
        basename = path.basename(entry,path.extname(entry));
        entryArr = entry.split('/');
        tempArr = entryArr.splice(2-entryArr.length);
        if(tempArr[1] == filterFolder){
            pathname = basename;
        } else {
            deletNum = tempArr.length - 2;
            pathname = tempArr.splice(1, deletNum).join('/') + '/' + basename; 
            // pathname = entry.split('/').splice(-2).join('/').split('.')[0]
        }
        entries[pathname] = [entry];
    });
    return entries;
};
var setHtmlPages = function(config,htmlPath){
    var entries = getEntry('./src/views/**/*.jsx'),
        chunks = Object.keys(entries),
        filePath = htmlPath ? htmlPath:"";
        for(var key of chunks){
            console.log(key)
            if(key === 'vendor'){
                // return ;
            }
            var conf = {
                title: 'This the first Demo',
                filename: filePath + key + '.html',
                template: './src/templates/index.html',
                inject: 'body',
                minify: {
                    removeComments: true,
                    collapseWhitespace: false
                }
            };
            if (key in config.entry) {
                conf.chunks = ['vendor', key];
                conf.hash = false;
            }
            baseCon.plugins.push(new HtmlWebpackPlugin(conf));
        }
}
// 
// 判断是否是在当前生产环境
var isProduction = process.env.NODE_ENV === 'production';
var entries = getEntry('./src/views/**/*.jsx');
var chunks = Object.keys(entries);
var baseCon = {
    entry: {
        vendor:['react','react-dom']
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'js/[name].js',
        // publicPath: '/dist/',
        chunkFilename: 'chunk/[name].chunk.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react']
            },
            exclude: node_dir
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css')
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style', 'css!less')
        }, {
            test: /\.(png|jpe?g|gif)$/,
            loader: 'url?limit=8192&name=img/[hash:8].[ext]'
        }, {
            //文件加载器，处理文件静态资源
            test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file?limit=10000&name=fonts/[hash:8].[ext]'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.json'],
        alias: {
            mod: node_dir
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery', // 使jquery变成全局变量,不用在自己文件require('jquery')了
            jQuery: 'jquery',
            React: 'react',
            ReactDOM: 'react-dom'
        }),
        // 类库统一打包生成一个文件
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: isProduction ? 'js/vendor.[hash:8].js':'js/vendor.js',
            minChunks: 3 // 提取使用3次以上的模块，打包到vendor里
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin(isProduction ? 'css/[name].[hash:8].css':'css/[name].css')
    ],
    method:{
        getEntry:getEntry,
        setHtmlPages:setHtmlPages
    }
};

//多入口文件
var entries = getEntry('./src/views/**/*.jsx');
Object.assign(baseCon.entry,entries);

module.exports = baseCon;
