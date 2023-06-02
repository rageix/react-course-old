import gulp from 'gulp';
import browserSync from 'browser-sync';
import {deleteAsync} from 'del';
import batch from 'gulp-batch';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import gulpOnce from 'gulp-once';
import gulpPlumber from 'gulp-plumber';
import gulpSourcemaps from 'gulp-sourcemaps';
import gulpAutoprefixer from 'gulp-autoprefixer';
import gulpBabel from 'gulp-babel';
import gulpUsemin from 'gulp-usemin';
import gulpRename from 'gulp-rename';
import gulpCacheBust from 'gulp-cache-bust';
import gulpPostcss from 'gulp-postcss';
import gulpHtmlmin from 'gulp-htmlmin';
import gulpReplace from 'gulp-replace';
import {exec} from 'child_process';

const reload = browserSync.reload;
const sass = gulpSass(dartSass);
const timestamp = String(Date.now());

console.log('timestamp', timestamp);
gulp.task('apply-prod-environment', (done) => {

    process.env.NODE_ENV = 'production';
    done();

});

gulp.task('clean', gulp.series(() => {
    return deleteAsync(['.tmp', 'build'], {force: true})
}));

gulp.task('delete-checksums', gulp.series(() => {
    return deleteAsync(['.checksums'], {force: true})
}));

gulp.task('copy-static', gulp.series(() => {
    return gulp.src([
        'app/**/*.css',
        'app/**/*.js',
    ], {
        dot: true
    }).pipe(gulp.dest('build'));
}));

gulp.task('scripts-build', gulp.series(() => {
    return gulp.src('static/scripts/**/*.js?(x)')
        .pipe(gulpPlumber())
        .pipe(gulpBabel({presets: ["@babel/preset-env", "@babel/preset-react"]}))
        .pipe(gulp.dest('.tmp/static/scripts'));
}));

gulp.task('typescripts', (cb) => {

    exec('npx tsc --project tsconfig.dev.json', function (err, stdout, stderr) {

        if (stdout) {

            console.log(stdout);

        }

        if (stderr) {

            console.log(stderr);

        }

        cb(err);

    });

});

gulp.task('typescripts-build', (cb) => {

    exec('npx tsc', function (err, stdout, stderr) {

        if (stdout) {

            console.log(stdout);

        }

        if (stderr) {

            console.log(stderr);

        }

        cb(err);

    });

});

gulp.task('webpack-build', (cb) => {

    exec('npx webpack --config webpack.config.js', function (err, stdout, stderr) {

        if (stdout) {

            console.log(stdout);

        }

        if (stderr) {

            console.log(stderr);

        }

        cb(err);

    });

});

gulp.task('webpack-navigator-launcher-build', (cb) => {

    exec('npx webpack --config webpack.navigator-launcher.config.js', function (err, stdout, stderr) {

        if (stdout) {

            console.log(stdout);

        }

        if (stderr) {

            console.log(stderr);

        }

        cb(err);

    });

});

gulp.task('styles-consumer-bootstrap', () => {
    return gulp.src(['static/styles/consumer-bootstrap.scss'])
        .pipe(gulpPlumber())
        .pipe(gulpSourcemaps.init())
        .pipe(sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.']
        }).on('Error', sass.logError))
        .pipe(gulpAutoprefixer())
        .pipe(gulpSourcemaps.write())
        .pipe(gulp.dest('.tmp/static/styles'))
        .pipe(reload({stream: true}));
});

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


gulp.task('scripts', () => {
    return gulp.src('static/scripts/**/*.js?(x)')
        .pipe(gulpOnce('scripts'))
        .pipe(gulpPlumber())
        .pipe(gulpSourcemaps.init())
        .pipe(gulpBabel({presets: ["@babel/preset-env", "@babel/preset-react"]}))
        .pipe(gulpSourcemaps.write('.'))
        .pipe(gulp.dest('.tmp/static/scripts'));
});

gulp.task('scripts-dev', () => {
    return gulp.src('static/scripts/**/*.js?(x)')
        .pipe(gulpOnce('scripts'))
        .pipe(gulpPlumber())
        .pipe(gulpSourcemaps.init())
        .pipe(gulpBabel({presets: ["@babel/preset-env", "@babel/preset-react"]}))
        .pipe(gulpSourcemaps.write('.'))
        .pipe(gulp.dest('.tmp/static/scripts'));
});

gulp.task('html', gulp.series(() => {
    return gulp.src('static/*.html')
        .pipe(gulpPlumber())
        .pipe(gulpUsemin({
            path: './',
        }))
        .pipe(gulp.dest('build'));
}));

gulp.task('images-build', gulp.series(() => {
    return gulp.src('static/images/**/*')
        .pipe(gulp.dest('build/static/images'));
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

    return deleteAsync([
        'build/static/plugins/',
        'build/static/scripts/index.js',
    ])

}));

gulp.task('copy-webpack-templates', () => {

    return gulp.src([
        '.tmp/static/scripts/*.html',
    ], {
        dot: true
    }).pipe(gulp.dest('static/'));

});

