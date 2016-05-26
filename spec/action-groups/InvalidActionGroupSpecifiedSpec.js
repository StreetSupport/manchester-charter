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

describe('Invalid Action Group specified', () => {
  let browserRedirectStub = null
  beforeEach(() => {
    sinon.stub(browser, 'loading')
    sinon.stub(browser, 'loaded')
    sinon.stub(browser, 'setOnHistoryPop')
    browserRedirectStub = sinon.stub(browser, 'redirect').withArgs('/500')
    sinon.stub(ajax, 'get')
      .withArgs(endpoints.actionGroups)
      .returns({
        then: function (success, error) {
          success({
            'status': 'ok',
            'data': actionGroupsData()
          })
        }
      })
    sinon.stub(querystring, 'hashbang')
      .returns('invalid-group')

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

  it('- Should redirect to 404', () => {
    expect(browserRedirectStub.calledOnce).toBeTruthy()
  })
})

let actionGroupsData = () => {
  return [{
    'id': '571661e0e4b09686f6b2c883',
    'name': 'Mental Health',
    'synopsis': 'Improving Mental Health provision for homeless people',
    'description': 'mental health description'
  }, {
    'id': '57166268e4b09686f6b2c893',
    'name': 'Big Change Initiative',
    'synopsis': 'Alternative ways for the public to give money and reduce street begging',
    'description': 'big change initiative description'
  }, {
    'id': '57166204e4b09686f6b2c884',
    'name': 'Employment Opportunities',
    'synopsis': 'Increasing employment opportunities for people experiencing homelessness',
    'description': 'employment opportunities description'
  }]
}
