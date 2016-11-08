let ajax = require('./ajax')
let api = require('./api-endpoints')
let browser = require('./browser')
let moment = require('moment')
let ko = require('knockout')

const Pledge = function (data) {
  let self = this
  let pledgePrefix = data.organisation !== null && data.organisation.length > 0
    ? 'We pledge to '
    : 'I pledge to '
  let pledge = data.pledge
  self.message = pledgePrefix + pledge.charAt(0).toLowerCase() + pledge.substring(1)
  self.creationDate = moment(data.creationDate).format('Do MMMM YYYY')
  self.signature = data.organisation !== null && data.organisation.length > 0
    ? data.organisation
    : data.firstName + ' ' + data.lastName
}

const Model = function () {
  let self = this

  self.nextUrl = ko.observable(api.pledgesHal)
  self.moreAvailable = ko.computed(() => {
    return self.nextUrl() !== null
  }, self)

  self.init = () => {
    self.totalPledges = ko.observable('lots of')
    self.pledges = ko.observableArray()
    self.hasPledges = ko.computed(() => {
      return self.pledges().length > 0
    }, self)

    browser.loading()

    self.loadNext()
  }

  self.loadNext = () => {
    ajax
    .get(self.nextUrl())
    .then((result) => {
      let pledges = result.data.embedded.pledges
        .map((p) => new Pledge(p))
      self.pledges(self.pledges().concat(pledges))
      var next = result.data.links.next === null
        ? null
        : api.prefix(result.data.links.next)
      self.nextUrl(next)
      browser.loaded()
    }, () => {
      browser.redirect('/500')
    })
  }

  self.init()
}

module.exports = Model
