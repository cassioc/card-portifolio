var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync');

//==== SASS ====//

// Task para processamento do SASS
gulp.task('sass', function(){
    // Origem
    gulp.src('./src/sass/**/*.scss')
        // Tubulacao
        .pipe(sass())
        // Destino
        .pipe(gulp.dest('./src/css/'));
})


// Task para monitoramento do SASS
// gulp.task('listen', function(){
//                 // PATH  - COMANDO A SER EXECUTADO 
//     gulp.watch('./src/sass/**/*.scss', ['sass'])
// })


//==== BROWSER SYNC ====//

// Task para iniciar um servidor localhost
gulp.task('server', function(){
    // Modulo.metodo
    browserSync.init({
        // Objeto
        server: {
            // Diretorio a ser servido
            baseDir: 'src'
        }
    })

    // Monitoramento o diretorio 'src' e faz reload no browser
    gulp.watch('src/**/*').on('change', browserSync.reload)
    
    // Monitoramento do SASS
    gulp.watch('./src/sass/**/*.scss', ['sass'])
})