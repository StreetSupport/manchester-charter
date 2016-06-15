'use strict'
import ko from 'knockout'
require('knockout.validation') // No variable here is deliberate!
import marked from 'marked'

var ajax = require('./ajax')
var api = require('./api-endpoints')
var browser = require('./browser')
var querystring = require('./getUrlParam')
var validation = require('./validation')

let ActionGroup = function (data, listener) {
  var self = this
  self.id = data.id
  self.name = data.name
  self.description = marked(data.description)
  self.synopsis = data.synopsis
  self.slug = data.name.toLowerCase().replace(/ /g, '-').replace('\'', '')
  self.selectActionGroup = () => {
    listener.actionGroupSelected(self)
  }
}

let Section = function () {
  var self = this
  self.isActive = ko.observable(false)
}

function Model () {
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

  self.setSection1Active = () => {
    self.setActiveSection(1)
  }

  self.actionGroupSelected = (actionGroup) => {
    self.selectedActionGroup(actionGroup)
    self.setActiveSection(2)
    let hashbang = querystring.buildHashbang(actionGroup.slug)
    browser.pushHistory({}, actionGroup.name + ' Action Group', hashbang)
  }

  self.init = () => {
    self.actionGroups = ko.observableArray()
    self.selectedActionGroup = ko.observable()

    validation.initialise(ko.validation)
    self.formModel = ko.validatedObservable({
      firstName: ko.observable().extend({ required: true }),
      lastName: ko.observable().extend({ required: true }),
      pledge: ko.observable().extend({ required: true }),
      organisation: ko.observable(),
      email: ko.observable().extend({ required: true, email: true }),
      isOptedIn: ko.observable()
    })
    self.fieldErrors = validation.getValidationGroup(ko.validation, self.formModel)

    self.section1 = new Section()
    self.section2 = new Section()
    self.section3 = new Section()
    self.section4 = new Section()
    self.activeSection = ko.observable(-1)

    browser.loading()

    ajax
      .get(api.actionGroups)
      .then((result) => {
        let actionGroups = result.data
          .map((g) => new ActionGroup(g, self))
        self.actionGroups(actionGroups)
        browser.setOnHistoryPop(self.setSection1Active)

        let hashbang = querystring.hashbang()
        if (hashbang.length > 0) {
          let matchingActionGroups = self.actionGroups().filter((ag) => ag.slug === hashbang)
          if (matchingActionGroups.length === 0) browser.redirect('/404')
          self.selectedActionGroup(matchingActionGroups[0])
          self.setActiveSection(2)
        } else {
          self.setActiveSection(1)
        }

        browser.loaded()
      }, () => {
        browser.redirect('/500/')
      })
  }

  let buildFormData = () => {
    return {
      firstName: self.formModel().firstName(),
      lastName: self.formModel().lastName(),
      email: self.formModel().email(),
      organisation: self.formModel().organisation(),
      isOptedIn: self.formModel().isOptedIn(),
      message: self.formModel().pledge()
    }
  }

  let submitForm = () => {
    browser.loading()
    self.setActiveSection(3)

    let endpoint = api.actionGroups + '/' + self.selectedActionGroup().id + '/joining-enquiries'
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

  self.init()
}

module.exports = Model
