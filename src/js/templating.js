var Hogan = require('hogan.js')

export function render (templateId, data, output, callback) {
  var theTemplate = document.getElementById(templateId).innerHTML
  var compileTemplate = Hogan.compile(theTemplate)
  document.getElementById(output).innerHTML = compileTemplate.render(data)
  callback()
}
