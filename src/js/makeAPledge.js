// use require for sinon mocking
const ajax = require('./ajax')
const browser = require('./browser')
const endpoints = require('./api-endpoints')

import { getFormData } from './forms'

let MakeAPledge = function () {
  let self = this

  let formSchema = {
    firstName: null,
    lastName: null,
    supporterCategory: null,
    organisation: null,
    email: null,
    isOptedIn: null
  }

  self.submitForm = () => {
    browser.loading()
    ajax
      .post(endpoints.makeAPledge, getFormData(formSchema))
      .then((result) => {
        browser.loaded()
      }, () => {

      })
  }
}

module.exports = MakeAPledge
