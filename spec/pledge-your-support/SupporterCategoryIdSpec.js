/*
  global describe, beforeEach, it, expect
*/
'use strict'

var Model = require('../../src/js/PledgeYourSupport')

describe('Pledge Your Support', () => {
  var sut

  beforeEach(() => {
    sut = new Model()
  })

  it('- Should set supporter category id', () => {
    expect(sut.supporterCategories[0].id).toEqual('i-have-experienced-homelessness')
  })
})
