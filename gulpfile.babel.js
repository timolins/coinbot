import gulp from 'gulp'
import babel from 'gulp-babel'
import cache from 'gulp-cached'

const paths = [
  'modes/**/*',
  'utils/**/*',
  'bot.js'
]

gulp.task('transpile', () => {
  return gulp.src(paths, {base: '.'})
  .pipe(cache('transpile'))
  .pipe(babel())
  .pipe(gulp.dest('dist'))
})

gulp.task('default', () => gulp.watch(paths, ['transpile']))
