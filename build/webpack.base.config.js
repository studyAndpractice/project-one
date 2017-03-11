var path = require('path'),
  	webpack = require('webpack'),
  	glob = require('glob'),
  	PATHS = require('./PATHS'),
  	VENDOR = require('./VENDOR'),
	PORTS = require('./PORTS');

//按文件名来获取入口文件(即需要生成的模板文件数量)
function getEntry(globPath) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;

    for (var [i,value] in files.entries()) {
        entry = value;
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        entries[pathname] = './' + entry;
    }
    console.log(entries)
    return entries;
}

function getHtmlPage(){
	var pages = getEntry('./../views/**/*.jsx');
	console.log(pages);

	// for()
}
var config = {
  entry: {
  	index:'./../src/index.jsx'
    vendors: [] //'jquery', 'moment'
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
  //配置jshint的选项，支持es6的校验
   // any jshint option http://www.jshint.com/docs/options/
   jshint: {
     // "esnext": true
   },
  plugins: [
    
  ],
  methods:{
  	// getEntry:getEntry
  }
}

//多入口文件
// var entries = getEntry('./../src/views/**/*.jsx');
// var entries = {
// 	index:'./../src/index.jsx'
// }
// console.log(config.entry)
// Object.assign(config.entry,entries);
module.exports= config;