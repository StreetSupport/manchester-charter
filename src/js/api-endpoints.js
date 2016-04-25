var env = require('./env')

var local = 'https://localhost:44302' // eslint-disable-line
var dev = 'https://dev-api-streetsupport.azurewebsites.net' // eslint-disable-line
var staging = 'https://staging-api-streetsupport.azurewebsites.net' // eslint-disable-line
var live = 'https://live-api-streetsupport.azurewebsites.net' // eslint-disable-line

var envs = [local, dev, staging, live]

function p (addr) {
  return envs[env] + addr
}

module.exports = {
  pledges: p('/v1/approved-charter-supporters'),
  totalPledges: p('/v1/approved-charter-supporters/total'),
  makeAPledge: p('/v1/charter-supporters'),
  actionGroups: p('/v1/action-groups')
}
