const themeReco = require('./themeReco.js')

const sidebar = require('../sidebar/')
const nav = require('../nav')

// <link rel="shortcut icon " type="images/x-icon" href="./favicon.ico">
module.exports = Object.assign({}, themeReco, {
  sidebar,
  nav,
  // locales
  themeColor: {
    darkmode: 'switch',
  } 
});
