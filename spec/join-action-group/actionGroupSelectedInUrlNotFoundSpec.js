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

describe('Action Group selected in url not found', () => {
  var sut
  let browserRedirectStub = null

  beforeEach(() => {
    sinon.stub(browser, 'loading')
    sinon.stub(browser, 'loaded')
    sinon.stub(browser, 'setOnHistoryPop')
    sinon.stub(browser, 'pushHistory')
    browserRedirectStub = sinon.stub(browser, 'redirect')
    sinon.stub(validation, 'initialise')
    sinon.stub(validation, 'getValidationGroup')

    sinon.stub(querystring, 'hashbang')
      .returns('invalid-group')

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
    browser.redirect.restore()
    querystring.hashbang.restore()
    validation.initialise.restore()
    validation.getValidationGroup.restore()
    ajax.get.restore()
  })

  it('- Should redirect to 404', () => {
    expect(browserRedirectStub.withArgs('/404').calledOnce).toBeTruthy()
  })
})
