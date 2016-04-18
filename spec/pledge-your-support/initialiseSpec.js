/*
  global describe, beforeEach, afterEach, it, expect
*/
'use strict'

let Model = require('../../src/js/PledgeYourSupport')
var sinon = require('sinon')
var validation = require('../../src/js/validation')

describe('Pledge Your Support', () => {
  var sut
  var validationInitStub
  var validationGetGroupStub
  var validationGroup

  beforeEach(() => {
    validationInitStub = sinon.stub(validation, 'initialise')
    validationGroup = {
      'validation': 'group'
    }
    validationGetGroupStub = sinon.stub(validation, 'getValidationGroup').returns(validationGroup)
    sut = new Model()
  })

  afterEach(() => {
    validation.initialise.restore()
    validation.getValidationGroup.restore()
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

  it('- Should initialise validation', () => {
    expect(validationInitStub.calledOnce).toBeTruthy()
  })

  it('- Should set validation group with form model', () => {
    expect(validationGetGroupStub.calledOnce).toBeTruthy()
  })
})
