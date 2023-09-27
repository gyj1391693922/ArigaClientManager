const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080, // 将开发服务器端口号修改为9000
    proxy: {
      '/basics': {
        target: 'http://localhost:9090',
        pathRewrite: { '^/basics': '' },
        changeOrigin: true,
        onProxyRes: (proxyRes, req, res) => {
          proxyRes.headers['Access-Control-Allow-Origin'] = 'http://localhost:8080';
        }
      }
    }
  }
});