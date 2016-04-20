/*
  global describe, beforeEach, afterEach, it, expect
*/
'use strict'

let Model = require('../../src/js/JoinActionGroup')

var sinon = require('sinon')
var api = require('../../src/js/api-endpoints')
var ajax = require('../../src/js/ajax')
var browser = require('../../src/js/browser')
import { getGroupData } from './getGroupData'

describe('Join Action Group - Submit - Server returns bad request', () => {
  var browserLoadingStub
  var browserLoadedStub
  var browserScrollToStub
  var ajaxPostStub
  var sut

  beforeEach(() => {
    browserLoadingStub = sinon.stub(browser, 'loading')
    browserLoadedStub = sinon.stub(browser, 'loaded')
    browserScrollToStub = sinon.stub(browser, 'scrollTo')
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
    ajaxPostStub = sinon.stub(ajax, 'post')
      .returns({
        then: (success, error) => {
          success({
            'statusCode': 400
          })
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

    browserLoadingStub.reset()
    browserLoadedStub.reset()

    sut.submitPledge()
  })

  afterEach(() => {
    browser.loading.restore()
    browser.loaded.restore()
    browser.scrollTo.restore()
    ajax.get.restore()
    ajax.post.restore()
  })

  it('- Should notify user it is loading', () => {
    expect(browserLoadingStub.calledOnce).toBeTruthy()
  })

  it('- Should post pledge to API', () => {
    expect(ajaxPostStub.calledOnce).toBeTruthy()
  })

  it('- Should notify user it has loaded', () => {
    expect(browserLoadedStub.calledAfter(ajaxPostStub)).toBeTruthy()
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

  it('- Should set scroll to top of section', () => {
    expect(browserScrollToStub.withArgs('js-pledge').calledOnce).toBeFalsy()
  })
})
