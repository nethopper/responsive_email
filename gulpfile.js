var gulp = require('gulp'),
    inlineCss = require('gulp-inline-css'),
    replace = require('gulp-replace'),
    zip = require('gulp-zip');

gulp.task('inline', function() {
  return gulp.src('./*.html')
    .pipe(inlineCss({
      applyStyleTags: true,
      applyLinkTags: true,
      removeStyleTags: false,
      removeLinkTags: true
    }))
    .pipe(gulp.dest('inlined/'));;
});

gulp.task('make_zip', ['inline'], function() {
  return gulp.src('inlined/*')
        .pipe(zip('inlined.zip'))
        .pipe(gulp.dest('.'));
});

gulp.task('watch', function() {
  gulp.watch('*.html', ['make_zip']);
});
