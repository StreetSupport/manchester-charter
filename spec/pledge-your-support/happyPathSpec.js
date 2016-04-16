/*
  global describe, beforeEach, afterEach, it, expect
*/
'use strict'

// import sinon from 'sinon'

// // use require for sinon mocking
// var browser = require('../../src/js/browser')
// var ajax = require('../../src/js/ajax')

var Model = require('../../src/js/PledgeYourSupport')

// import * as endpoints from '../../src/js/api-endpoints'

describe('Pledge Your Support', () => {
  let sut = new Model()
  beforeEach(() => {
  })
  afterEach(() => {

  })
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
  })

  describe('- Custom Pledge', () => {
    beforeEach(() => {
      sut.supporterCategories[2].customPledge('my custom pledge')
      sut.supporterCategories[2].useCustomPledge()
    })
    it('- Should populate pledge with custom pledge', () => {
      expect(sut.pledge()).toEqual('my custom pledge')
    })
  })
})

