/*
  global describe, beforeEach, afterEach, it, expect
*/
'use strict'

var sinon = require('sinon')

var Model = require('../../src/js/PledgeYourSupport')
var browser = require('../../src/js/browser')

describe('Pledge Your Support - Select supporter category', () => {
  var sut
  var browserJumpToStub

  beforeEach(() => {
    browserJumpToStub = sinon.stub(browser, 'jumpTo')
    sut = new Model()
    sut.accordionOpened({
      childNodes: [
        'text',
        {
          innerHTML: 'supporter category',
          parentNode: {
            id: 'kaplaah!'
          }
        }
      ],

    }, { })
  })

  afterEach(() => {
    browser.jumpTo.restore()
  })

  it('- Should set supporter category', () => {
    expect(sut.formModel().supporterCategory()).toEqual('supporter category')
  })

  it('- Should jump to selected category', () => {
    expect(browserJumpToStub.withArgs('#kaplaah!').calledOnce).toBeTruthy()
  })
})
