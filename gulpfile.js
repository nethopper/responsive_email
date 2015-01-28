var gulp = require('gulp'),
    inlineCss = require('gulp-inline-css'),
    replace = require('gulp-replace'),
    zip = require('gulp-zip'),
    nunjucks = require('gulp-nunjucks-render'),
    newer = require('gulp-newer'),
    htmlclean = require('gulp-htmlclean');

var opts = {
  inline: {
    applyStyleTags: true,
    applyLinkTags: true,
    removeStyleTags: false,
    removeLinkTags: true
  }};

function copy_images(dest) {
  return function() {
    return gulp.src('images/*')
      .pipe(newer(dest+'/images'))
      .pipe(gulp.dest(dest+'/images'));
  }
}

gulp.task('images_to_dist', copy_images('build/dist'));

gulp.task('dist', ['images_to_dist'], function() {
  nunjucks.nunjucks.configure(['.']);
  return gulp.src('email.html')
    .pipe(nunjucks())
    .pipe(inlineCss(opts.inline))
    .pipe(htmlclean())
    .pipe(gulp.dest('build/dist/'))
});

gulp.task('make_zip', ['dist'], function() {
  return gulp.src('build/dist/**/*')
        .pipe(zip('build/dist.zip'))
        .pipe(gulp.dest('.'));
});

gulp.task('default', function() {
  gulp.watch(['*.html', 'snippets/*.html'], { maxListeners: 100 }, ['make_zip']);
});
