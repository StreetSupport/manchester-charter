/*
  global describe, beforeEach, afterEach, it, expect
*/
'use strict'

let Model = require('../../src/js/JoinActionGroup')
var sinon = require('sinon')
var browser = require('../../src/js/browser')
var api = require('../../src/js/api-endpoints')
var ajax = require('../../src/js/ajax')
import { getGroupData } from './getGroupData'

describe('Join Action Group - Submit - Server returns bad request', () => {
  var browserRedirectStub
  var sut

  beforeEach(() => {
    sinon.stub(browser, 'loading')
    sinon.stub(browser, 'loaded')
    sinon.stub(browser, 'scrollTo')
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
    sut.submitPledge()
  })

  afterEach(() => {
    browser.loading.restore()
    browser.loaded.restore()
    browser.scrollTo.restore()
    browser.redirect.restore()
    ajax.post.restore()
    ajax.get.restore()
  })

  it('- Should redirect to 500 page', () => {
    expect(browserRedirectStub.withArgs('/500.html').calledOnce).toBeTruthy()
  })
})
