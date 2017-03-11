var path = require('path'),
    webpack = require('webpack'),
    glob = require('glob'),
    PATHS = require('./build/PATHS'),
    VENDOR = require('./build/VENDOR'),
    PORTS = require('./build/PORTS');
  var HtmlwebpackPlugin = require('html-webpack-plugin');
var filterFolder = 'views';
//按文件名来获取入口文件(即需要生成的模板文件数量)
// function getEntry(globPath) {
//     var files = glob.sync(globPath);
//     var entries = {},
//         entry, dirname, basename, pathname, extname;
// console.log(files)
//     for (var [i,value] of files.entries()) {
//         entry = value;
//         dirname = path.dirname(entry);
//         extname = path.extname(entry);
//         basename = path.basename(entry, extname);
//         pathname = path.join(dirname, basename);
//         entries[pathname] = './' + entry;
//     }
//     console.log(entries)
//     return entries;
// }
function getEntry(globPath) {
  var entries = {},
    startIndex = 1, deletNum = 1,
    basename, tmp, entryArr, pathname;
  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));
    entryArr = entry.split('/');
    tmp = entryArr.splice(2-entryArr.length);
    if(tmp[1] == filterFolder){//root-index
      pathname = basename;
    }else{//normal files
        deletNum = tmp.length - 2;
        pathname = tmp.splice(startIndex, deletNum).join('/') + '/' + basename; // 正确输出 js 和 html 的路径    
    }
    entries[pathname] = entry;
  });
  return entries;
}

function generateHtml(config, htmlPath){
    var pages = getEntry('./src/templates/**/*.html');
    var filepath = htmlPath ? htmlPath : '';
    for (var pathname in pages) {
        // 配置生成的 html 文件，定义路径等
        var conf = {
            filename: filepath + pathname + '.html', // html 文件输出路径
            template: pages[pathname], // 模板路径
            inject: true, // js 插入位置
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        };
        if (pathname in config.entry) {
            conf.chunks = ['vendors', pathname];
            conf.hash = true;
        }
        // 需要生成几个 html 文件，就配置几个 HtmlWebpackPlugin 对象
        config.plugins.push(new HtmlwebpackPlugin(conf));
    }
}
var config = {
  entry: {
    vendors: [] //'jquery', 'moment'
  },
  output:{
      path: PATHS.DIST_PATH,
      filename:'js/[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  //启动dev source map，出错以后就会采用source-map的形式直接显示你出错代码的位置。
  //babel重要的loader在这里
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: PATHS.SRC_PATH,
        query: {
          //添加两个presents 使用这两种presets处理js或者jsx文件
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
    //只要配置dev server map这个参数就可以了
    // proxy:{
    //   '/api/*':{
    //     target: 'http://localhost:8080',
    //     secure: false
    //   }
    // }
  },
  //配置jshint的选项，支持es6的校验
   // any jshint option http://www.jshint.com/docs/options/
   jshint: {
     // "esnext": true
   },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new HtmlwebpackPlugin({
      // title: 'My first react app',
      // template: path.resolve(TEM_PATH, 'index.html'),
      // filename: 'index.html',
      // chunks: ['app', 'vendors'],
      // inject: 'body'
    }),
    // //把入口文件里面的数组打包成verdors.js
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ],
  methods:{
  	getEntry:getEntry,
    generateHtml: generateHtml
  }
}

//多入口文件
var entries = getEntry('./src/views/**/*.jsx');
Object.assign(config.entry,entries);
module.exports= config;