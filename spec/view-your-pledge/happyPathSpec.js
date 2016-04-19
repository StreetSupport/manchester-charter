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

describe('View Your Pledge', () => {
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
              'FirstName': 'first name',
              'LastName': 'last name',
              'Organisation': 'organisation',
              'CreationDate': '2016-04-11T11:04:55.8600000Z',
              'Pledge': 'my pledge description'
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

  it('- Should show it is loading', () => {
    expect(browserLoadingStub.calledOnce).toBeTruthy()
  })

  it('- Should get pledge from api', () => {
    expect(ajaxGetStub.calledAfter(browserLoadingStub)).toBeTruthy()
  })

  it('- Should show it has loaded', () => {
    expect(browserLoadedStub.calledAfter(ajaxGetStub)).toBeTruthy()
  })

  it('- Should set first name', () => {
    expect(sut.firstName).toEqual('first name')
  })

  it('- Should set last name', () => {
    expect(sut.lastName).toEqual('last name')
  })

  it('- Should set organisation', () => {
    expect(sut.organisation).toEqual('organisation')
  })

  it('- Should set pledge', () => {
    expect(sut.pledge).toEqual('my pledge description')
  })

  it('- Should set creation date', () => {
    expect(sut.creationDate).toEqual('11/04/2016')
  })
})
