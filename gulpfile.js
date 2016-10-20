var gulp = require('gulp');
var ts = require('gulp-typescript');
var babel = require('gulp-babel');


gulp.task('build', function(){
    var tsProject = ts.createProject('./tsconfig.json');
    return gulp.src(['./src/index.tsx'])
        .pipe(tsProject())
        .pipe(gulp.dest('./dist'))
})