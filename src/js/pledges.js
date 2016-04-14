// use require for sinon mocking
var ajax = require('./ajax')
var browser = require('./browser')
var endpoints = require('./api-endpoints')

let Pledges = function () {
  var self = this
  self.pledges = []
  let init = () => {
    browser.loading()
    ajax
      .get(endpoints.pledges)
      .then((result) => {
        self.pledges = result.data.map((p) => {
          return {
            'firstName': p.firstName,
            'lastName': p.lastName,
            'organisation': p.organisation,
            'creationDate': p.creationDate
          }
        })
        browser.loaded()
      }, (error) => {

      })
  }

  init()
}

module.exports = Pledges
