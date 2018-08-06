import gulp from 'gulp'
import request from 'request'
import runSequence from 'run-sequence'

import config from '../foley.json'
import endpoints from '../src/js/api-endpoints'
import { newFile } from './fileHelpers'

let categories = []
let cities = []

gulp.task('getServiceCategories', (callback) => {
  request(endpoints.serviceCategories, function (err, res, body) {
    categories = JSON.parse(body)
      .sort((a, b) => {
        if (a.sortOrder < b.sortOrder) return 1
        if (a.sortOrder > b.sortOrder) return -1
        return 0
      })
      .map((c) => {
        return {
          key: c.key,
          name: c.name
        }
      })
    callback()
  })
})

gulp.task('getCities', (callback) => {
  request(endpoints.cities, function (err, res, body) {
    cities = JSON.parse(body)
    callback()
  })
})

gulp.task('generate-nav-links', () => {
  const srcFile = `${config.paths.partials}/nav/`
  const output = categories
    .map((c) => {
      switch(c.key) {
        case 'accom':
          return `<li class="nav__item nav__item--find-help-${c.key}"><a href="/find-help/accommodation/">${c.name}</a></li>`
        case 'meals':
        case 'dropin':
        case 'foodbank':
          return `<li class="nav__item nav__item--find-help-${c.key}"><a href="/find-help/${c.key}/timetable/">${c.name}</a></li>`
        default:
          return `<li class="nav__item nav__item--find-help-${c.key}"><a href="/find-help/${c.key}/">${c.name}</a></li>`
      }
    })
    .join('')

  return newFile('service-cats.hbs', output)
    .pipe(gulp.dest(srcFile))
})

gulp.task('generate-nav-variables', () => {
  const srcFile = `${config.paths.scss}/modules/`
  const catOutput = categories
    .map((c) => `find-help-${c.key}`)
    .join(' ')

  const cityOutput = cities
    .map((c) => `${c.id}-advice`)
    .join(' ')

  return newFile('_generated-variables.scss', `$generated-nav-pages: ${catOutput} ${cityOutput}`)
    .pipe(gulp.dest(srcFile))
})
gulp.task('generate-service-pages', (callback) => {
  runSequence(
    'getServiceCategories',
    'getCities',
    'generate-nav-links',
    'generate-nav-variables',
    callback
  )
})
