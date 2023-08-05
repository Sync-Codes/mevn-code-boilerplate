module.exports = {
  devServer: {
    proxy: {
      '/todos': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
}
