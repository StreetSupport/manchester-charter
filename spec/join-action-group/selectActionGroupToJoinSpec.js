/*
  global describe, beforeEach, afterEach, it, expect
*/
'use strict'

var Model = require('../../src/js/JoinActionGroup')
var sinon = require('sinon')
var browser = require('../../src/js/browser')
var api = require('../../src/js/api-endpoints')
var ajax = require('../../src/js/ajax')
var querystring = require('../../src/js/getUrlParam')
import { getGroupData } from './getGroupData'

describe('Select Action Group to join', () => {
  var sut
  var browserPushHistoryStub

  beforeEach(() => {
    sinon.stub(browser, 'loading')
    sinon.stub(browser, 'loaded')
    sinon.stub(browser, 'scrollTo')
    sinon.stub(browser, 'setOnHistoryPop')
    sinon.stub(querystring, 'hashbang').returns('')
    browserPushHistoryStub = sinon.stub(browser, 'pushHistory')
    sinon.stub(ajax, 'get')
      .withArgs(api.actionGroups)
      .returns({
        then: function (success, error) {
          success({
            'status': 'ok',
            'data': getGroupData()
          })
        }
      })

    sut = new Model()
    sut.actionGroups()[1].selectActionGroup()
  })
  afterEach(() => {
    browser.loading.restore()
    browser.loaded.restore()
    browser.scrollTo.restore()
    browser.pushHistory.restore()
    querystring.hashbang.restore()
    browser.setOnHistoryPop.restore()
    ajax.get.restore()
  })

  it('- Should set address bar', () => {
    expect(browserPushHistoryStub.withArgs({}, 'Women\'s Direct Access Action Group', '#!womens-direct-access').calledOnce).toBeTruthy()
  })

  it('- Should set Section 1 as inactive', () => {
    expect(sut.section1.isActive()).toBeFalsy()
  })

  it('- Should set Section 2 as active', () => {
    expect(sut.section2.isActive()).toBeTruthy()
  })

  it('- Should set Section 3 as inactive', () => {
    expect(sut.section3.isActive()).toBeFalsy()
  })
})
