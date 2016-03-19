
var uglifycss = require('gulp-uglifycss');
  gulp = require('gulp'),
  gulpWatch = require('gulp-watch'),
  gulpBatch = require('gulp-batch'),
  gulpCopy = require('gulp-copy'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat');

gulp.task('vendorScripts', function () {
  return gulp.src([
      './node_modules/codemirror/lib/codemirror.js',
      './node_modules/codemirror/keymap/sublime.js',
      './node_modules/codemirror/mode/css/css.js',
      './node_modules/codemirror/mode/xml/xml.js',
      './node_modules/codemirror/mode/htmlmixed/htmlmixed.js',
      './node_modules/underscore/underscore.js',
      './node_modules/jquery/dist/jquery.min.js'
      //'./node_modules/zepto/zepto.min.js'
    ])
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('vendorStyles', function () {
  return gulp.src([
      './node_modules/normalize.css/normalize.css',
      './node_modules/animate.css/animate.css',
      './node_modules/flexboxgrid/dist/flexboxgrid.css',
      './node_modules/codemirror/lib/codemirror.css',
      './node_modules/codemirror/theme/tomorrow-night-eighties.css'
    ])
    .pipe(concat('vendor.min.css'))
    .pipe(uglifycss())
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('build', ['vendorScripts', 'vendorStyles']);
gulp.task('default', ['build']);