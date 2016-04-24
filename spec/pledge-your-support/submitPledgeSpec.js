/*
  global describe, beforeEach, afterEach, it, expect
*/
'use strict'

let Model = require('../../src/js/PledgeYourSupport')

var sinon = require('sinon')
var ajax = require('../../src/js/ajax')
var api = require('../../src/js/api-endpoints')
var browser = require('../../src/js/browser')

describe('Pledge Your Support - Submit Pledge', () => {
  var browserLoadingStub
  var browserLoadedStub
  var browserScrollToStub
  var browserInjectIFrameStub
  var ajaxPostStub
  var setActiveSectionSpy
  var sut

  beforeEach(() => {
    sut = new Model()
    browserLoadingStub = sinon.stub(browser, 'loading')
    browserLoadedStub = sinon.stub(browser, 'loaded')
    browserScrollToStub = sinon.stub(browser, 'scrollTo')
    browserInjectIFrameStub = sinon.stub(browser, 'injectHiddenIFrame')
    let expectedPledgeData = {
      firstName: 'first name',
      lastName: 'last name',
      supporterCategory: 'supporter category',
      organisation: 'organisation',
      email: 'test@email.com',
      isOptedIn: true,
      pledge: 'my pledge'
    }
    ajaxPostStub = sinon.stub(ajax, 'post')
      .withArgs(api.makeAPledge, expectedPledgeData)
      .returns({
        then: (success, error) => {
          success({
            'statusCode': 201,
            'data': {
              'id': 'pledge-id'
            }
          })
        }
      })
    setActiveSectionSpy = sinon.spy(sut, 'setActiveSection')

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
    browser.injectHiddenIFrame.restore()
    ajax.post.restore()
    sut.setActiveSection.restore()
  })

  it('- Should notify user it is loading', () => {
    expect(browserLoadingStub.calledOnce).toBeTruthy()
  })

  it('- Should set Section 3 as active', () => {
    expect(setActiveSectionSpy.getCall(0).args[0]).toEqual(3)
  })

  it('- Should post pledge to API', () => {
    expect(ajaxPostStub.calledOnce).toBeTruthy()
  })

  it('- Should notify user it has loaded', () => {
    expect(browserLoadedStub.calledAfter(ajaxPostStub)).toBeTruthy()
  })

  it('- Should set Section 4 as active', () => {
    expect(setActiveSectionSpy.getCall(1).args[0]).toEqual(4)
  })

  it('- Should set scroll to top of section', () => {
    expect(browserScrollToStub.withArgs('js-pledge').calledOnce).toBeFalsy()
  })

  describe('- Print my pledge', () => {
    beforeEach(() => {
      sut.viewMyPledge()
    })

    it('- Should inject iframe', () => {
      expect(browserInjectIFrameStub.withArgs('.js-pledge', 'view/?id=pledge-id').calledAfter(browserLoadedStub)).toBeTruthy()
    })
  })
})
