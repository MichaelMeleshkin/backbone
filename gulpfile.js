'use strict';

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');

gulp.task('sass', function () {
    return sass('./sass/**/*.scss')
        .on('error', sass.logError)
        .pipe(gulp.dest('./css'));
});

gulp.task('js', function() {
    return gulp.src('./js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./min/js'));
});

gulp.task('css', function () {
    gulp.src('./css/**/*.css')
        .pipe(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
        }))
        .pipe(gulp.dest('./min/css'));
});

gulp.task('minimize', ['js', 'css']);

gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});