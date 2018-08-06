import gulp from 'gulp'
import request from 'request'
import runSequence from 'run-sequence'

import config from '../foley.json'
import endpoints from '../src/js/api-endpoints'
import { newFile } from './fileHelpers'

const pagesRoot = `${config.paths.pages}`

let cities = []

gulp.task('l-get-cities', (callback) => {
  request(endpoints.cities, function (err, res, body) {
    cities = JSON.parse(body)
    callback()
  })
})

gulp.task('l-generate-nav-variables', () => {
  const srcFile = `${config.paths.scss}/modules/`
  const cityOutput = cities
    .map((c) => `${c.id}`)
    .join(' ')

  return newFile('_generated-location-nav-variables.scss', `$generated-locations-for-nav: ${cityOutput}`)
    .pipe(gulp.dest(srcFile))
})


gulp.task('generate-location-home-pages', (callback) => {
  runSequence(
    'l-get-cities',
    'l-generate-nav-variables',
    callback
  )
})
