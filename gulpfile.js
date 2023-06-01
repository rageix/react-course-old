import gulp from 'gulp';
import browserSync from 'browser-sync';
import {deleteAsync} from 'del';
import batch from 'gulp-batch';
import gulpPlumber from 'gulp-plumber';
import gulpSourcemaps from 'gulp-sourcemaps';
import gulpAutoprefixer from 'gulp-autoprefixer';
import gulpRename from 'gulp-rename';
import gulpCacheBust from 'gulp-cache-bust';
import gulpPostcss from 'gulp-postcss';
import gulpHtmlmin from 'gulp-htmlmin';
import gulpReplace from 'gulp-replace';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';

const sass = gulpSass(dartSass);

const reload = browserSync.reload;

gulp.task('html', gulp.series(() => {
    return gulp.src('static/*.html')
        .pipe(gulpPlumber())
        .pipe(gulpUsemin({
            path: './',
        }))
        .pipe(gulp.dest('build'));
}));

gulp.task('clean', gulp.series(() => {
    return deleteAsync(['.tmp', 'build'], {force: true})
}));

gulp.task('delete-checksums', gulp.series(() => {
    return deleteAsync(['.checksums'], {force: true})
}));

gulp.task('copy-static', gulp.series(() => {
    return gulp.src([
        'app/**/*.css',
    ], {
        dot: true
    }).pipe(gulp.dest('build'));
}));

gulp.task('styles', () => {
    return gulp.src(['static/styles/*.scss', '!static/styles/_*'])
        .pipe(gulpPlumber())
        .pipe(gulpSourcemaps.init())
        .pipe(sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.']
        }).on('Error', sass.logError))
        .pipe(gulpPlumber())
        .pipe(gulpAutoprefixer())
        .pipe(gulpSourcemaps.write())
        .pipe(gulp.dest('.tmp/static/styles'))
        .pipe(reload({stream: true}));
});

gulp.task('styles-build', gulp.series(() => {
    return gulp.src(['static/styles/*.scss', '!static/styles/_*'])
        .pipe(gulpPlumber())
        .pipe(sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.']
        }).on('Error', sass.logError))
        .pipe(gulpAutoprefixer())
        .pipe(gulp.dest('.tmp/static/styles'));
}));

gulp.task('copy-tmp-styles', gulp.series('styles-build', () => {
    return gulp.src([
        '.tmp/**/*.css',
    ], {
        dot: true
    }).pipe(gulp.dest('build'));
}));

gulp.task('fonts', () => {
    return gulp.src(['node_modules/@fortawesome/fontawesome-free/webfonts/*'])
        .pipe(gulp.dest('.tmp/static/fonts/fontawesome6'));
});

gulp.task('fonts-build', gulp.series(() => {
    return gulp.src(['node_modules/@fortawesome/fontawesome-free/webfonts/*'])
        .pipe(gulp.dest('.tmp/static/fonts/fontawesome6'))
        .pipe(gulp.dest('build/static/fonts/fontawesome6'));
}));

// clean up files and folders we don't need for deploy
gulp.task('clean-up', gulp.series(() => {

    return deleteAsync([]);

}));

gulp.task('browsersync-reload', (cb) => {

    reload();
    cb();

})

gulp.task('cachebust', gulp.series(() => {
    return gulp.src([
        './build/**/*.html',
    ])
        .pipe(gulpPlumber())
        .pipe(gulpCacheBust({
            type: 'timestamp'
        }))
        .pipe(gulp.dest('./build'));
}));

gulp.task('cssnano', gulp.series(() => {
    return gulp.src([
        './build/**/*.css',
    ])
        .pipe(gulpPlumber())
        // see .postcssrc and .browserlistrc to set options
        .pipe(gulpPostcss())
        .pipe(gulp.dest('./build'));
}));

gulp.task('htmlmin', gulp.series(() => {
    return gulp.src([
        './build/**/*.html',
    ])
        .pipe(gulpPlumber())
        .pipe(gulpHtmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            ignoreCustomFragments: [
                /{%.*%}/,
                /<\?[\s\S]*?\?>/
            ]
        }))
        .pipe(gulp.dest('./build'));
}));

gulp.task('serve', gulp.series('styles', 'fonts', () => {

    browserSync({
        notify: false,
        https: false,
        ghostMode: false,
        logLevel: "debug",
        reloadDebounce: 2000,
        port: 8080,
        open: 'external',
        server: {
            baseDir: "static",
            directory: true
        },
        serveStatic: [
            {
                route: '/',
                dir: './static'
            },
            {
                route: '/node_modules',
                dir: './node_modules'
            },
            {
                route: '/.tmp',
                dir: ['./.tmp/']
            }
        ]
    });

    gulp.watch([
        'static/*.html',
        'static/images/**/*',
    ]).on('change', reload);

    gulp.watch('static/styles/**/*.scss',
        batch((events, cb) => {

            events.on('data', gulp.series('styles')).on('end', cb);

        }));

}));

gulp.task('serve-build', gulp.series(() => {
    // sets up browser sync
    browserSync({
        notify: false,
        https: true,
        ghostMode: false,
        logLevel: "debug",
        port: 8080,
        // host: 'local.waypointconverts.com',
        open: 'external',
        cors: true,
        serveStatic: [
            {
                route: '/node_modules',
                dir: './node_modules'
            },
            {
                route: '/.tmp',
                dir: ['./.tmp/']
            },
            {
                route: '/static',
                dir: ['./build/static']
            },
        ]
    });
}));

gulp.task('rename-assets', gulp.series(() => {

    return gulp.src(['build/**/*.css', 'build/**/*-bundle.js'])
        .pipe(gulpRename((path) => {
            path.basename += '-' + timestamp;
        }))
        .pipe(gulp.dest('build/'));

}));

gulp.task('replace-assets', gulp.series(() => {

    return gulp.src([
        'build/*.html',
    ])
        .pipe(gulpReplace('admin.css', `admin-${timestamp}.css`))
        .pipe(gulpReplace('consumer.css', `consumer-${timestamp}.css`))
        .pipe(gulp.dest('build/'));

}));

gulp.task('build', gulp.series(
    'clean',
    'copy-static',
    'copy-tmp-styles',
    'html',
    'htmlmin',
    'cssnano',
    'rename-assets',
    'replace-assets',
    (done) => {
        done();
    }));