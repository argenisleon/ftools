//Referencia https://blog.engineyard.com/2014/frontend-dependencies-management-part-2

var gulp = require('gulp');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var rimraf = require('gulp-rimraf');
//var del = require('del');

gulp.task('minify', function() {
    return gulp.src('src/index.src.html')
        .pipe(usemin({
            assetsDir: 'src/',
            //outputRelativePath:'dist/',
            css: [minifyCss(), 'concat'],
            js: [uglify(), 'concat']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['minify'], function() {
    return gulp.src('dist/index.src.html')
        .pipe(rimraf())
        .pipe(rename("index.html"))
        .pipe(gulp.dest('dist'));
});
