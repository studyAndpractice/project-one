//  basic config
var path = require('path'),
	webpack = require('webpack'),
	PATHS = require('./PATHS'),
	VENDOR = require('./VENDOR'),
	PORTS = require('./PORTS');

// plugins
// var HtmlwebpackPlugin = require('html-webpack-plugin'),
// 	BrowserSyncPlugin = require('browser-sync-webpack-plugin');

console.log(PATHS.SRC_PATH.join('/views/index.jsx'))

// var config = {
// 	// 入口
// 	entry: {
// 		index: PATHS.SRC_PATH.join('/views/index.jsx'),
// 		vendors: VENDOR
// 	},
// 	output: {
// 		path: PATHS.DIST_PATH,
// 		publicPath: "",
// 		filename: "[name].js",
// 	},
// 	resolve: {
// 		extensions: ['', '.js', '.jsx', '.scss']
// 	},
// 	//启动dev source map，出错以后就
// 	//会采用source-map的形式直接显示你出错代码的位置
// 	// devtool: 'eval-source-map',
// 	// enable dev server
// 	devServer: {
// 		historyApiFallback: true, // sigle page all fresh operation set index.html
// 		hot: true, // suport hot-loader
// 		inline: true, // 代码有变化，浏览器端刷新
// 		progress: true,
// 		// 配置代理
// 		// proxy: {
// 		// 	content: ['/api/*'],
// 		// 	target: 'http://localhost:8080',
// 		// 	secure: true
// 		// }
// 	},
// 	// babel loader here
// 	module: {
// 		loaders: [{
// 			test: /\.jsx?$/,
// 			loader: 'babel',
// 			include: PATHS.SRC_PATH,
// 			query: {
// 				//添加两个presents 使用这两种presets处理js或者jsx文件
// 				presets: ['es2015', 'react']
// 			},
// 			exclude:/node_modules/
// 		}, {
// 			test: /\.(gif|jpg|png)\??.*$/,
// 			loader: 'url-loader?limit=3072&name=img/[name].[ext]'
// 		}, {
// 			test: /\.(woff|svg|eot|ttf)\??.*$/,
// 			loader: 'url-loader?limit=3072&name=fonts/[name].[ext]'
// 		}, {
// 			test: /\.(html|tpl)$/,
// 			loader: 'html-loader?minimize=false'
// 		}, {
// 			test: /\.scss$/,
// 			loaders: ['style', 'css', 'sass']
// 		}]
// 	},
// 	// jshint
// 	jshint:{
// 		// 'esnext':true
// 	},
// 	plugins:[
// 		//这个使用uglifyJs压缩你的js代码
// 	    // new webpack.optimize.UglifyJsPlugin({minimize: true}),
// 	    // new HtmlwebpackPlugin({
// 	    //   title: 'My first react app',
// 	    //   template: PATHS.TEM_PATH.join('index.html'),
// 	    //   filename: 'index.html',
// 	    //   chunks: ['index', 'vendors'],
// 	    //   inject: 'body'
// 	    // }),
// 	    // new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
// 	    // new BrowserSyncPlugin({
// 	    //     host: '127.0.0.1',
// 	    //     port: PORTS.BROWSER_SYNC,
// 	    //     proxy: 'http://127.0.0.1:' + PORTS.DEV_SERVER,
// 	    //     notify: false,
// 	    //     startPath: '/views/'
//     	// })
// 	]
// }
var config = {}
console.log(config.entry.index)
module.exports = config;