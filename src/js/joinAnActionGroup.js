// use require for sinon mocking
const ajax = require('./ajax')
const browser = require('./browser')
const endpoints = require('./api-endpoints')

import { submitForm } from './forms'

let Model = function () {
  let self = this

  let formSchema = {
    fields: [
      { name: 'firstName', required: true },
      { name: 'lastName', required: true },
      { name: 'message', required: false },
      { name: 'email', required: true, dataType: 'email' },
      { name: 'isOptedIn', required: false }
    ]
  }

  let actionGroupId = 'action group id'
  let endpoint = `${endpoints.actionGroup}/${actionGroupId}/joining-enquiries`

  self.submitForm = () => {
    submitForm(formSchema, endpoint, (result) => { }, (error) => {  })
  }
}

module.exports = Model
