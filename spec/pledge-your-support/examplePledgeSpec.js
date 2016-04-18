/*
  global describe, beforeEach, it, expect
*/
'use strict'

var Model = require('../../src/js/PledgeYourSupport')

describe('Pledge Your Support', () => {
  let sut = new Model()

  it('- Should populate example pledges', () => {
    // from hard coded file
    expect(sut.supporterCategories.length).toBeGreaterThan(0)
  })

  describe('- Example Pledge', () => {
    beforeEach(() => {
      sut.supporterCategories[2].examplePledges[1].selectExamplePledge()
    })

    it('- Should populate pledge with example pledge', () => {
      expect(sut.pledge()).toEqual(sut.supporterCategories[2].examplePledges[1].description)
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
  })
})
