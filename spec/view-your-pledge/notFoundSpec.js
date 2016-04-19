/*
  global describe, beforeEach, afterEach, it, expect
*/
'use strict'

let Model = require('../../src/js/ViewYourPledge')

var sinon = require('sinon')
var api = require('../../src/js/api-endpoints')
var getParams = require('../../src/js/getUrlParam')
var browser = require('../../src/js/browser')

describe('View Your Pledge - Not Found', () => {
  var browserLoadingStub
  var browserRedirectStub
  var sut

  beforeEach(() => {
    browserLoadingStub = sinon.stub(browser, 'loading')
    browserRedirectStub = sinon.stub(browser, 'redirect').withArgs('/404.html')
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
    sut = new Model()
  })

  afterEach(() => {
    browser.loading.restore()
    browser.redirect.restore()
    getParams.parameter.restore()
  })

  it('- Should show it is loading', () => {
    expect(browserLoadingStub.calledOnce).toBeTruthy()
  })

  it('- Should redirect to 404', () => {
    expect(browserRedirectStub.calledOnce).toBeTruthy()
  })
})
