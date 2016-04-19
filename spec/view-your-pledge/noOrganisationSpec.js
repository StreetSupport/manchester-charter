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

describe('View Your Pledge - No Organisation', () => {
  var browserLoadingStub
  var browserLoadedStub
  var ajaxGetStub
  var sut

  beforeEach(() => {
    browserLoadingStub = sinon.stub(browser, 'loading')
    browserLoadedStub = sinon.stub(browser, 'loaded')
    ajaxGetStub = sinon.stub(ajax, 'get')
      .withArgs(api.pledges + '/my-pledge-id')
      .returns({
        then: (success, error) => {
          success({
            'statusCode': 200,
            'data': {
              'firstName': 'first name',
              'lastName': 'last name',
              'organisation': null,
              'creationDate': '2016-04-11T11:04:55.8600000Z',
              'pledge': 'my pledge description'
            }
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
    browser.loaded.restore()
    ajax.get.restore()
    getParams.parameter.restore()
  })

  it('- Should not set organisation text', () => {
    expect(sut.organisationText()).toEqual(undefined)
  })
})
