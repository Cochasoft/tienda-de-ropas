var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var connect = require('gulp-connect-php');
var { exec } = require('child_process');

//definir tarea para sass
gulp.task('sass', function(done) {
    exec('sass --style compressed --no-source-map scss:css', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        done(err);
    });
});

gulp.task('watch', gulp.series('sass', function(done) {
    gulp.watch('./scss/**/*.scss', gulp.series('sass'));
    gulp.watch('./css/**/*.css').on('change', reload);
    gulp.watch('./js/**/*.js').on('change', reload);
    gulp.watch('./templates/**/*.html.twig').on('change', browserSync.reload);
    connect.server({}, function() {
        browserSync.init({
            proxy: 'http://sistema-colegio-bioquimicos.docksal/'
        });
    });
    done();
}));