import gulp from 'gulp'
import request from 'request'
import runSequence from 'run-sequence'

import config from '../foley.json'
import endpoints from '../src/js/api-endpoints'
import { newFile } from './fileHelpers'

let cities = []

gulp.task('l-get-cities', (callback) => {
  request(endpoints.cities, function (err, res, body) {
    cities = JSON.parse(body)
      .filter((c) => c.isPublic)
    callback()
  })
})

gulp.task('l-generate-location-hub-nav', () => {
  const srcFile = `${config.paths.partials}/nav/`
  console.log(cities)
  const navOutput = cities
    .sort((a, b) => {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    })
    .map((c) => `<li class="nav__item nav__item--sub-item nav__item--${c.id}" data-location="${c.id}"><a href="https://streetsupport.net/${c.id}">${c.name}</a></li>`)
    .join(' ')

  return newFile('header-locations.hbs', navOutput)
    .pipe(gulp.dest(srcFile))
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
    'l-generate-location-hub-nav',
    callback
  )
})
