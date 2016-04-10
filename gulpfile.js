'use strict';

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    uglify = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css');

gulp.task('sass', function () {
    return sass('./css/sass/**/*.scss')
        .on('error', sass.logError)
        .pipe(concatCss("main.css"))
        .pipe(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
        }))
        .pipe(gulp.dest('./min/css'));
});

gulp.task('js', function() {
    return gulp.src([
            "./js/lib/jquery-2.2.2.js",
            "./js/lib/underscore.js",
            "./js/lib/backbone.js",
            "./js/lib/backbone.localStorage.js",
            "./js/src/*.js"
        ])
        .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./min/js'));
});

gulp.task('default', ['js', 'sass']);