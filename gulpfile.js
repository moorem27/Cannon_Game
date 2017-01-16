var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var bootlint     = require('gulp-bootlint');
var sourcemaps   = require('gulp-sourcemaps');
var sassLint     = require('gulp-sass-lint');
var eslint       = require('gulp-eslint');

/**
 * Run bootlint on the project's main html file.
 * @dependency sass - ensures index.html is using most up-to-date css data
 */
gulp.task('bootlint', ['sass'], function() {
    return gulp.src('index.html')
        .pipe(bootlint({
            stoponerror: true
        }));
});

/**
 * Runs the sass compiler on the main sass file.
 * @dependency sass-lint - runs the linter on the sass file before compiling
 */
gulp.task('sass', ['sass-lint'], function() {
    return gulp.src('assets/css/main.sass')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer())
        .pipe(gulp.dest('assets/css/'))
        .pipe(browserSync.reload({ stream: true }));
});

/**
 * Watch changes to sass/css, javascript, and html files.
 */
gulp.task('watch', function() {
    gulp.watch('assets/css/**', ['sass-lint', 'sass']);
    gulp.watch('assets/js/**', ['js-lint', browserSync.reload]);
    gulp.watch('index.html', ['bootlint', browserSync.reload]);
});

/**
 * Runs the browser sync task on the project.
 */
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: ''
        }
    })
});

/**
 * Runs the sass linter on all of the sass files.
 */
gulp.task('sass-lint', function() {
    return gulp.src('assets/css/**/*.sass')
        .pipe(sassLint({
            files: {
                ignore: 'assets/vendor/**/*.sass'
            }
        }))
        .pipe(sassLint.failOnError());
});

/**
 * Runs the sass linter on all of the sass files and reports all
 * warnings and errors to standard output.
 */
gulp.task('sass-lint-verbose', function() {
    return gulp.src('assets/css/**/*.sass')
        .pipe(sassLint({
            options: {
                formatter: 'compact',
                'max-warnings': 50
            },
            files: {
                ignore: 'assets/vendor/**/*.sass'
            }
        }))
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
});

/**
 * Runs eslint on all of the javascript files and prints warnings and errors
 * to standard output.
 */
gulp.task('js-lint', function() {
    return gulp.src(['assets/js/**/*.js', '!node_modules/**'])
        .pipe(eslint('.eslintrc'))
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

// default build task
gulp.task('default', ['sass-lint', 'sass', 'bootlint', 'js-lint']);

// development task
gulp.task('dev', ['sass-lint', 'sass', 'bootlint', 'js-lint', 'browser-sync', 'watch']);
