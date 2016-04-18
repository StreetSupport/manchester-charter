/*
  global describe, beforeEach, afterEach, it, expect
*/
'use strict'

let Model = require('../../src/js/PledgeYourSupport')

var sinon = require('sinon')
var ajax = require('../../src/js/ajax')
var browser = require('../../src/js/browser')

describe('Pledge Your Support - Submit Pledge - Server returns bad request', () => {
  var browserLoadingStub
  var browserLoadedStub
  var browserScrollToStub
  var browserRedirectStub
  var ajaxPostStub
  var sut

  beforeEach(() => {
    sut = new Model()
    browserLoadingStub = sinon.stub(browser, 'loading')
    browserLoadedStub = sinon.stub(browser, 'loaded')
    browserScrollToStub = sinon.stub(browser, 'scrollTo')
    browserRedirectStub = sinon.stub(browser, 'redirect')
    ajaxPostStub = sinon.stub(ajax, 'post')
      .returns({
        then: (success, error) => {
          error({ })
        }
      })
    sut.formModel().firstName('first name')
    sut.formModel().lastName('last name')
    sut.formModel().email('test@email.com')
    sut.formModel().supporterCategory('supporter category')
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
  })

  it('- Should redirect to 500 page', () => {
    expect(browserRedirectStub.withArgs('/500.html').calledOnce).toBeTruthy()
  })
})
