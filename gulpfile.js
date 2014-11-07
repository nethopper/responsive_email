var gulp = require('gulp'),
    inlineCss = require('gulp-inline-css'),
    replace = require('gulp-replace'),
    zip = require('gulp-zip'),
    nunjucks = require('gulp-nunjucks-render');

gulp.task('compile', function() {
  nunjucks.nunjucks.configure(['.']);
  return gulp.src('email.html')
    .pipe(nunjucks())
    .pipe(gulp.dest('merged'));
})

gulp.task('inline', ['compile'], function() {
  return gulp.src('merged/*.html')
    .pipe(inlineCss({
      applyStyleTags: true,
      applyLinkTags: true,
      removeStyleTags: false,
      removeLinkTags: true
    }))
    .pipe(gulp.dest('inlined/'));
});

gulp.task('make_zip', ['inline'], function() {
  return gulp.src('inlined/*')
        .pipe(zip('inlined.zip'))
        .pipe(gulp.dest('.'));
});

gulp.task('watch', function() {
  gulp.watch(['*.html', 'snippets/*.html'], ['make_zip']);
});
