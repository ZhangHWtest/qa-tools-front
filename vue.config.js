module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: '',
  indexPath: 'index.html',
  productionSourceMap: true,
  lintOnSave: true,
  filenameHashing: false,
  devServer: {
    port: 5001,
    open: true,
    https: false,
    hotOnly: false,
    overlay: {
      warnings: false,
      errors: true
    },
    // 配置代理
    proxy: {
      '/api': {
        // 接口服务地址
        target: 'http://10.20.44.237:5555',
        // 是否跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/': ''
        }
      }
    }
  }
}
