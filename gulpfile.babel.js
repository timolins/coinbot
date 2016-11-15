import {spawn} from 'child_process'

import gulp from 'gulp'
import babel from 'gulp-babel'
import cache from 'gulp-cached'

let node

const paths = [
  'commands/**/*',
  'utils/**/*',
  'bot/**/*'
]

gulp.task('transpile', () => {
  return gulp.src(paths, {base: '.'})
  .pipe(cache('transpile'))
  .pipe(babel())
  .pipe(gulp.dest('dist'))
})

gulp.task('server', () => {
  if (node) {
    node.kill()
  }
  node = spawn('node', ['dist/bot/index.js'], {stdio: 'inherit'})
  node.on('close', code => {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...')
    }
  })
})

gulp.task('watch', () => {
  return gulp.watch(paths, ['transpile', 'server'])
})

gulp.task('default', ['transpile', 'watch', 'server'])
