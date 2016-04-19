/* global */

import './common'

var ko = require('knockout')
var Model = require('./ViewYourPledge')
var model = new Model()

ko.applyBindings(model)
