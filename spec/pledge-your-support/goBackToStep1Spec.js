/*
  global describe, beforeEach, it, expect
*/
'use strict'

var Model = require('../../src/js/PledgeYourSupport')
var sinon = require('sinon')
var browser = require('../../src/js/browser')

describe('Pledge Your Support - Go back to step 1', () => {
  var sut
  var browserScrollToStub
  beforeEach(() => {
    browserScrollToStub = sinon.stub(browser, 'scrollTo')
    sut = new Model()

    sut.supporterCategories[2].examplePledges[1].selectExamplePledge()
    sut.setSection1Active()
  })
  afterEach(() => {
    browser.scrollTo.restore()
  })

  it('- Should set Section 1 as active', () => {
    expect(sut.section1.isActive()).toBeTruthy()
  })

  it('- Should set Section 2 as inactive', () => {
    expect(sut.section2.isActive()).toBeFalsy()
  })

  it('- Should set Section 3 as inactive', () => {
    expect(sut.section3.isActive()).toBeFalsy()
  })

  it('- Should set scroll to top of section', () => {
    expect(browserScrollToStub.withArgs('js-pledge').calledOnce).toBeFalsy()
  })
})
