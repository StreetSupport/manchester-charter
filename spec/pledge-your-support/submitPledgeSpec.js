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
  var ajaxPostStub
  var setActiveSectionSpy
  var sut

  beforeEach(() => {
    sut = new Model()
    browserLoadingStub = sinon.stub(browser, 'loading')
    browserLoadedStub = sinon.stub(browser, 'loaded')
    browserScrollToStub = sinon.stub(browser, 'scrollTo')
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
    sinon.stub(ajax, 'get')
      .withArgs(api.totalPledges)
      .returns({
        then: (success, error) => {
          success({
            'statusCode': 200,
            'data': {
              'total': '20'
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
    ajax.post.restore()
    ajax.get.restore()
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

  it('- Should set share text to include total pledges so far', () => {
    expect(sut.shareText()).toEqual('I\'ve joined 20 others and pledged my support of the Manchester Homelessness Charter! Will you?')
  })
})
