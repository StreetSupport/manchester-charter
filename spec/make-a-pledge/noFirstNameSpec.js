/*
  global describe, beforeEach, afterEach, it, expect
*/
'use strict'

import sinon from 'sinon'

// use require for sinon mocking
var browser = require('../../src/js/browser')
var ajax = require('../../src/js/ajax')

var MakeAPledge = require('../../src/js/makeAPledge')

describe('Make a Pledge - No First Name', () => {
  let browserLoadingStub // eslint-disable-line
  let browserLoadedStub // eslint-disable-line
  let browserGetInputFieldStub // eslint-disable-line
  let ajaxPostStub // eslint-disable-line
  let sut

  beforeEach(() => {
    browserLoadingStub = sinon.stub(browser, 'loading')
    browserLoadedStub = sinon.stub(browser, 'loaded')
    browserGetInputFieldStub = sinon.stub(browser, 'getInputField')
    browserGetInputFieldStub.withArgs('firstName').returns('')
    browserGetInputFieldStub.withArgs('lastName').returns('last name')
    browserGetInputFieldStub.withArgs('supporterCategory').returns('supporter category')
    browserGetInputFieldStub.withArgs('organisation').returns('organisation')
    browserGetInputFieldStub.withArgs('email').returns('email@test.com')
    browserGetInputFieldStub.withArgs('isOptedIn').returns(true)

    ajaxPostStub = sinon.stub(ajax, 'post')

    sut = new MakeAPledge()
    sut.submitForm()
  })

  afterEach(() => {
    browser.loading.restore()
    browser.loaded.restore()
    browser.getInputField.restore()
    ajax.post.restore()
  })

  it('should not post form fields to api', () => {
    expect(ajaxPostStub.called).toBeFalsy()
  })
})
