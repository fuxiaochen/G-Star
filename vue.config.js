module.exports = {   
devServer: {
    proxy: {
      // GitHub认证跨域 代理这个请求地址
      '/githubAuthorize': {
        target: 'https://github.com/login/oauth/authorize',
        changeOrigin: true,
        pathRewrite: {
          '^/githubAuthorize': ''
        }
      },
      // GitHub请求token的请求
      '/githubAccessToken': {
        target: 'https://github.com/login/oauth/access_token',
        changeOrigin: true,
        pathRewrite: {
          '^/githubAccessToken': ''
        }
      },
        // GitHub请求token的请求
        '/githubUserInfo': {
          target: 'https://api.github.com/user',
          changeOrigin: true,
          pathRewrite: {
            '^/githubUserInfo': ''
          }
        }
    }
  },
}