var gulp = require('gulp'),
    sass = require('gulp-sass'),
    include = require('gulp-file-include'),
    clean = require('gulp-clean'),
    autoprefixer = require('gulp-autoprefixer'),
    uncss = require('gulp-uncss'),
    imagemin = require('gulp-imagemin'),
    cssnano = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync');

//==== GULP CLEAN ====//
gulp.task('clean', function(){
    return gulp.src([
        './dist/*.html',
        './dist/components/',
        './dist/css/',
        './dist/img/',
        './dist/js/',
        '!./dist/.git/**/*'])
        .pipe(clean());
})


gulp.task('copy', ['clean'], function(){
    return gulp.src(
        ['src/components/**/*'], 
            {"base": "src"})
        .pipe(gulp.dest('dist'))
})


//==== SASS ====//

// Task para processamento do SASS
gulp.task('sass', function(){
    // Origem
    return gulp.src('./src/sass/**/*.scss')
        // Tubulacao
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssnano())
        // Destino
        .pipe(gulp.dest('./dist/css/'));
})


//==== GULP FILE INCLUDE ====//

// Task para include no header e footer
gulp.task('html', function(){
    return gulp.src([
            './src/**/*.html',
            '!./src/inc/**'
            ])
        .pipe(include())
        .pipe(gulp.dest('./dist/'));
})

//==== UNCSS ====//
gulp.task('uncss', ['html'], function(){
    return gulp.src('./dist/components/**/*.css')
    .pipe(uncss({
        html: ['./dist/*.html']
    }))
    .pipe(gulp.dest('./dist/components/'))
})

gulp.task('imagemin', function(){
    return gulp.src('./src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img/'))
})


gulp.task('build-js', function(){
    return gulp.src('src/js/**/*')
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'))
})

gulp.task('svgmin', function(){
    return gulp.src(['./src/inc/icons/*.svg', '!./src/inc/icons/*.min.svg'])
        .pipe(imagemin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./src/inc/icons/'))
})


gulp.task('default', ['copy'], function(){
    gulp.start('uncss', 'imagemin', 'sass', 'build-js')
})

//==== BROWSER SYNC ====//

// Task para iniciar um servidor localhost
gulp.task('server', function(){
    // Modulo.metodo
    browserSync.init({
        // Objeto
        server: {
            // Diretorio a ser servido
            baseDir: 'dist'
        }
    })
    
    // Monitoramento o diretorio 'src' e faz reload no browser
    gulp.watch('./dist/**/*').on('change', browserSync.reload)
    
    // Monitoramento do SASS
    gulp.watch('./src/sass/**/*.scss', ['sass'])
    gulp.watch('./src/**/*.html', ['html'])
    gulp.watch('./src/js/**/*', ['build-js'])
    gulp.watch(['./src/inc/icons/*.svg', '!./src/inc/icons/*.min.svg'], ['svgmin'])
})

// Task para monitoramento do SASS
// gulp.task('listen', function(){
//                 // PATH  - COMANDO A SER EXECUTADO 
//     gulp.watch('./src/sass/**/*.scss', ['sass'])
// })