gulp.task('webpack', (cb) => {

    exec('npx webpack --config webpack.dev.config.js', function (err, stdout, stderr) {

        if (stdout) {

            console.log(stdout);

        }

        if (stderr) {

            console.log(stderr);

        }

        cb(err);

    });

});

gulp.task('es6-app', gulp.series('webpack'));

gulp.task('browsersync-reload', (cb) => {

    reload();
    cb();

});

gulp.task('html-dev', gulp.series('webpack', 'browsersync-reload'));

gulp.task('es6', gulp.series('typescripts', 'es6-app', 'browsersync-reload'));

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

gulp.task('rebuild', gulp.series('styles', 'scripts', 'es6', 'fonts'));

// serves .tmp directory
// great if you don't need to proxy to backend
gulp.task('serve-dir', gulp.series('styles', 'scripts', 'es6', 'fonts', () => {

    browserSync({
        notify: false,
        https: true,
        ghostMode: false,
        logLevel: "debug",
        reloadDebounce: 2000,
        port: 8080,
        host: 'localhost',
        open: 'external',
        cors: true,
        server: {
            baseDir: "./.tmp/static",
            directory: true
        },
    });

    gulp.watch([
        './static/images/**/*',
        './static/fonts/**/*',
    ]).on('change', reload);

    gulp.watch([
            './static/**/*.html',
            './static/**/*.htm',
        ],
        batch((events, cb) => {

            events.on('data', gulp.series('html-dev')).on('end', cb);

        }));

    gulp.watch('static/styles/**/*.scss',
        batch((events, cb) => {

            events.on('data', gulp.series('styles')).on('end', cb);

        }));

    gulp.watch('static/scripts/**/*.js', batch((events, cb) => {

        events.on('data', gulp.series('scripts', 'es6')).on('end', cb);

    }));

    gulp.watch('static/scripts/**/*.ts?(x)', batch((events, cb) => {

        events.on('data', gulp.series('scripts', 'es6')).on('end', cb);

    }));

}));

// serves from a proxy directory
// great if you don't need to proxy to backend
// proxies to port 8081
gulp.task('serve-proxy', gulp.series('styles', 'scripts', 'es6', 'fonts', () => {

    browserSync({
        notify: false,
        https: true,
        ghostMode: false,
        logLevel: "debug",
        reloadDebounce: 2000,
        proxy: {
            target: 'localhost:8081',
            ws: true,
            cookies: {
                stripDomain: false
            },
            proxyReq: [
                function (proxyReq, req, res) {

                    let ip = '127.0.0.1';
                    let host = 'localhost:8081';
                    let proto = 'https';

                    proxyReq.setHeader('X-Forwarded-For', ip);
                    proxyReq.setHeader('X-Forwarded-Host', host);
                    proxyReq.setHeader('X-Forwarded-Proto', proto);

                }
            ],
        },
        port: 8080,
        host: 'localhost',
        open: 'external',
        cors: true,
    });

    gulp.watch([
        './static/images/**/*',
        './static/fonts/**/*',
    ]).on('change', reload);

    gulp.watch([
            './static/**/*.html',
            './static/**/*.htm',
        ],
        batch((events, cb) => {

            events.on('data', gulp.series('html-dev')).on('end', cb);

        }));

    gulp.watch('static/styles/**/*.scss',
        batch((events, cb) => {

            events.on('data', gulp.series('styles')).on('end', cb);

        }));

    gulp.watch('static/scripts/**/*.js', batch((events, cb) => {

        events.on('data', gulp.series('scripts', 'es6')).on('end', cb);

    }));

    gulp.watch('static/scripts/**/*.ts?(x)', batch((events, cb) => {

        events.on('data', gulp.series('scripts', 'es6')).on('end', cb);

    }));

}));

// runs serve but will delete the3 checksums file
// takes a lot longer to load but guaranteed to be "fresh"
gulp.task('serve-fresh-dir', gulp.series('delete-checksums', 'serve-dir'));
gulp.task('serve-fresh-proxy', gulp.series('delete-checksums', 'serve-proxy'));

gulp.task('serve-build-dir', gulp.series(() => {

    browserSync({
        notify: false,
        https: false,
        ghostMode: false,
        logLevel: "debug",
        port: 8080,
        open: 'external',
        cors: true,
        server: {
            baseDir: "./build/static",
            directory: true
        },
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
        .pipe(gulpReplace('index.css', `index-${timestamp}.css`))
        .pipe(gulp.dest('build/'));

}));


gulp.task('copy-tmp-javascript', gulp.series('typescripts-build', 'webpack-build', 'webpack-navigator-launcher-build',
    'copy-webpack-templates', () => {
        return gulp.src([
            '.tmp/static/scripts/*-bundle.js',
            '.tmp/static/scripts/*.*.js',
        ], {
            dot: true
        }).pipe(gulp.dest('build/static/scripts'));
    })
);

gulp.task('build', gulp.series(
    'clean',
    'apply-prod-environment',
    'copy-static',
    'copy-tmp-styles',
    'copy-tmp-javascript',
    'html',
    'htmlmin',
    'cssnano',
    'rename-assets',
    'replace-assets',
    (done) => {
        done();
    }));