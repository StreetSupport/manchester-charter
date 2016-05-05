/*
  global ga
*/

var Spinner = require('spin.js')

var redirect = function (url) {
  window.location = url
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

var jumpTo = function (id) {
  var self = this
  self.id = id
  let gotoElement = () => {
    window.location.href = self.id
  }
  setTimeout(gotoElement, 250)
}

var scrollTo = function (selector) {
  let findPos = (obj) => {
    var curtop = 0
    if (obj.offsetParent) {
      console.log('offsetParent')
      console.log(obj.offsetParent)
      do {
        curtop += obj.offsetTop
        console.log('curtop: ' + curtop)
      } while (obj === obj.offsetParent)
      return [curtop]
    }
  }
  let element = document.querySelector(selector)
  window.scroll(0, findPos(element))
}

var trackEvent = function (src, action, description) {
  ga('send', 'event', src, action, description)
}

var print = function () {
  window.print()
}

module.exports = {
  redirect: redirect,
  loading: loading,
  loaded: loaded,
  trackEvent: trackEvent,
  scrollTo: scrollTo,
  jumpTo: jumpTo,
  print: print
}
