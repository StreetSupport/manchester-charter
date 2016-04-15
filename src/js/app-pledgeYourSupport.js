/* global */

import './common'

import accordion from './accordion.js'
import { render } from './templating'
import { getSupporterCategories } from './examplePledges'

let callback = () => {
  document.querySelector('form')
    .addEventListener('submit', (event) => {
      event.preventDefault()
    })
  accordion.init()
}
let data = {
  categories: getSupporterCategories()
}
console.log(data)
render('js-example-pledges-tpl', data, 'js-example-pledges-output', callback)
