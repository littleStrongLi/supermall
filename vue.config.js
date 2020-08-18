module.exports = {
  configureWebpack: {
    resolve: {
      //配置别名
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  },

  lintOnSave: false,
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
  }
}