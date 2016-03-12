

var uglifycss = require('gulp-uglifycss');
var gulp = require('gulp');
var gulpLess = require('gulp-less');
var gulpWatch = require('gulp-watch');
var gulpBatch = require('gulp-batch');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var path = require('path');

gulp.task('less', function () {
  return gulp.src('./assets/less/**/*.less')
    .pipe(gulpLess())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function () {
  gulpWatch('./assets/less/**/*.less', gulpBatch(function (events, done) {
    gulp.start('less', done);
  }));
});

gulp.task('vendorScripts', function () {
  return gulp.src([
      './node_modules/zepto/zepto.min.js'
    ])
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('vendorStyles', function () {
  return gulp.src([
      './node_modules/normalize.css/normalize.css'
    ])
    .pipe(concat('vendor.min.css'))
    .pipe(uglifycss())
    .pipe(gulp.dest('./public/css/'));
})

gulp.task('build', ['less', 'vendorScripts', 'vendorStyles']);
gulp.task('default', ['build']);