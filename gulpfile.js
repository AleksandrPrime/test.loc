const gulp = require('gulp');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const sourcemap = require('gulp-sourcemaps');
const bs = require('browser-sync').create();
const plumber = require('gulp-plumber');
const include = require('gulp-file-include');
// const debug = require('gulp-debug');
// const concat = require('gulp-concat');
// const order = require('gulp-order');
// const babel = require('gulp-babel');
// const uglify = require('gulp-uglify');
// const mainBowerFiles = require('main-bower-files');
// const flatten = require('gulp-flatten');
const imagemin = require('gulp-imagemin');
const svgSymbols = require('gulp-svg-symbols');
const svgmin = require('gulp-svgmin');
const gcmq = require('gulp-group-css-media-queries');
const smartgrid = require('smart-grid');

//CSS TASK
gulp.task('css', function () {
    return gulp.src('./src/precss/style.less')
        .pipe(plumber())
        .pipe(sourcemap.init())
        .pipe(less())
        .pipe(gcmq())
        .pipe(autoprefixer({
            browsers: ['> 1%'],
            cascade: false
        }))
        .pipe(csso({restructure: false}))
        .pipe(sourcemap.write())
        .pipe(gulp.dest('./build/css'))
});

//SmartGrid Task
gulp.task('grid', function(){
    smartgrid('src/less', {
        container: {
            maxWidth: '1170px'
        }
    });
});

//HTML TASK
gulp.task('html', function () {
    return gulp.src('./src/*.html', {since: gulp.lastRun('html')})
        .pipe(include())
        .pipe(gulp.dest('./build'))
});

//HTML TEMPLATES TASK
gulp.task('html:templates', function () {
    return gulp.src('./src/*.html')
        .pipe(include())
        .pipe(gulp.dest('./build'))
});

//WATCHERS
gulp.task('watchers', function () {
    gulp.watch('./src/precss/*.less', gulp.series('css'));
    gulp.watch('./src/*.html', gulp.series('html'));
    gulp.watch('./src/template/*.html', gulp.series('html:templates'));
    gulp.watch('./build/*.html').on('change', bs.reload);
    gulp.watch('./build/css/style.css').on('change', bs.reload);
    gulp.watch('./src/js/*.js', gulp.series('js'));
    gulp.watch('./build/js/main.js').on('change', bs.reload);
});

//JS TASK
gulp.task('js', function () {
    return gulp.src('./src/js/*.js')
        .pipe(plumber())
        .pipe(sourcemap.init())
       /* .pipe(order([
        //    1.js
        //    2.js
        //    3.js
        ], {base: './src/js'}))
        .pipe(concat('main.js'))*/
       /* .pipe(babel({
            presets: ['env']
        }))*/
        // .pipe(uglify())
        .pipe(sourcemap.write())
        .pipe(gulp.dest('./build/js'))
});

//LIBS TASK
/*gulp.task('libs', () => {
    return gulp.src(mainBowerFiles(
        {
            'overrides': {
                'jquery': {
                    'main': 'dist/jquery.min.js'
                },
                'svg4everybody': {
                    'main': 'dist/svg4everybody.min.js'
                },
                'slick-carousel': {
                    'main': [
                        'slick/slick.js',
                        'slick/slick.css',
                        'slick/slick-theme.css'
                    ]
                },
                'photoswipe': {
                    'main': [
                        'dist/photoswipe.min.js',
                        'dist/photoswipe.css',
                        'dist/photoswipe-ui-default.min.js',
                        'dist/default-skin/default-skin.css',
                        'dist/default-skin/default-skin.png',
                        'dist/default-skin/default-skin.svg',
                        'dist/default-skin/preloader.gif'
                    ]
                }
            }
        }
    ), {base: './src/libs'})
        .pipe(flatten({includeParents: 1}))
        .pipe(gulp.dest('./build/libs'))
});*/

//BROWSER-SYNC TASK
gulp.task('server', function () {
    bs.init({
        server: {
            proxy: 'absorb.loc',
            baseDir: './build'
        }
    })
});

//IMG TASK
gulp.task('img', function () {
    return gulp.src(['src/i/**/*.{jpg,png,gif}', 'src/img/**/*.{jpg,png,gif}'], {base: './src'})
        .pipe(imagemin())
        .pipe(gulp.dest('./build'))
});

//SVG TASK
gulp.task('svg:icons', function () {
    return gulp.src('./src/i/svg/icons/*.svg')
        .pipe(svgmin({
            plugin:[
                {removeEditorsNSData:true},
                {removeTitle:true}
            ]
        }))
        .pipe(svgSymbols({
            templates: ['default-svg']
        }))
        .pipe(gulp.dest('./build/i/icons'))
});

//FONT TASK
gulp.task('fonts', function () {
    return gulp.src('./src/fonts/**/*.*')
        .pipe(gulp.dest('./build/fonts'))
});

//GLOBAL TASK
gulp.task('build', gulp.parallel('html', 'css', 'js'/*, 'libs'*/));
gulp.task('dev', gulp.series('build', gulp.parallel('watchers', 'server')));
