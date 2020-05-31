const themeReco = require('./themeReco.js')

const sidebar = require('../sidebar/')
const nav = require('../nav')

// <link rel="shortcut icon " type="images/x-icon" href="./favicon.ico">
module.exports = Object.assign({}, themeReco, {
  sidebar,
  nav,
  // locales
  themeColor: {
    blue: "#2196f3",
    red: "#f26d6d",
    green: "#3eaf7c",
    orange: "#fb9b5f",
  },
  pwa: '发现新内容可用',
});
