/*
  global describe, beforeEach, afterEach, it, expect
*/
'use strict'

import sinon from 'sinon'

// use require for sinon mocking
var browser = require('../../src/js/browser')
var ajax = require('../../src/js/ajax')

var Model = require('../../src/js/joinAnActionGroup')

import * as endpoints from '../../src/js/api-endpoints'

describe('Join An Action Group', () => {
  let browserLoadingStub
  let browserLoadedStub
  let browserGetInputFieldStub
  let ajaxPostStub
  let sut
  const actionGroupId = 'action group id'
  const joinAnActionGroupEndpoint = `${endpoints.actionGroup}/${actionGroupId}/joining-enquiries`

  beforeEach(() => {
    browserLoadingStub = sinon.stub(browser, 'loading')
    browserLoadedStub = sinon.stub(browser, 'loaded')
    browserGetInputFieldStub = sinon.stub(browser, 'getInputField')
    browserGetInputFieldStub.withArgs('firstName').returns('first name')
    browserGetInputFieldStub.withArgs('lastName').returns('last name')
    browserGetInputFieldStub.withArgs('message').returns('message')
    browserGetInputFieldStub.withArgs('email').returns('email@test.com')
    browserGetInputFieldStub.withArgs('isOptedIn').returns(true)

    const promise = {
      then: function (success, error) {
        success({
          'status': 'created',
          'data': {}
        })
      }
    }
    const expectedData = {
      'firstName': 'first name',
      'lastName': 'last name',
      'message': 'message',
      'email': 'email@test.com',
      'isOptedIn': true

    }
    ajaxPostStub = sinon
      .stub(ajax, 'post')
      .withArgs(joinAnActionGroupEndpoint, expectedData)
      .returns(promise)

    sut = new Model()
    sut.submitForm()
  })

  afterEach(() => {
    browser.loading.restore()
    browser.loaded.restore()
    browser.getInputField.restore()
    ajax.post.restore()
  })

  it('should show loader', () => {
    expect(browserLoadingStub.calledOnce).toBeTruthy()
  })

  it('should post form fields to api', () => {
    expect(ajaxPostStub.calledOnce).toBeTruthy()
  })

  it('should hide loader', () => {
    expect(browserLoadedStub.calledAfter(ajaxPostStub)).toBeTruthy()
  })
})
