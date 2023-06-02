import gulp from 'gulp';
import gulpGzip from 'gulp-gzip';
import {exec} from 'child_process';
gulp.task('webpack-build', (cb) => {

    exec('npx webpack --config webpack.prod.js', function (err, stdout, stderr) {

        if (stdout) {

            console.log(stdout);

        }

        if (stderr) {

            console.log(stderr);

        }

        cb(err);

    });

});

gulp.task('gzip', gulp.series(() => {

    return gulp.src(['dist/**/*.js', 'dist/**/*.css' ])
        .pipe(gulpGzip({append: false, level: 9}))
        .pipe(gulp.dest('dist'));

}));

gulp.task('deploy', gulp.series(
    'webpack-build',
    'gzip',
    // add upload tasks here
    (done) => {
        done();
    }));
