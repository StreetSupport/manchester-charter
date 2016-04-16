import { getSupporterCategories } from './examplePledges'

let PledgeYourSupport = function () {
  var self = this
  self.init = () => {
    self.supporterCategories = getSupporterCategories()
  }

  self.init()
}

module.exports = PledgeYourSupport
