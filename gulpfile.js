var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var bootlint     = require('gulp-bootlint');
var sourcemaps   = require('gulp-sourcemaps');
var sassLint     = require('gulp-sass-lint');
var eslint       = require('gulp-eslint');
var pkg          = require('./package.json');

gulp.task( 'bootlint', ['sass'], function() {
    return gulp.src('index.html')
        .pipe(bootlint({
            stoponerror: true
        }));
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', ['sass-lint'], function () {
    return gulp.src('assets/css/main.sass')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer())
        .pipe(gulp.dest('assets/css/'))
        .pipe(browserSync.reload({stream:true}));
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('assets/css/**', ['sass-lint', 'sass']);
    gulp.watch('assets/js/**', ['js-lint', browserSync.reload]);
    gulp.watch('index.html', ['bootlint', browserSync.reload] );
});


// Configure the browserSync task
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: ''
        }
    })
});

gulp.task('sass-lint', function() {
    return gulp.src('assets/css/**/*.sass')
        .pipe( sassLint({
            files: {
                ignore: 'assets/vendor/**/*.sass'
            }
        }) )
        .pipe(sassLint.failOnError());
});

gulp.task('sass-lint-verbose', function() {
    return gulp.src('assets/css/**/*.sass')
        .pipe( sassLint({
            options: {
                formatter: 'compact',
                'max-warnings': 50
            },
            files: {
                ignore: 'assets/vendor/**/*.sass'
            }
        }) )
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
});

gulp.task('js-lint', function() {
    return gulp.src(['assets/js/**/*.js', '!node_modules/**'])
        .pipe(eslint('.eslintrc'))
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('default', ['sass-lint', 'sass', 'bootlint', 'js-lint']);
gulp.task('dev', ['sass-lint', 'sass', 'bootlint', 'js-lint', 'browser-sync', 'watch']);

