/*
  global describe, beforeEach, afterEach, it, expect
*/
'use strict'

var sinon = require('sinon')

var Model = require('../../src/js/PledgeYourSupport')
var browser = require('../../src/js/browser')

describe('Pledge Your Support', () => {
  var sut
  var browserScrollToStub

  beforeEach(() => {
    browserScrollToStub = sinon.stub(browser, 'scrollTo')
    sut = new Model()
    sut.supporterCategories[2].examplePledges[1].selectExamplePledge()
  })

  afterEach(() => {
    browser.scrollTo.restore()
  })

  it('- Should populate example pledges', () => {
    // from hard coded file
    expect(sut.supporterCategories.length).toBeGreaterThan(0)
  })

  it('- Should populate pledge with example pledge', () => {
    expect(sut.formModel().pledge()).toEqual(sut.supporterCategories[2].examplePledges[1].description)
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
