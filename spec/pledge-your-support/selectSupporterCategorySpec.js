/*
  global describe, beforeEach, afterEach, it, expect
*/
'use strict'

var sinon = require('sinon')

var Model = require('../../src/js/PledgeYourSupport')
var browser = require('../../src/js/browser')

describe('Pledge Your Support - Select supporter category', () => {
  var sut

  beforeEach(() => {
    sinon.stub(browser, 'scrollTo')
    sut = new Model()
    sut.accordionOpened({ innerHTML: 'supporter category' }, { })
  })

  afterEach(() => {
    browser.scrollTo.restore()
  })

  it('- Should set supporter category', () => {
    expect(sut.formModel().supporterCategory()).toEqual('supporter category')
  })
})
