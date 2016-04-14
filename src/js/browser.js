var Spinner = require('spin.js')

var redirect = function (url) {
  window.location = url
}

var dataLoaded = function () {
  var dynamicElements = document.getElementsByClassName('awaiting-data')
  Array.from(dynamicElements).forEach(element => {
    element.className = element.className.replace(/(?:^|\s)awaiting-data(?!\S)/g, '')
  })
}

var loaderAnim
var getLoader = function () {
  if (loaderAnim === undefined) {
    loaderAnim = new Spinner()
  }
  return loaderAnim
}

var loading = function () {
  getLoader().spin(document.getElementById('spin'))
}

var loaded = function () {
  getLoader().stop()
}

var trackEvent = function (src, action, description) {
  ga('send', 'event', src, action, description)
}

module.exports = {
  redirect: redirect,
  loading: loading,
  loaded: loaded,
  trackEvent: trackEvent,
  dataLoaded: dataLoaded // deprecated
}
