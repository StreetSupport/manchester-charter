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

var getInputField = function (fieldName) {
  // checkboxes should return boolean
  return document
    .querySelector('[name=${fieldName}')
    .value
}

var showError = function (fieldName, message) {
  let insertAfter = (referenceNode, newNode) => {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
  }

  let refNode = document.querySelector('[name=${fieldName}')
  let errorNode = document.createElement('span')
  errorNode.innerHTML = message
  errorNode.className = 'input-error'
  insertAfter(refNode, errorNode)
}

var trackEvent = function (src, action, description) {
  ga('send', 'event', src, action, description)
}

module.exports = {
  redirect: redirect,
  loading: loading,
  loaded: loaded,
  trackEvent: trackEvent,
  getInputField: getInputField,
  showError: showError
}
