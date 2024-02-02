const { createProxyMiddleware } = require('http-proxy-middleware')

function selectUrl(url, rem, loc) {
  if (!url) {
    return loc
  }

  return url.startsWith('http://') || url.startsWith('https://') ? url : rem
}

module.exports = async function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: selectUrl(
        !process.env.REACT_APP_SERVER
          ? 'https://crypto-pyramid.azurewebsites.net'
          : process.env.REACT_APP_SERVER
      ),
      changeOrigin: true,
    })
  )
}
