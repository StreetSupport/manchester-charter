/*
  global describe, beforeEach, afterEach, it, expect
*/

'use strict'

let sinon = require('sinon')

let Model = require('../../src/js/ActionGroups')
let ajax = require('../../src/js/ajax')
let browser = require('../../src/js/browser')
let endpoints = require('../../src/js/api-endpoints')
let querystring = require('../../src/js/getUrlParam')

describe('Generic Action Groups page requested', () => {
  let model = null
  let ajaxGetStub = null
  let browserLoadingStub = null
  let browserLoadedStub = null
  let browserOnHistoryPopStub = null
  beforeEach(() => {
    sinon.stub(querystring, 'hashbang').returns('')
    browserLoadingStub = sinon.stub(browser, 'loading')
    browserLoadedStub = sinon.stub(browser, 'loaded')
    browserOnHistoryPopStub = sinon.stub(browser, 'setOnHistoryPop')
    ajaxGetStub = sinon.stub(ajax, 'get')
      .withArgs(endpoints.actionGroups)
      .returns({
        then: function (success, error) {
          success({
            'status': 'ok',
            'data': actionGroupsData()
          })
        }
      })

    model = new Model()
  })

  afterEach(() => {
    querystring.hashbang.restore()
    ajax.get.restore()
    browser.setOnHistoryPop.restore()
    browser.loading.restore()
    browser.loaded.restore()
  })

  it('- Should set isShowingGroup to false', () => {
    expect(model.isShowingGroup()).toBeFalsy()
  })

  it('- Should tell user it is loading', () => {
    expect(browserLoadingStub.calledOnce).toBeTruthy()
  })

  it('- Should retrieve action group info', () => {
    expect(ajaxGetStub.calledAfter(browserLoadingStub)).toBeTruthy()
  })

  it('- Should map action groups', () => {
    expect(model.actionGroups().length).toEqual(3)
  })

  it('- Should set action group id', () => {
    expect(model.actionGroups()[0].id).toEqual('571661e0e4b09686f6b2c883')
  })

  it('- Should set action group name', () => {
    expect(model.actionGroups()[0].name).toEqual('Mental Health')
  })

  it('- Should set action group synopsis', () => {
    expect(model.actionGroups()[0].synopsis).toEqual('Improving Mental Health provision for homeless people')
  })

  it('- Should set action group description', () => {
    expect(model.actionGroups()[0].description).toEqual('mental health description')
  })

  it('- Should set action slug', () => {
    expect(model.actionGroups()[0].slug).toEqual('mental-health')
  })

  it('- Should set history on pop', () => {
    expect(browserOnHistoryPopStub.withArgs(model.closeActionGroup).calledOnce).toBeTruthy()
  })

  it('- Should tell user it has loaded', () => {
    expect(browserLoadedStub.calledAfter(ajaxGetStub)).toBeTruthy()
  })

  describe('- Select action group', () => {
    let browserPushHistoryStub = null

    beforeEach(() => {
      browserPushHistoryStub = sinon.stub(browser, 'pushHistory')
      model.actionGroups()[0].view()
    })

    afterEach(() => {
      browser.pushHistory.restore()
    })

    it('- Should set address bar', () => {
      expect(browserPushHistoryStub.withArgs({}, 'Mental Health Action Group', '#!mental-health').calledOnce).toBeTruthy()
    })

    it('- Should set isShowingGroup to true', () => {
      expect(model.isShowingGroup()).toBeTruthy()
    })

    it('- Should set active actiongroup', () => {
      expect(model.activeActionGroup().name).toEqual('Mental Health')
    })

    describe('- Then view all action groups', () => {
      let browserPopHistoryStub = null

      beforeEach(() => {
        browserPopHistoryStub = sinon.stub(browser, 'popHistory')
        model.backToList()
      })

      afterEach(() => {
        browser.popHistory.restore()
      })

      it('- Should set isShowingGroup to false', () => {
        expect(model.isShowingGroup()).toBeFalsy()
      })

      it('- Should rewind history', () => {
        expect(browserPopHistoryStub.calledOnce).toBeTruthy()
      })
    })
  })
})

let actionGroupsData = () => {
  return [{
    'id': '571661e0e4b09686f6b2c883',
    'name': 'Mental Health',
    'synopsis': 'Improving Mental Health provision for homeless people',
    'description': 'mental health description'
  }, {
    'id': '57166268e4b09686f6b2c893',
    'name': 'Big Change Initiative',
    'synopsis': 'Alternative ways for the public to give money and reduce street begging',
    'description': 'big change initiative description'
  }, {
    'id': '57166204e4b09686f6b2c884',
    'name': 'Employment Opportunities',
    'synopsis': 'Increasing employment opportunities for people experiencing homelessness',
    'description': 'employment opportunities description'
  }]
}
