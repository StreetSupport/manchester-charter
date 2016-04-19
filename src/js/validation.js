var initialise = function (koValidation) {
  koValidation.init({
    insertMessages: true,
    decorateInputElement: true,
    parseInputAttributes: true,
    errorMessageClass: 'form__error',
    errorElementClass: 'form__input--error'
  }, true)
}

var getValidationGroup = function (koValidation, formModel) {
  return koValidation.group(formModel)
}

var showErrors = function (koValidationGroup) {
  koValidationGroup.showAllMessages()
}

module.exports = {
  initialise: initialise,
  getValidationGroup: getValidationGroup,
  showErrors: showErrors
}
