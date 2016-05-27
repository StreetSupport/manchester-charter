/*
  global describe, beforeEach, afterEach, it, expect
*/
'use strict'

let Model = require('../../src/js/JoinActionGroup')
var sinon = require('sinon')
var browser = require('../../src/js/browser')
var api = require('../../src/js/api-endpoints')
var ajax = require('../../src/js/ajax')
var querystring = require('../../src/js/getUrlParam')
import { getGroupData } from './getGroupData'

describe('Join Action Group - Submit - Server returns 500', () => {
  var browserRedirectStub
  var sut

  beforeEach(() => {
    sinon.stub(browser, 'loading')
    sinon.stub(browser, 'loaded')
    sinon.stub(browser, 'scrollTo')
    sinon.stub(browser, 'pushHistory')
    sinon.stub(browser, 'setOnHistoryPop')
    sinon.stub(querystring, 'hashbang').returns('')
    browserRedirectStub = sinon.stub(browser, 'redirect')
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
    sinon.stub(ajax, 'post')
      .returns({
        then: (success, error) => {
          error({ })
        }
      })
    sut = new Model()
    sut.formModel().firstName('first name')
    sut.formModel().lastName('last name')
    sut.formModel().email('test@email.com')
    sut.formModel().organisation('organisation')
    sut.formModel().isOptedIn(true)
    sut.formModel().pledge('my pledge')
    sut.actionGroups()[1].selectActionGroup()
    sut.submitPledge()
  })

  afterEach(() => {
    browser.loading.restore()
    browser.loaded.restore()
    browser.scrollTo.restore()
    browser.pushHistory.restore()
    browser.setOnHistoryPop.restore()
    browser.redirect.restore()
    querystring.hashbang.restore()
    ajax.post.restore()
    ajax.get.restore()
  })

  it('- Should redirect to 500 page', () => {
    expect(browserRedirectStub.withArgs('/500/').calledOnce).toBeTruthy()
  })
})
