var env = require('./env')

var local = 'http://localhost:55881' // eslint-disable-line
var dev = 'https://dev-api-streetsupport.azurewebsites.net' // eslint-disable-line
var staging = 'https://staging-api-streetsupport.azurewebsites.net' // eslint-disable-line
var live = 'https://live-api-streetsupport.azurewebsites.net' // eslint-disable-line

var envs = [local, dev, staging, live]

function p (addr) {
  return envs[env] + addr
}

module.exports = {
  prefix: p,
  pledges: p('/v1/approved-charter-supporters'),
  pledgesHal: p('/v2/approved-charter-supporters'),
  makeAPledge: p('/v1/charter-supporters'),
  actionGroups: p('/v1/action-groups')
}
