/*
  global describe, beforeEach, afterEach, it, expect
*/
'use strict'

let Model = require('../../src/js/JoinActionGroup')

var sinon = require('sinon')
var ajax = require('../../src/js/ajax')
var api = require('../../src/js/api-endpoints')
var browser = require('../../src/js/browser')
var validation = require('../../src/js/validation')
import { getGroupData } from './getGroupData'

describe('Join Action Group - Submit - No First Name', () => {
  var browserLoadingStub
  var browserLoadedStub
  var validationShowErrorsStub
  var ajaxPostStub
  var sut

  beforeEach(() => {
    browserLoadingStub = sinon.stub(browser, 'loading')
    browserLoadedStub = sinon.stub(browser, 'loaded')
    sinon.stub(browser, 'scrollTo')
    validationShowErrorsStub = sinon.stub(validation, 'showErrors')

    let groupData = getGroupData()

    sinon.stub(ajax, 'get')
      .withArgs(api.actionGroups)
      .returns({
        then: (success, error) => {
          success({
            'status': 'ok',
            'data': groupData
          })
        }
      })

    let expectedPayloadData = {
      firstName: 'first name',
      lastName: 'last name',
      email: 'test@email.com',
      organisation: 'organisation',
      isOptedIn: true,
      message: 'my message'
    }
    ajaxPostStub = sinon.stub(ajax, 'post')
      .withArgs(api.actionGroups + '/' + groupData[1].id + '/joining-enquiries', expectedPayloadData)
      .returns({
        then: (success, error) => {
          success({
            'statusCode': 201
          })
        }
      })

    sut = new Model()
    sut.actionGroups()[1].selectActionGroup()
    sut.formModel().lastName('last name')
    sut.formModel().email('test@email.com')
    sut.formModel().pledge('my message')
    sut.formModel().organisation('organisation')
    sut.formModel().isOptedIn(true)

    browserLoadingStub.reset()
    browserLoadedStub.reset()

    sut.submitPledge()
  })

  afterEach(() => {
    browser.loading.restore()
    browser.loaded.restore()
    browser.scrollTo.restore()
    validation.showErrors.restore()
    ajax.post.restore()
    ajax.get.restore()
  })

  it('- Should show errors', () => {
    expect(validationShowErrorsStub.calledOnce).toBeFalsy()
  })

  it('- Should not post pledge to API', () => {
    expect(ajaxPostStub.called).toBeFalsy()
  })

  it('- Should set Section 1 as inactive', () => {
    expect(sut.section1.isActive()).toBeFalsy()
  })

  it('- Should set Section 2 as active', () => {
    expect(sut.section2.isActive()).toBeTruthy()
  })

  it('- Should set Section 3 as inactive', () => {
    expect(sut.section3.isActive()).toBeFalsy()
  })
})
