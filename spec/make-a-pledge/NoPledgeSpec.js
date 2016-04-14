/*
  global describe, beforeEach, afterEach, it, expect
*/
'use strict'

import sinon from 'sinon'

// use require for sinon mocking
var browser = require('../../src/js/browser')
var ajax = require('../../src/js/ajax')

var MakeAPledge = require('../../src/js/makeAPledge')

describe('Make a Pledge - No Pledge', () => {
  let browserGetInputFieldStub // eslint-disable-line
  let browserShowErrorStub // eslint-disable-line
  let ajaxPostStub // eslint-disable-line
  let sut

  beforeEach(() => {
    browserGetInputFieldStub = sinon.stub(browser, 'getInputField')
    browserGetInputFieldStub.withArgs('firstName').returns('first name')
    browserGetInputFieldStub.withArgs('lastName').returns('last name')
    browserGetInputFieldStub.withArgs('supporterCategory').returns('supporter category')
    browserGetInputFieldStub.withArgs('pledge').returns('')
    browserGetInputFieldStub.withArgs('organisation').returns('organisation')
    browserGetInputFieldStub.withArgs('email').returns('test@email.com')
    browserGetInputFieldStub.withArgs('isOptedIn').returns(true)
    browserShowErrorStub = sinon.stub(browser, 'showError')

    ajaxPostStub = sinon.stub(ajax, 'post')

    sut = new MakeAPledge()
    sut.submitForm()
  })

  afterEach(() => {
    browser.getInputField.restore()
    browser.showError.restore()
    ajax.post.restore()
  })

  it('should not post form fields to api', () => {
    expect(ajaxPostStub.called).toBeFalsy()
  })

  it('should tell browser to show error', () => {
    expect(browserShowErrorStub.withArgs('pledge', 'Pledge should not be empty.').calledOnce).toBeTruthy()
  })
})
