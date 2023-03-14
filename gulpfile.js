var gulp = require('gulp'),
  sass = require('gulp-sass'),
  settings = require('./settings'),
  webpack = require('webpack'),
  browserSync = require('browser-sync').create(),
  postcss = require('gulp-postcss'),
  rgba = require('postcss-hexrgba'),
  autoprefixer = require('autoprefixer'),
  cssvars = require('postcss-simple-vars'),
  nested = require('postcss-nested'),
  cssImport = require('postcss-import'),
  mixins = require('postcss-mixins'),
  colorFunctions = require('postcss-color-function'),
  minify = require('gulp-uglify'),
  cleanCss = require('gulp-clean-css')

var sassPaths = ['./node_modules']
var postProcessors = [cssvars, cssImport, mixins, nested, rgba, colorFunctions, autoprefixer]

gulp.task('styles', function () {
  return gulp
    .src(settings.themeLocation + 'scss/style.scss')
    .pipe(sass({ includePaths: sassPaths }))
    .on('error', sass.logError)
    .pipe(postcss(postProcessors))
    .on('error', (error) => console.log(error.toString()))
    .pipe(gulp.dest(settings.themeLocation))
})

gulp.task('minify-css', function () {
  return gulp
    .src(settings.themeLocation + 'scss/style.scss')
    .pipe(sass({ includePaths: sassPaths }))
    .on('error', sass.logError)
    .pipe(postcss(postProcessors))
    .on('error', (error) => console.log(error.toString()))
    .pipe(cleanCss())
    .on('error', (error) => console.log(error.toString()))
    .pipe(gulp.dest(settings.themeLocation))
})

gulp.task('minify-js', function () {
  return gulp
    .src(settings.themeLocation + 'dist/scripts.js')
    .pipe(minify())
    .pipe(gulp.dest(settings.themeLocation + 'dist'))
})

gulp.task('minify', gulp.parallel('minify-js', 'minify-css'))

gulp.task('scripts', function (callback) {
  webpack(require('./webpack.config.js'), function (err, stats) {
    console.log(stats.toString())

    if (err) {
      console.log(err.toString())
    }

    callback()
  })
})

gulp.task('watch', function () {
  browserSync.init({
    notify: false,
    proxy: settings.urlToPreview,
    ghostMode: false,
  })

  gulp.watch(settings.themeLocation + '/*.php', function () {
    browserSync.reload()
  })
  gulp.watch(
    [settings.themeLocation + 'scss/**/*.css', settings.themeLocation + 'scss/**/*.scss'],
    gulp.parallel('waitForStyles')
  )
  gulp.watch(
    [settings.themeLocation + 'ts/**/*.ts*', settings.themeLocation + 'ts/scripts.ts'],
    gulp.parallel('waitForScripts')
  )
})

gulp.task(
  'waitForStyles',
  gulp.series('styles', function () {
    return gulp.src(settings.themeLocation + 'style.css').pipe(browserSync.stream())
  })
)

gulp.task(
  'waitForScripts',
  gulp.series('scripts', function (cb) {
    browserSync.reload()
    cb()
  })
)
