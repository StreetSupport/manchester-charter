'use strict'

import { getSupporterCategories } from './examplePledges'
import ko from 'knockout'

let ExamplePledge = function (data, listener) {
  var self = this
  self.description = data
  self.listener = listener

  self.selectExamplePledge = () => {
    self.listener.examplePledgeSelected(data)
  }
}

let SupporterCategory = function (data, listener) {
  var self = this
  self.name = data.name
  self.listener = listener
  self.examplePledges = data.examplePledges
    .map((p) => new ExamplePledge(p, self))

  self.examplePledgeSelected = (pledge) => {
    self.listener.examplePledgeSelected(pledge)
  }
}

let PledgeYourSupport = function () {
  var self = this
  self.pledge = ko.observable()

  self.init = () => {
    self.supporterCategories = getSupporterCategories()
      .map((sc) => new SupporterCategory(sc, self))
  }

  self.examplePledgeSelected = (pledge) => {
    self.pledge(pledge)
  }

  self.init()
}

module.exports = PledgeYourSupport
