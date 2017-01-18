const gulp          = require('gulp')
const sass          = require('gulp-sass')
const uglify        = require('gulp-uglify')
const browserSync   = require('browser-sync')

// BrowserSync
gulp.task('sync', () => {
    browserSync.init({
        proxy: "wintermute.dev"
    })
})

// Sass
gulp.task('sass', () => {
    let outputStyle = 'compressed'
    return gulp.src('./dev/sass/**/*.sass')
    .pipe( sass({ outputStyle }).on('error', sass.logError) )
    .pipe( gulp.dest('./public/css'))
    .pipe( browserSync.reload( {stream: true} ) )
})

// Scripts
gulp.task('scripts', () => {

    return gulp.src('./dev/js/**/*.js')
    .pipe( uglify() )
    .pipe( gulp.dest('./public/js') )
    .pipe( browserSync.reload( {stream: true} ) )
})

// Watch
gulp.task('watch', () => {

    gulp.watch('./dev/sass/**/*.sass', ['sass'])
    gulp.watch('./dev/js/**/*.js', ['scripts'])

})

// Default
gulp.task('default', ['sync', 'scripts', 'sass', 'watch'])
gulp.task('build', ['scripts', 'sass'])

