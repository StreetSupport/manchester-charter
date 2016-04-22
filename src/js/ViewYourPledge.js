'use strict'

import ko from 'knockout'

var ajax = require('./ajax')
var api = require('./api-endpoints')
var browser = require('./browser')
var getUrlParam = require('./getUrlParam')

let ViewYourPledge = function () {
  var self = this

  self.init = () => {
    self.firstName = ko.observable()
    self.lastName = ko.observable()
    self.organisationText = ko.observable()
    self.pledge = ko.observable()
    self.creationDate = ko.observable()
    self.pledgeHasLoaded = ko.observable(false)

    browser.loading()
    let pledgeId = getUrlParam.parameter('id')
    let parseDate = (dateString) => {
      var [date] = dateString.split('T')
      return date
        .split('-')
        .reverse()
        .join('/')
    }
    ajax
      .get(api.pledges + '/' + pledgeId)
      .then((result) => {
        if (result.statusCode === 200) {
          self.firstName(result.data.firstName)
          self.lastName(result.data.lastName)
          if (result.data.organisation !== null) {
            self.organisationText(' of ' + result.data.organisation)
          }
          self.pledge(result.data.pledge)
          self.creationDate(parseDate(result.data.creationDate))
          self.pledgeHasLoaded(true)
          browser.print()
        }
        if (result.statusCode === 404) {
          browser.redirect('/404.html')
        }
        browser.loaded()
      }, () => {

      })
  }

  self.init()
}

module.exports = ViewYourPledge
