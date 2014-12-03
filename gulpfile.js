var gulp = require('gulp'),
    inlineCss = require('gulp-inline-css'),
    replace = require('gulp-replace'),
    zip = require('gulp-zip'),
    nunjucks = require('gulp-nunjucks-render'),
    newer = require('gulp-newer'),
    htmlclean = require('gulp-htmlclean');

function copy_images(dest) {
  return function() {
    gulp.src('images/*')
      .pipe(newer(dest+'/images'))
      .pipe(gulp.dest(dest+'/images'));
  }
}

gulp.task('images_to_merged', copy_images('build/merged'));
gulp.task('images_to_inlined', copy_images('build/inlined'));
gulp.task('images_to_cleaned', copy_images('build/cleaned'));

gulp.task('compile', ['images_to_merged'], function() {
  nunjucks.nunjucks.configure(['.']);
  return gulp.src('email.html')
    .pipe(nunjucks())
    .pipe(gulp.dest('build/merged'));
})

gulp.task('inline', ['compile', 'images_to_inlined'], function() {
  return gulp.src('build/merged/*.html')
    .pipe(inlineCss({
      applyStyleTags: true,
      applyLinkTags: true,
      removeStyleTags: false,
      removeLinkTags: true
    }))
    .pipe(gulp.dest('build/inlined/'));
});

gulp.task('clean', ['inline', 'images_to_cleaned'], function() {
  return gulp.src('build/inlined/*.html')
    .pipe(htmlclean())
    .pipe(gulp.dest('build/cleaned/'));
});

gulp.task('make_zip', ['clean'], function() {
  return gulp.src('build/cleaned/**/*')
        .pipe(zip('build/dist.zip'))
        .pipe(gulp.dest('.'));
});

gulp.task('watch', function() {
  gulp.watch(['*.html', 'snippets/*.html'], { maxListeners: 100 }, ['make_zip']);
});
