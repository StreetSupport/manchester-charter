/*
  global describe, beforeEach, afterEach, it, expect
*/
'use strict'

let Model = require('../../src/js/JoinActionGroup')
var sinon = require('sinon')
var validation = require('../../src/js/validation')
var api = require('../../src/js/api-endpoints')
var ajax = require('../../src/js/ajax')
import { getGroupData } from './getGroupData'

describe('Join Action Group', () => {
  var sut
  var validationInitStub
  var validationGetGroupStub
  var validationGroup
  var ajaxGetStub

  beforeEach(() => {
    validationInitStub = sinon.stub(validation, 'initialise')
    validationGroup = {
      'validation': 'group'
    }
    validationGetGroupStub = sinon.stub(validation, 'getValidationGroup').returns(validationGroup)

    ajaxGetStub = sinon.stub(ajax, 'get')
      .withArgs(api.actionGroups)
      .returns({
        then: function (success, error) {
          success({
            'status': 'ok',
            'data': getGroupData()
          })
        }
      })

    sut = new Model()
  })

  afterEach(() => {
    validation.initialise.restore()
    validation.getValidationGroup.restore()
    ajax.get.restore()
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

  it('- Should get group data', () => {
    expect(ajaxGetStub.calledOnce).toBeTruthy()
  })
})
