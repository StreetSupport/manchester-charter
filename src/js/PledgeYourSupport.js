'use strict'

import { getSupporterCategories } from './examplePledges'
import ko from 'knockout'
require('knockout.validation') // No variable here is deliberate!

var ajax = require('./ajax')
var api = require('./api-endpoints')
var browser = require('./browser')
var validation = require('./validation')

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
    if (self.customPledge() !== undefined) {
      self.listener.pledgeSelected(self.customPledge())
    }
  }
}

let Section = function () {
  var self = this
  self.isActive = ko.observable(false)
}

let PledgeYourSupport = function () {
  var self = this

  self.setActiveSection = (sectionIndex) => {
    let sections = [self.section1, self.section2, self.section3, self.section4]
    sections.forEach((s) => s.isActive(false))
    sections[sectionIndex - 1].isActive(true)
    if (self.activeSection() > 0) {
      browser.scrollTo('.js-pledge')
    }
    self.activeSection(sectionIndex)
  }

  self.init = () => {
    validation.initialise(ko.validation)
    self.formModel = ko.validatedObservable({
      firstName: ko.observable().extend({ required: true }),
      lastName: ko.observable().extend({ required: true }),
      supporterCategory: ko.observable(),
      pledge: ko.observable().extend({ required: true }),
      organisation: ko.observable(),
      email: ko.observable().extend({ required: true, email: true }),
      isOptedIn: ko.observable()
    })
    self.fieldErrors = validation.getValidationGroup(ko.validation, self.formModel)

    self.supporterCategories = getSupporterCategories()
      .map((sc) => new SupporterCategory(sc, self))
    self.section1 = new Section()
    self.section2 = new Section()
    self.section3 = new Section()
    self.section4 = new Section()
    self.activeSection = ko.observable(-1)
    self.viewPledgeUrl = ko.observable()
    self.setActiveSection(1)
  }

  self.pledgeSelected = (pledge) => {
    self.formModel().pledge(pledge)
    self.setActiveSection(2)
  }

  self.setSection1Active = () => {
    self.setActiveSection(1)
  }

  self.accordionOpened = (el, context) => {
    self.formModel().supporterCategory(el.childNodes[1].innerHTML)
  }

  let buildFormData = () => {
    return {
      firstName: self.formModel().firstName(),
      lastName: self.formModel().lastName(),
      supporterCategory: self.formModel().supporterCategory(),
      email: self.formModel().email(),
      organisation: self.formModel().organisation(),
      isOptedIn: self.formModel().isOptedIn(),
      pledge: self.formModel().pledge()
    }
  }

  let submitForm = () => {
    browser.loading()
    self.setActiveSection(3)
    let endpoint = api.makeAPledge
    let data = buildFormData()
    ajax
      .post(endpoint, data)
      .then((result) => {
        browser.loaded()
        if (result.statusCode === 400) {
          self.setActiveSection(2)
        }
        if (result.statusCode === 201) {
          self.setActiveSection(4)
          self.viewPledgeUrl('view/?id=' + result.data.id)
        }
      }, () => {
        browser.redirect('/500/')
      })
  }

  self.submitPledge = () => {
    if (self.formModel.isValid()) {
      submitForm()
    } else {
      self.fieldErrors.showAllMessages()
    }
  }

  self.viewMyPledge = () => {
    browser.injectHiddenIFrame('.js-pledge', self.viewPledgeUrl())
  }

  self.init()
}

module.exports = PledgeYourSupport
