/*
  global describe, beforeEach, afterEach, it, expect
*/
'use strict'

import sinon from 'sinon'

// use require for sinon mocking
var browser = require('../../src/js/browser')
var ajax = require('../../src/js/ajax')

var Pledges = require('../../src/js/pledges')

import * as endpoints from '../../src/js/api-endpoints'

describe('Show Pledges', () => {
  var browserLoadingStub // eslint-disable-line
  var browserLoadedStub // eslint-disable-line
  var browserRedirectStub
  var ajaxGetStub // eslint-disable-line
  var sut // eslint-disable-line

  const getPledgesEndpoint = endpoints.pledges

  beforeEach(() => {
    browserLoadingStub = sinon.stub(browser, 'loading')
    browserLoadedStub = sinon.stub(browser, 'loaded')
    browserRedirectStub = sinon.stub(browser, 'redirect')

    var getPledgesPromise = {
      then: function (success, error) {
        error({})
      }
    }
    ajaxGetStub = sinon
      .stub(ajax, 'get')
      .withArgs(getPledgesEndpoint)
      .returns(getPledgesPromise)

    sut = new Pledges()
  })

  afterEach(() => {
    browser.loading.restore()
    browser.loaded.restore()
    browser.redirect.restore()
    ajax.get.restore()
  })

  it('should redirect to 500 page', () => {
    expect(browserRedirectStub.withArgs('/500/').calledOnce).toBeTruthy()
  })
})
