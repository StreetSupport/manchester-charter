/*
  global describe, beforeEach, afterEach, it, expect
*/
'use strict'

var Model = require('../../src/js/JoinActionGroup')
var sinon = require('sinon')
var browser = require('../../src/js/browser')
var api = require('../../src/js/api-endpoints')
var ajax = require('../../src/js/ajax')
import { getGroupData } from './getGroupData'

describe('Join Action Group - Go back to step 1', () => {
  var sut
  var browserScrollToStub

  beforeEach(() => {
    sinon.stub(browser, 'loading')
    sinon.stub(browser, 'loaded')
    browserScrollToStub = sinon.stub(browser, 'scrollTo')
    sinon.stub(ajax, 'get')
      .withArgs(api.actionGroups)
      .returns({
        then: function (success, error) {
          success({
            'status': 'ok',
            'data': getGroupData()
          })
        }
      })

    sut = new Model()
    sut.actionGroups()[1].selectActionGroup()
    sut.setSection1Active()
  })
  afterEach(() => {
    browser.loading.restore()
    browser.loaded.restore()
    browser.scrollTo.restore()
    ajax.get.restore()
  })

  it('- Should set Section 1 as active', () => {
    expect(sut.section1.isActive()).toBeTruthy()
  })

  it('- Should set Section 2 as inactive', () => {
    expect(sut.section2.isActive()).toBeFalsy()
  })

  it('- Should set Section 3 as inactive', () => {
    expect(sut.section3.isActive()).toBeFalsy()
  })

  it('- Should set scroll to top of section', () => {
    expect(browserScrollToStub.withArgs('js-pledge').calledOnce).toBeFalsy()
  })
})
