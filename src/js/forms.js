'use strict'

const browser = require('./browser')

export function getFormData (schema) {
  var formData = schema
  for (var key in schema) {
    if (schema.hasOwnProperty(key)) {
      formData[key] = browser.getInputField(key)
    }
  }
  return formData
}
