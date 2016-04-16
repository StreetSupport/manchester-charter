'use strict'

import { getSupporterCategories } from './examplePledges'
import ko from 'knockout'

let ExamplePledge = function (data, listener) {
  var self = this
  self.description = data
  self.listener = listener

  self.selectExamplePledge = () => {
    self.listener.pledgeSelected(data)
  }
}

let SupporterCategory = function (data, listener) {
  var self = this
  self.name = data.name
  self.listener = listener
  self.examplePledges = data.examplePledges
    .map((p) => new ExamplePledge(p, self))
  self.customPledge = ko.observable()

  self.pledgeSelected = (pledge) => {
    self.listener.pledgeSelected(pledge)
  }
  self.useCustomPledge = () => {
    self.listener.pledgeSelected(self.customPledge())
  }
}

let PledgeYourSupport = function () {
  var self = this
  self.pledge = ko.observable()

  self.init = () => {
    self.supporterCategories = getSupporterCategories()
      .map((sc) => new SupporterCategory(sc, self))
  }

  self.pledgeSelected = (pledge) => {
    self.pledge(pledge)
  }

  self.init()
}

module.exports = PledgeYourSupport
