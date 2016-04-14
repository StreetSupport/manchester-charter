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

  let getFormData = (schema) => {
    for (var key in schema) {
      if (schema.hasOwnProperty(key)) {
        schema[key] = browser.getInputField(key)
      }
    }

    return schema
  }

  self.submitForm = () => {
    browser.loading()
    ajax
      .post(endpoints.makeAPledge, getFormData(formData))
      .then((result) => {
        browser.loaded()
      }, () => {

      })
  }

  init()
}

module.exports = MakeAPledge
