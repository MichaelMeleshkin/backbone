'use strict';

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    uglify = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    livereload = require('gulp-livereload');

gulp.task('sass', function () {
    return sass("./css/sass/includes.scss")
        .on('error', sass.logError)
        .pipe(concatCss("main.css"))
        .pipe(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
        }))
        .pipe(gulp.dest('./server/public/min/css'));
});

gulp.task('js', function() {
    return gulp.src([
            "./js/lib/jquery-2.2.2.js",
            "./js/lib/jquery-ui-datepicker.js",
            "./js/lib/underscore.js",
            "./js/lib/backbone.js",
            "./js/lib/backbone.localStorage.js",
            "./js/lib/backbone-relational.js",
            "./js/src/namespace.js",
            "./js/src/app/events/**/*.js",
            "./js/src/app/models/**/*.js",
            "./js/src/app/views/**/*.js",
            "./js/src/app/collections/**/*.js",
            "./js/src/app/routers/**/*.js",
            "./js/src/main/**/*.js"
        ])
        .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./server/public/min/js'));
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('./css/sass/**/*.scss', ['sass']);
    gulp.watch([
        './js/**/*.js',
        './gulpfile.js'
    ], ['js']);
});

gulp.task('default', ['js', 'sass']);