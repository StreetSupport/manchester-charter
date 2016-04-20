/*
  global describe, beforeEach, afterEach, it, expect
*/
'use strict'

let Model = require('../../src/js/ViewYourPledge')

var sinon = require('sinon')
var ajax = require('../../src/js/ajax')
var api = require('../../src/js/api-endpoints')
var getParams = require('../../src/js/getUrlParam')
var browser = require('../../src/js/browser')

describe('View Your Pledge - Not Found', () => {
  var browserLoadingStub
  var browserRedirectStub

  beforeEach(() => {
    browserLoadingStub = sinon.stub(browser, 'loading')
    browserRedirectStub = sinon.stub(browser, 'redirect')
    sinon.stub(ajax, 'get')
      .withArgs(api.pledges + '/my-pledge-id')
      .returns({
        then: (success, error) => {
          success({
            'statusCode': 404
          })
        }
      })
    sinon.stub(getParams, 'parameter')
      .withArgs('id')
      .returns('my-pledge-id')

    let sut = new Model()
  })

  afterEach(() => {
    browser.loading.restore()
    browser.redirect.restore()
    ajax.get.restore()
    getParams.parameter.restore()
  })

  it('- Should show it is loading', () => {
    expect(browserLoadingStub.calledOnce).toBeTruthy()
  })

  it('- Should redirect to 404', () => {
    expect(browserRedirectStub.calledOnce).toBeTruthy()
  })
})
