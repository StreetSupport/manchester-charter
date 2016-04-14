// use require for sinon mocking
const ajax = require('./ajax')
const browser = require('./browser')
const endpoints = require('./api-endpoints')

let MakeAPledge = function () {
  let self = this

  let init = () => {

  }

  let formData = {
    firstName: null,
    lastName: null,
    supporterCategory: null,
    organisation: null,
    email: null,
    isOptedIn: null
  }

  let getFormData = () => {
    for (var key in formData) {
      if (formData.hasOwnProperty(key)) {
        formData[key] = browser.getInputField(key)
      }
    }

    return formData
  }

  self.submitForm = () => {
    browser.loading()
    ajax
      .post(endpoints.makeAPledge, getFormData())
      .then((result) => {
        browser.loaded()
      }, () => {

      })
  }

  init()
}

module.exports = MakeAPledge
