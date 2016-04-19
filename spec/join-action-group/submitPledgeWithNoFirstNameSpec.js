/*
  global describe, beforeEach, afterEach, it, expect
*/
'use strict'

let Model = require('../../src/js/JoinActionGroup')

var sinon = require('sinon')
var ajax = require('../../src/js/ajax')
var validation = require('../../src/js/validation')

describe('Join Action Group - Submit - No First Name', () => {
  var ajaxPostStub
  var validationShowErrorsStub
  var sut

  beforeEach(() => {
    sut = new Model()
    ajaxPostStub = sinon.stub(ajax, 'post')
    validationShowErrorsStub = sinon.stub(validation, 'showErrors')

    sut.formModel().firstName('')
    sut.formModel().lastName('last name')
    sut.formModel().email('test@email.com')
    sut.formModel().organisation('organisation')
    sut.formModel().isOptedIn(true)
    sut.formModel().pledge('pledge')
    sut.submitPledge()
  })

  afterEach(() => {
    ajax.post.restore()
    validation.showErrors.restore()
  })

  it('- Should show errors', () => {
    expect(validationShowErrorsStub.calledOnce).toBeFalsy()
  })

  it('- Should not post pledge to API', () => {
    expect(ajaxPostStub.called).toBeFalsy()
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
