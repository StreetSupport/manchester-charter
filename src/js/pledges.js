// use require for sinon mocking
const ajax = require('./ajax')
const browser = require('./browser')
const endpoints = require('./api-endpoints')

let Pledges = function () {
  let self = this
  self.pledges = []

  let mapPledge = (p) => {
    return {
      'firstName': p.firstName,
      'lastName': p.lastName,
      'organisation': p.organisation,
      'creationDate': p.creationDate
    }
  }

  let init = () => {
    browser.loading()
    ajax
      .get(endpoints.pledges)
      .then((result) => {
        self.pledges = result.data.map((p) => mapPledge(p))
        browser.loaded()
      }, () => {
        browser.redirect('/500/')
      })
  }

  init()
}

module.exports = Pledges
