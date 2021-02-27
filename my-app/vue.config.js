module.exports = {

  configureWebpack: {
    devServer: {
      historyApiFallback: true,
      proxy: {
        '^/characters': {
          target: 'http://localhost:3000',
          changeOrigin: true
        },
      }      
    }
  }

};
