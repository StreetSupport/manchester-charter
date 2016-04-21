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

var scrollTo = function (selector) {
  let findPos = (obj) => {
    var curtop = 0
    if (obj.offsetParent) {
      do {
        curtop += obj.offsetTop
      } while (obj === obj.offsetParent)
      return [curtop]
    }
  }
  window.scroll(0, findPos(document.querySelector(selector)))
}

var trackEvent = function (src, action, description) {
  ga('send', 'event', src, action, description)
}

var print = function () {
  window.print()
}

var injectHiddenIFrame = function (precedingElementSelector, pageUrl) {
  var precedingElement = document.querySelector(precedingElementSelector)
  var iFrame = document.createElement('iFrame')
  iFrame.setAttribute('style', 'display: none')
  iFrame.setAttribute('src', pageUrl)
  precedingElement.appendChild(iFrame)
}

module.exports = {
  redirect: redirect,
  loading: loading,
  loaded: loaded,
  trackEvent: trackEvent,
  scrollTo: scrollTo,
  print: print,
  injectHiddenIFrame: injectHiddenIFrame
}
