var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var pug = require('gulp-pug');
var connect = require('gulp-connect');
var jeet = require("jeet");
var stylus = require('gulp-stylus');


console.log(jeet)

// Gulp Sass Task 
//gulp.task('sass', function() {
  //gulp.src('./scss/{,*/}*.{scss,sass}')
    //.pipe(sourcemaps.init())
    //.pipe(sass({
      //errLogToConsole: true
    //}))
    //.pipe(sourcemaps.write())
    //.pipe(gulp.dest('./dist/css'));
//})

gulp.task('stylus', function () {
    return gulp.src('./stylus/app.styl')
        .pipe(stylus({
            use: [jeet()]
        }))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('pug', function () {
    return gulp.src('./pug/**/*.pug')
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('connect', function () {
    connect.server({
        livereload: true,
        root: 'dist',
        port: process.env.PORT || 3000
    });
});

gulp.task('reload', function () {
    return gulp.src('./dist').pipe(connect.reload());
});

// Create Gulp Default Task
// ------------------------
// Having watch within the task ensures that 'sass' has already ran before watching
// 
// This setup is slightly different from the one on the blog post at
// http://www.zell-weekeat.com/gulp-libsass-with-susy/#comment-1910185635
gulp.task('default', ['stylus', 'pug', 'connect'], function () {
  //gulp.watch('./scss/{,*/}*.{scss,sass}', ['sass']);
  gulp.watch('./stylus/**/*.styl', ['stylus']);
  gulp.watch('./pug/**/*.pug', ['pug']);
  gulp.watch('./dist/**/*', ['reload']);
});

