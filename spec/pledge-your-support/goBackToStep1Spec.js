/*
  global describe, beforeEach, it, expect
*/
'use strict'

var Model = require('../../src/js/PledgeYourSupport')

describe('Pledge Your Support - Go back to step 1', () => {
  let sut = new Model()
  beforeEach(() => {
    sut.supporterCategories[2].examplePledges[1].selectExamplePledge()
    sut.setSection1Active()
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
})
