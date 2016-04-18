'use strict'

import { getSupporterCategories } from './examplePledges'
import ko from 'knockout'

var browser = require('./browser')
var ajax = require('./ajax')
var api = require('./api-endpoints')

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

let Section = function () {
  var self = this
  self.isActive = ko.observable(false)
}

let PledgeYourSupport = function () {
  var self = this

  let setActiveSection = (sectionIndex) => {
    let sections = [self.section1, self.section2, self.section3]
    sections.forEach((s) => s.isActive(false))
    sections[sectionIndex - 1].isActive(true)
  }

  self.init = () => {
    self.pledge = ko.observable()
    self.supporterCategories = getSupporterCategories()
      .map((sc) => new SupporterCategory(sc, self))
    self.section1 = new Section()
    self.section2 = new Section()
    self.section3 = new Section()
    setActiveSection(1)
  }

  self.pledgeSelected = (pledge) => {
    self.pledge(pledge)
    setActiveSection(2)
  }

  self.submitPledge = () => {
    browser.loading()
    let endpoint = api.makeAPledge
    let data = {
      pledge: self.pledge()
    }
    console.log(endpoint)
    console.log(data)
    ajax
      .post(endpoint, data)
      .then((result) => {
        setActiveSection(3)
        browser.loaded()
      }, (error) => {

      })
  }

  self.init()
}

module.exports = PledgeYourSupport
