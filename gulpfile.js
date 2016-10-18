var gulp = require('gulp');
var react = require('gulp-react');

gulp.task('jsx', function () {
  return gulp.src('./scripts/*.jsx')
    .pipe(react())
    .pipe(gulp.dest('./scripts'));
});

