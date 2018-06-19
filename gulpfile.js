var gulp = require('gulp'),
    sass = require('gulp-sass'),
    include = require('gulp-file-include'),
    clean = require('gulp-clean'),
    browserSync = require('browser-sync');

//==== GULP CLEAN ====//
gulp.task('clean', function(){
    return gulp.src('dist')
        .pipe(clean());
})


gulp.task('copy', ['clean'], function(){
    gulp.src([
            'src/components/**/*',
            'src/css/**/*',
            'src/js/**/*',
            'src/img/**/*'], 
            {"base": "src"})
        .pipe(gulp.dest('dist'))
})


//==== SASS ====//

// Task para processamento do SASS
gulp.task('sass', function(){
    // Origem
    gulp.src('./src/sass/**/*.scss')
        // Tubulacao
        .pipe(sass())
        // Destino
        .pipe(gulp.dest('./dist/css/'));
})


//==== GULP FILE INCLUDE ====//

// Task oara include no header e footer
gulp.task('html', function(){
    return gulp.src('./src/**/*.html')
        .pipe(include())
        .pipe(gulp.dest('./dist/'));
})

// Task para monitoramento do SASS
// gulp.task('listen', function(){
//                 // PATH  - COMANDO A SER EXECUTADO 
//     gulp.watch('./src/sass/**/*.scss', ['sass'])
// })


//==== BROWSER SYNC ====//

// Task para iniciar um servidor localhost
gulp.task('server', ['html'], function(){
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
})