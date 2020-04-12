const resolve = require('vuepress-theme-hope/resolve')
const themeConfig = require('./configs/theme/')

module.exports = resolve({
  base: '/code/',
  title: 'code',
  description: 'code',
  head: [
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,user-scalable=no'
      }
    ],
    [
      'link',
      {
        rel: 'shortcut icon ',
        type: 'images/x-icon',
        href: '/logo/favicon.ico'
      }
    ],
    [
      'link',
      {
        rel: 'manifest',
        href: '/manifest.json'
      }
    ]
  ],
  markdown: {
    lineNumbers: true // 展示行号
  },
  // theme: 'reco',
  themeConfig,
  configureWebpack: {
    resolve: {
      alias: {
        '@img': './images'
      }
    }
  },
});
