/*
  global describe, beforeEach, afterEach, it, expect
*/
'use strict'

let Model = require('../../src/js/PledgeYourSupport')

var sinon = require('sinon')
var ajax = require('../../src/js/ajax')

describe('Pledge Your Support - Submit Pledge - No Last Name', () => {
  var ajaxPostStub
  var sut

  beforeEach(() => {
    sut = new Model()
    ajaxPostStub = sinon.stub(ajax, 'post')

    sut.formModel().firstName('first name')
    sut.formModel().lastName('')
    sut.formModel().email('test@email.com')
    sut.formModel().organisation('organisation')
    sut.formModel().isOptedIn(true)
    sut.formModel().pledge('my pledge')
    sut.submitPledge()
  })

  afterEach(() => {
    ajax.post.restore()
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
