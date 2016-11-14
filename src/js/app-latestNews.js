/* global */

import './common'

let ko = require('knockout')

const Model = require('./ViewPledges')

ko.applyBindings(new Model())

