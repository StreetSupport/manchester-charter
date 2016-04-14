'use strict'

const browser = require('./browser')
import { validate as emailIsValid } from 'email-validator'

export function getFormData (schema) {
  let titleCase = (string) => {
    return string.split(/(?=[A-Z])/g)
      .map((w) => w.charAt(0).toUpperCase() + w.substring(1))
      .join(' ')
  }
  let formData = {
    data: {},
    errors: []
  }
  schema.fields.forEach((f) => {
    let value = browser.getInputField(f.name)
    formData.data[f.name] = value
    if (f.required && value.length === 0) {
      formData.errors.push({ fieldName: f.name, message: titleCase(f.name) + ' should not be empty.' })
    }
    if (f.dataType === 'email' && !emailIsValid(value)) {
      formData.errors.push({ fieldName: f.name, message: titleCase(f.name) + ' is not valid.' })
    }
  })

  return formData
}

export function showErrors (errors) {
  errors.forEach((e) => {
    browser.showError(e.fieldName, e.message)
  })
}
