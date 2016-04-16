/* global */

import './common'

var ko = require('knockout')
var Model = require('./PledgeYourSupport')

ko.applyBindings(new Model())

import accordion from './accordion.js'
accordion.init()

document.querySelector('form')
  .addEventListener('submit', (event) => {
    event.preventDefault()
  })
