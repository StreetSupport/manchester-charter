'use strict'

import sinon  from 'sinon'

// use require for sinon mocking
var browser = require('../src/js/browser')
var ajax = require('../src/js/ajax')

var Pledges = require('../src/js/pledges')

import * as endpoints from '../src/js/api-endpoints'

describe('Show Pledges', () => {
  var browserLoadingStub
  var browserLoadedStub
  var ajaxGetStub
  var sut

  const pledgeData = [{
    firstName: 'first name 1',
    lastName: 'last name 1',
    organisation: 'organisation 1',
    creationDate: '2016-04-11T11:04:55.8600000Z'
  },{
    firstName: 'first name 2',
    lastName: 'last name 2',
    organisation: 'organisation 2',
    creationDate: '2016-04-11T11:04:55.8600000Z'
  },{
    firstName: 'first name 3',
    lastName: 'last name 3',
    organisation: 'organisation 3',
    creationDate: '2016-04-11T11:04:55.8600000Z'
  }]
  const getPledgesEndpoint = endpoints.pledges
  const headers = {
    'content-type': 'application/json'
  }

  beforeEach(() => {
    browserLoadingStub = sinon.stub(browser, 'loading')
    browserLoadedStub = sinon.stub(browser, 'loaded')

    var getPledgesPromise = {
      then: function (success, error) {
        success({
          'status': 'ok',
          'data': pledgeData
        })
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
    ajax.get.restore()
  })

  it('should show loader', () => {
    expect(browserLoadingStub.calledOnce).toBeTruthy()
  })

  it('should get pledges from api', () => {
    expect(ajaxGetStub.calledOnce).toBeTruthy()
  })

  it('should map pledges', () => {
    expect(sut.pledges.length).toEqual(3)
  })

  it('should map first names', () => {
    expect(sut.pledges[1].firstName).toEqual('first name 2')
  })

  it('should map last names', () => {
    expect(sut.pledges[1].lastName).toEqual('last name 2')
  })

  it('should map organisations', () => {
    expect(sut.pledges[1].organisation).toEqual('organisation 2')
  })

  it('should map creation dates', () => {
    expect(sut.pledges[1].creationDate).toEqual('2016-04-11T11:04:55.8600000Z')
  })

  it('should get hide loader', () => {
    expect(browserLoadedStub.calledAfter(ajaxGetStub)).toBeTruthy()
  })
})
