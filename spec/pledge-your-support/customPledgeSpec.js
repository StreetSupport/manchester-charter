/*
  global describe, beforeEach, it, expect
*/
'use strict'

let Model = require('../../src/js/PledgeYourSupport')

describe('Pledge Your Support - Custom Pledge', () => {
  let sut = new Model()

  beforeEach(() => {
    sut.supporterCategories[2].customPledge('my custom pledge')
    sut.supporterCategories[2].useCustomPledge()
  })

  it('- Should populate pledge with custom pledge', () => {
    expect(sut.formModel().pledge()).toEqual('my custom pledge')
  })
})
