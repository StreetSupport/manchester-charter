/* global */

import './common'

let ajax = require('./ajax')
let api = require('./api-endpoints')
let browser = require('./browser')
let ko = require('knockout')
let moment = require('moment')

let Pledge = function (data) {
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

let Model = function () {
  let self = this
  self.totalPledges = ko.observable('lots of')
  self.pledges = ko.observableArray()
  self.hasPledges = ko.computed(() => {
    return self.pledges().length > 0
  }, self)

  browser.loading()

  self.totalLoaded = false
  self.pledgesLoaded = false

  self.loadedSomeData = () => {
    if (self.totalLoaded && self.pledgesLoaded) {
      browser.loaded()
    }
  }

  ajax
    .get(api.totalPledges)
    .then((result) => {
      let total = result.data.total
      if (total >= 5) {
        self.totalPledges(result.data.total)
      }
      self.totalLoaded = true
      self.loadedSomeData()
    }, () => {
      browser.redirect('/500')
    })

  ajax
    .get(api.pledges + '?sort-by=creationDate&sort-direction=desc&limit=20')
    .then((result) => {
      self.pledges(result.data.map((p) => new Pledge(p)))
      self.pledgesLoaded = true
      self.loadedSomeData()
    }, () => {
      browser.redirect('/500')
    })
}

ko.applyBindings(new Model())

