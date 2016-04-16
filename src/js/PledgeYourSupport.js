'use strict'

import { getSupporterCategories } from './examplePledges'
import ko from 'knockout'

let ExamplePledge = function (data) {
  var self = this
  self.description = data
}

let SupporterCategory = function (data) {
  var self = this
  self.name = data.name
  self.examplePledges = data.examplePledges
    .map((p) => new ExamplePledge(p))
}

let PledgeYourSupport = function () {
  var self = this
  self.pledge = ko.observable()

  self.init = () => {
    self.supporterCategories = getSupporterCategories()
      .map((sc) => new SupporterCategory(sc))
  }

  self.init()
}

module.exports = PledgeYourSupport
