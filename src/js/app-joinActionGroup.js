/* global */

import './common'

var ko = require('knockout')
var Model = require('./JoinActionGroup')
var model = new Model()

ko.applyBindings(model)

import accordion from './accordion.js'
accordion.init(false, -1, model)

document.querySelector('form')
  .addEventListener('submit', (event) => {
    event.preventDefault()
  })
