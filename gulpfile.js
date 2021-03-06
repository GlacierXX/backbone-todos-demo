var gulp = require('gulp'),
    connect = require('gulp-connect');
gulp.task('server', function () {
  connect.server({
    port: '1234',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('**/*.html')
      .pipe(connect.reload());
});
gulp.task('js', function () {
  gulp.src('**/*.js')
      .pipe(connect.reload());
});
gulp.task('css', function () {
  gulp.src('css/*.css')
      .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['**/*.html'], ['html']);
  gulp.watch(['**/*.js'], ['js']);
  gulp.watch(['css/*.css'], ['css']);
});

gulp.task('default', ['server', 'watch']);
