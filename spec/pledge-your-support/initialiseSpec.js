/*
  global describe, it, expect
*/
'use strict'

let Model = require('../../src/js/PledgeYourSupport')

describe('Pledge Your Support', () => {
  let sut = new Model()

  it('- Should set Section 1 as active', () => {
    expect(sut.section1.isActive()).toBeTruthy()
  })

  it('- Should set Section 2 as inactive', () => {
    expect(sut.section2.isActive()).toBeFalsy()
  })

  it('- Should set Section 3 as inactive', () => {
    expect(sut.section3.isActive()).toBeFalsy()
  })
})
