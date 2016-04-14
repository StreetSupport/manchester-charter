// use require for sinon mocking
const ajax = require('./ajax')
const browser = require('./browser')
const endpoints = require('./api-endpoints')

import { getFormData, showErrors } from './forms'

let MakeAPledge = function () {
  let self = this

  let formSchema = {
    fields: [
      { name: 'firstName', required: true },
      { name: 'lastName', required: true },
      { name: 'supporterCategory', required: false },
      { name: 'organisation', required: false },
      { name: 'pledge', required: true },
      { name: 'email', required: true },
      { name: 'isOptedIn', required: false }
    ]
  }

  self.submitForm = () => {
    let formData = getFormData(formSchema)
    if (formData.errors.length > 0) {
      showErrors(formData.errors)
    } else {
      browser.loading()
      ajax
        .post(endpoints.makeAPledge, formData.data)
        .then((result) => {
          browser.loaded()
        }, () => {

        })
    }
  }
}

module.exports = MakeAPledge
