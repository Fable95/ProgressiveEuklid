"use strict";
const gulp = require('gulp'),
      sourcemaps = require('gulp-sourcemaps'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      htmlreplace = require('gulp-html-replace'),
      babel = require('gulp-babel');

gulp.task("js-optimize", () => {
    return gulp.src('scripts/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task("html-optimize", () => {
    return gulp.src('index.html')
        .pipe(htmlreplace({"compressed-js": '<script src="scripts/app.js" async></script>'}))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['js-optimize', "html-optimize"]);
