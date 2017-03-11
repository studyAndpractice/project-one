var path = require('path');

/**
 * 便捷求取路径原型函数
 * @param  {String} target
 * @return {String} path to target
 */
String.prototype.join = function (target) {
  return path.join(this.toString(), target);
};

var ROOT_PATH =  path.resolve(__dirname,'..');

var config = {
	ROOT_PATH:ROOT_PATH,
	DIST_PATH:ROOT_PATH.join('dist'),
	SRC_PATH: ROOT_PATH.join('src'),
	TEM_PATH:ROOT_PATH.join('templates')
}
module.exports = config;