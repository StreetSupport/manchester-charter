/*
  global describe, beforeEach, afterEach, it, expect
*/
'use strict'

let Model = require('../../src/js/PledgeYourSupport')

var sinon = require('sinon')
var browser = require('../../src/js/browser')
var ajax = require('../../src/js/ajax')
var api = require('../../src/js/api-endpoints')

describe('Pledge Your Support - Submit Pledge', () => {
  var browserLoadingStub
  var browserLoadedStub
  var ajaxPostStub
  var sut

  beforeEach(() => {
    sut = new Model()
    browserLoadingStub = sinon.stub(browser, 'loading')
    browserLoadedStub = sinon.stub(browser, 'loaded')
    let expectedPledgeData = {
      firstName: 'first name',
      lastName: 'last name',
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
            'status': 201
          })
        }
      })
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
    ajax.post.restore()
  })

  it('- Should notify user it is loading', () => {
    expect(browserLoadingStub.calledOnce).toBeTruthy()
  })

  // it('- Should post pledge to API', () => {
  //   expect(ajaxPostStub.calledOnce).toBeTruthy()
  // })

  // it('- Should notify user it has loaded', () => {
  //   expect(browserLoadedStub.calledAfter(ajaxPostStub)).toBeTruthy()
  // })

  it('- Should set Section 1 as inactive', () => {
    expect(sut.section1.isActive()).toBeFalsy()
  })

  it('- Should set Section 2 as inactive', () => {
    expect(sut.section2.isActive()).toBeFalsy()
  })

  it('- Should set Section 3 as active', () => {
    expect(sut.section3.isActive()).toBeTruthy()
  })
})
