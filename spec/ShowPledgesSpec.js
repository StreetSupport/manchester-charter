'use strict'

// use require for sinon mocking
var browser = require('../src/js/browser')

import * as pledges from '../src/js/pledges'
import sinon  from 'sinon'

describe('Show Pledges', () => {
  var browserLoadingStub
  var browserLoadedStub
  var result

  beforeEach(() => {
    browserLoadingStub = sinon.stub(browser, 'loading')
    browserLoadedStub = sinon.stub(browser, 'loaded')

    result = pledges.get()
  })

  afterEach(() => {
    browser.loading.restore()
    browser.loaded.restore()
  })

  it('should show loader', () => {
    expect(browserLoadingStub.calledOnce).toBeTruthy()
  })
})
