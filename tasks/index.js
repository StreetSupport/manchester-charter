const tasksPath = require('path')
  .join(__dirname, '.')

require('fs')
  .readdirSync(tasksPath)
  .forEach((file) => {
    require('./' + file)
  })