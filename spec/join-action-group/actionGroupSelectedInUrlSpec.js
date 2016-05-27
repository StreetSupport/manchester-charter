/*
  global describe, beforeEach, afterEach, it, expect
*/
'use strict'

let Model = require('../../src/js/JoinActionGroup')
var sinon = require('sinon')
var validation = require('../../src/js/validation')
var api = require('../../src/js/api-endpoints')
var ajax = require('../../src/js/ajax')
var querystring = require('../../src/js/getUrlParam')
var browser = require('../../src/js/browser')
import { getGroupData } from './getGroupData'

describe('Action Group selected in url', () => {
  var sut
  let browserScrollStub = null

  beforeEach(() => {
    sinon.stub(browser, 'loading')
    sinon.stub(browser, 'loaded')
    sinon.stub(browser, 'setOnHistoryPop')
    sinon.stub(browser, 'pushHistory')
    browserScrollStub = sinon.stub(browser, 'scrollTo')
    sinon.stub(validation, 'initialise')
    sinon.stub(validation, 'getValidationGroup')

    sinon.stub(querystring, 'hashbang')
      .returns('mental-health')

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
  })

  afterEach(() => {
    browser.loading.restore()
    browser.loaded.restore()
    browser.pushHistory.restore()
    browser.setOnHistoryPop.restore()
    browser.scrollTo.restore()
    querystring.hashbang.restore()
    validation.initialise.restore()
    validation.getValidationGroup.restore()
    ajax.get.restore()
  })

  it('- Should set Section 2 as active', () => {
    expect(sut.section2.isActive()).toBeTruthy()
  })

  it('- Should set active action group id', () => {
    expect(sut.selectedActionGroup().id).toEqual('571661e0e4b09686f6b2c883')
  })

  it('- Should set active action group name', () => {
    expect(sut.selectedActionGroup().name).toEqual('Mental Health')
  })

  it('- Should set active action group synopsis', () => {
    expect(sut.selectedActionGroup().synopsis).toEqual('action group synopsis')
  })

  it('- Should scroll to pledge section', () => {
    expect(browserScrollStub.withArgs('.js-pledge')).toBeTruthy()
  })
})
