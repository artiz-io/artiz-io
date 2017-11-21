'use strict';

const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const svgmin = require('gulp-svgmin');
const autoprefixer = require('autoprefixer');
const bower = require('gulp-bower');
const uglify = require('gulp-uglify');
const replace = require('gulp-token-replace');

// css sass and autoprefixer
gulp.task('css', function() {
  gulp.src('./src/css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'));
});

// minify htmlmin
gulp.task('htmlmin', function() {
  return gulp.src(['./src/*.html', './src/**/*.html'])
    .pipe(replace({
      global: {
        token: new Date().getTime()
      }
    }))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('./dist'));
});

// minify images
gulp.task('imagemin', function() {

  return gulp.src(['src/images/*', 'src/images/*/**', '!src/images/*.svg', '!src/images/*/**.svg'])
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))

});

// svgmin
gulp.task('svgmin', function() {

  return gulp.src(['src/images/*.svg', 'src/images/*/**.svg'])
    .pipe(svgmin())
    .pipe(gulp.dest('dist/images'))

});


// uglify js
gulp.task('uglify', function() {

  return gulp.src(['src/js/*.js', 'src/js/*/**.js'])
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))

});

// copy
gulp.task('copy', function() {

  return gulp.src(['src/*.png', 'src/*.ico', 'src/CNAME'])
    .pipe(gulp.dest('./dist'))

});

// bower
gulp.task('bower', function() {
  return bower();
  //.pipe(gulp.dest('dist/bower_components'));
});

// tasks
gulp.task('build', ['bower', 'htmlmin', 'imagemin', 'svgmin', 'css', 'uglify', 'copy']);
gulp.task('default', ['watch', 'build']);
gulp.task('watch', function() {
  gulp.watch(['./src/*.html', './src/**/*.html'], ['htmlmin']);
  gulp.watch(['src/images/*', 'src/images/*/**'], ['imagemin']);
  gulp.watch(['./src/css/**/*.scss'], ['css']);
  gulp.watch(['src/js/*.js', 'src/js/*/**.js'], ['uglify']);
  gulp.watch(['src/*.png', 'src/*.ico', 'src/CNAME'], ['copy']);
});