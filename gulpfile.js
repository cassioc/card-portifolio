var gulp = require('gulp');
var sass = require('gulp-sass');

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
gulp.task('listen', function(){
                // PATH  - COMANDO A SER EXECUTADO 
    gulp.watch('./src/sass/**/*.scss', ['sass'])
})