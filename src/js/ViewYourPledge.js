'use strict'

import ko from 'knockout'

var ajax = require('./ajax')
var api = require('./api-endpoints')
var browser = require('./browser')
var getUrlParam = require('./getUrlParam')

let ViewYourPledge = function () {
  var self = this

  self.init = () => {
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
        if(result.statusCode === 200) {
          self.firstName = result.data.FirstName
          self.lastName = result.data.LastName
          self.organisation = result.data.Organisation
          self.pledge = result.data.Pledge
          self.creationDate = parseDate(result.data.CreationDate)
        }
        if(result.statusCode === 404) {
          browser.redirect('/404.html')
        }
        browser.loaded()
      }, (error) => {

      })
  }

  self.init()
}

module.exports = ViewYourPledge
