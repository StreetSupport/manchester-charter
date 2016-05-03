/*
  global describe, beforeEach, afterEach, it, expect
*/
'use strict'

let Model = require('../../src/js/PledgeYourSupport')

var sinon = require('sinon')
var ajax = require('../../src/js/ajax')
var api = require('../../src/js/api-endpoints')
var browser = require('../../src/js/browser')

describe('Pledge Your Support - Submit Pledge - Not Enough Pledges', () => {
  var browserLoadingStub
  var browserLoadedStub
  var browserScrollToStub
  var browserInjectIFrameStub
  var ajaxPostStub
  var ajaxGetStub
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
    ajaxGetStub = sinon.stub(ajax, 'get')
      .withArgs(api.totalPledges)
      .returns({
        then: (success, error) => {
          success({
            'statusCode': 200,
            'data': {
              'total': '19'
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

  it('- Should set share text without total pledges so far', () => {
    expect(sut.shareText()).toEqual('I\'ve just pledged to help end homelessness in Manchester. Show your support and make a pledge.')
  })
})
