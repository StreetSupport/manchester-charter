/*
  global describe, beforeEach, it, expect
*/
'use strict'

var sinon = require('sinon')

var Model = require('../../src/js/PledgeYourSupport')
var browser = require('../../src/js/browser')

describe('Pledge Your Support', () => {
  var sut

  beforeEach(() => {
    sinon.stub(browser, 'jumpTo')
    sut = new Model()
  })

  it('- Should set supporter category id', () => {
    expect(sut.supporterCategories[0].id).toEqual('i-have-experienced-homelessness')
  })
})
