const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
	publicPath: isProduction ? '/weixin-model/' : '/',
	outputDir:'weixin',
	configureWebpack: (config) => {
		config.resolve.alias = {'@':resolve('src')}
	},
	productionSourceMap: false	
}