<<<<<<< HEAD
const port = 5001
// dev port
// All configuration item explanations can be find in https://cli.vuejs.org/config/
=======
>>>>>>> master
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
<<<<<<< HEAD
    proxy: {
      '/api': {
        // 接口服务地址
        target: 'http://192.168.70.72:5000',
        // 是否跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
=======
    // proxy: {
    //   '/api': {
    //     // 接口服务地址
    //     target: 'http://localhost:5000',
    //     // 是否跨域
    //     changeOrigin: true,
    //     ws: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
>>>>>>> master
  }
}
