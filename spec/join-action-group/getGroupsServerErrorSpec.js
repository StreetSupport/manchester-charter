/*
  global describe, beforeEach, afterEach, it, expect
*/

'use strict'

let Model = require('../../src/js/JoinActionGroup')
var sinon = require('sinon')
var browser = require('../../src/js/browser')
var ajax = require('../../src/js/ajax')

describe('Join Action Group - Server returns bad request', () => {
  var browserRedirectStub

  beforeEach(() => {
    sinon.stub(browser, 'loading')
    browserRedirectStub = sinon.stub(browser, 'redirect')
    sinon.stub(ajax, 'get')
      .returns({
        then: (success, error) => {
          error({ })
        }
      })
    let sut = new Model() // eslint-disable-line
  })

  afterEach(() => {
    browser.loading.restore()
    browser.redirect.restore()
    ajax.get.restore()
  })

  it('- Should redirect to 500 page', () => {
    expect(browserRedirectStub.withArgs('/500/').calledOnce).toBeTruthy()
  })
})
