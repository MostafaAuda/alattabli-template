const gulp = require('gulp'),
      autoprefixer = require('gulp-autoprefixer'),
      sass = require('gulp-sass'),
      concat = require('gulp-concat'),
      cleanCSS = require('gulp-clean-css'),
      cache = require('gulp-cache'),
      imagemin = require('gulp-imagemin'),
      terser = require('gulp-terser-js'),
      clean = require('gulp-clean'),
      browserSync = require('browser-sync').create(),
      fileinclude = require('gulp-file-include');

      const { series, parallel } = require('gulp');
      sass.compiler = require('node-sass');

function clear(cb) {
  return gulp.src('dist/', {read: false, allowEmpty: true})
  .pipe(clean())
  cb();
}

function css(cb) {
  return gulp.src('app/assets/css/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('style.css'))
  .pipe(autoprefixer())
  .pipe(cleanCSS())
  .pipe(gulp.dest('dist/assets/css'))
  .pipe(browserSync.stream());
  cb();
}

function js(cb) {
  return gulp.src('app/assets/js/*.js')
  .pipe(concat('main.js')) 
  .pipe(terser({mangle: {toplevel: true}}))
  .on('error', function (error) {this.emit('end')})  
  .pipe(gulp.dest('dist/assets/js'));
  cb();
}

function plugins(cb) {
  return gulp.src('app/assets/css/plugins/**/*')
  .pipe(gulp.dest('dist/assets/css/plugins'));
  cb();
}

function vendors(cb) {
  return gulp.src('app/assets/vendors/**/*')
  .pipe(gulp.dest('dist/assets/vendors'));
  cb();
}

function cleanassets(cb) {
  return gulp.src('dist/assets/img', {read: false, allowEmpty: true})
  .pipe(clean())
  cb();
}

function clearcache(cb) {
  cache.clearAll()
  cb();
}

function images(cb) {
  // return gulp.src('app/assets/img/**/*.{jpg,png,svg,ico}')
  return gulp.src('app/assets/img/**/*')
  .pipe(cache(
    imagemin(),
    { name: 'images' }
  ))
  .pipe(gulp.dest('dist/assets/img'));
  cb();
}

function pages(cb) {
  return gulp.src('app/pages/*')
  .pipe(fileinclude({
    prefix: '@@',
    basepath: '@file'
  }))
  .pipe(gulp.dest('dist/'));
  cb();
}

function watch(cb) {   
  browserSync.init({
    server: {
        baseDir: "dist/"
    }
  });;

  // Watched files paths
  gulp.watch('app/assets/css/*.scss', css);
  gulp.watch('app/assets/js/*.js', js).on('change', browserSync.reload);
  gulp.watch('app/assets/img/**/*', gulp.series(cleanassets, images));
  gulp.watch('app/pages/*.html', pages).on('change', browserSync.reload);
  cb();
}

exports.css = css;
exports.js = js;
exports.plugins = plugins;
exports.vendors = vendors;
exports.cleanassets = cleanassets;
exports.clearcache = clearcache;
exports.images = images;
exports.pages = pages;
exports.watch = watch;

exports.default = series(clear, parallel(css, js, vendors, plugins, images, pages), watch);

exports.build = series(clear, parallel(css, js, vendors, plugins, images, pages));







