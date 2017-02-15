"use strict";
const gulp = require('gulp'),
      sourcemaps = require('gulp-sourcemaps'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      babel = require('gulp-babel');

gulp.task('default', () => {
    return gulp.src('scripts/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});
