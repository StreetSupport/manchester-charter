/* global location */

var getUrlParameter = function (name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
  var results = regex.exec(location.search)
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

var getHashBang = () => {
  var regex = new RegExp('#!([^&#]*)')
  var results = regex.exec(location.hash)
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

var buildHashbang = (hashbang) => {
  return '#!' + hashbang
}

module.exports = {
  parameter: getUrlParameter,
  hashbang: getHashBang,
  buildHashbang: buildHashbang
}
