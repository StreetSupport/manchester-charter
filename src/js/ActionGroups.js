'use strict'
let ko = require('knockout')
let ajax = require('./ajax')
let endpoints = require('./api-endpoints')
let browser = require('./browser')
let querystring = require('./getUrlParam')

function ActionGroup (data, listener) {
  var self = this
  self.id = data.id
  self.name = data.name
  self.synopsis = data.synopsis
  self.description = data.description
  self.slug = data.name.toLowerCase().replace(' ', '-')

  self.view = () => {
    let hashbang = querystring.buildHashbang(self.slug)
    browser.pushHistory({}, self.name + ' Action Group', hashbang)
    listener.viewActionGroup(self)
  }
}

function ActionGroups () {
  var self = this
  self.isShowingGroup = ko.observable(false)
  self.actionGroups = ko.observableArray()
  self.activeActionGroup = ko.observable()

  self.viewActionGroup = (actionGroup) => {
    self.isShowingGroup(true)
    self.activeActionGroup(actionGroup)
  }

  self.closeActionGroup = () => {
    self.isShowingGroup(false)
  }

  self.backToList = () => {
    self.isShowingGroup(false)
    browser.popHistory()
  }

  const init = () => {
    browser.loading()
    ajax
      .get(endpoints.actionGroups)
      .then((result) => {
        self.actionGroups(result.data.map((d) => new ActionGroup(d, self)))
        browser.loaded()

        browser.setOnHistoryPop(self.closeActionGroup)

        let groupSlug = querystring.hashbang()

        if (groupSlug.length > 0) {
          let actionGroups = self.actionGroups().filter((ag) => ag.slug === groupSlug)
          if (actionGroups.length === 0) browser.redirect('/404')
          self.viewActionGroup(actionGroups[0])
        }
      }, () => {
        browser.redirect('/500')
      })
  }

  init()
}

module.exports = ActionGroups
