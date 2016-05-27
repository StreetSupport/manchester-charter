/* global */

import './common'

var ko = require('knockout')
var Model = require('./ActionGroups')
var model = new Model()

ko.applyBindings(model)
