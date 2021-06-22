module.exports = {
  lintOnSave:false, // 干掉eslint语法检查
  devServer: {
    proxy: {
      '/api': {
        target: 'http://39.98.123.211/', // 目标地址
        changeOrigin: true // 是否跨域
      }
    }
  }
}