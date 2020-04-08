const port = 8080
// dev port
// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/',
  outputDir: 'apimonitor',
  assetsDir: 'assets',
  lintOnSave: true,
  filenameHashing: false,
  devServer: {
    port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // 配置代理
    proxy: {
      '/api': {
        // 接口服务地址
        target: 'http://10.20.3.181:5555',
        // 是否跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
