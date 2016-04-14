'use strict'

const browser = require('./browser')

export function getFormData (schema) {
  let formData = {
    data: {},
    errors: []
  }
  let fields = schema.fields

  fields.forEach((f) => {
    let value = browser.getInputField(f.name)
    formData.data[f.name] = value
    if (f.required && (value === undefined || value.length === 0)) {
      formData.errors.push(f.name + ' should not be empty.')
    }
  })

  return formData
}
