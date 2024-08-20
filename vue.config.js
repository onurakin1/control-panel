const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  devServer: {
    client: {
      overlay: {
        warnings: false,
        errors: false,
      },
      // or
      overlay: false,
    }
  },
  transpileDependencies: true,
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        args[0].title = 'Dinelim Dashboard'; 
        return args;
      });
  }
})
