/*
  global describe, beforeEach, afterEach, it, expect
*/

'use strict'

let sinon = require('sinon')

let Model = require('../../src/js/ActionGroups')
let ajax = require('../../src/js/ajax')
let browser = require('../../src/js/browser')
let endpoints = require('../../src/js/api-endpoints')
let querystring = require('../../src/js/getUrlParam')

describe('Get Action Groups Server Error', () => {
  let browserRedirectStub = null

  beforeEach(() => {
    sinon.stub(querystring, 'hashbang').returns('')
    sinon.stub(browser, 'loading')
    sinon.stub(browser, 'loaded')
    sinon.stub(browser, 'setOnHistoryPop')
    browserRedirectStub = sinon.stub(browser, 'redirect').withArgs('/500')
    sinon.stub(ajax, 'get')
      .withArgs(endpoints.actionGroups)
      .returns({
        then: function (success, error) {
          error({})
        }
      })

  const model = new Model() // eslint-disable-line
  })

  afterEach(() => {
    querystring.hashbang.restore()
    ajax.get.restore()
    browser.setOnHistoryPop.restore()
    browser.loading.restore()
    browser.loaded.restore()
    browser.redirect.restore()
  })

  it('- Should redirect to 500', () => {
    expect(browserRedirectStub.calledOnce).toBeTruthy()
  })
})
