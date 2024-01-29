
const gulp = require('gulp')
//html
const fileInclude = require('gulp-file-include')
const htmlclean = require('gulp-htmlclean')
const webpHTML = require('gulp-webp-html');

//sass
const sass = require('gulp-sass')(require('sass'))
const sassGlob = require('gulp-sass-glob')
const autoprefixer = require('gulp-autoprefixer')
const csso = require('gulp-csso')
// const webpCss = require('gulp-webp-css')


const server = require('gulp-server-livereload')
const clean = require('gulp-clean')
const fs = require('fs')
const sourcemaps = require('gulp-sourcemaps')
const groupMedia = require('gulp-group-css-media-queries')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const babel = require('gulp-babel')
const changed = require('gulp-changed')
//img
const imagemin = require('gulp-imagemin')
// const webp = require('gulp-webp')
// import webp from 'gulp-webp'
const webp = require('gulp-webp')


const webpack = require('webpack-stream')

const { doesNotMatch } = require('assert')

gulp.task('clean:docs', function(done){
    if(fs.existsSync('./docs/')){
        return gulp.src('./docs/', { read: false})
            .pipe(clean({force: true}))
    }
    done()
    
})

const fileIncludeSetting = {
    prefix: '@@',
    basepath: '@file'
}
const plumberNotify = (title) => {
    return {
        errorHandler: notify.onError({
            title: title,
            message: 'Error <%= error.message %>',
            sound: false
        })
    }

}


gulp.task('html:docs', function(){
    return gulp
        .src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
        .pipe(changed('./docs/'))
        .pipe(plumber(plumberNotify('HTML')))
        .pipe(fileInclude(fileIncludeSetting))
        .pipe(webpHTML())
        .pipe(htmlclean())
        .pipe(gulp.dest('./docs/'))
}) 


gulp.task('sass:docs', function(){
    return gulp.src('./src/sass/*.sass')
        .pipe(changed('./docs/css/'))
        .pipe(plumber(plumberNotify('sass')))
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
        // .pipe(webpCss())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(groupMedia())
        .pipe(sass())
        .pipe(csso())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./docs/css/'))
})

gulp.task('images:docs', function(){
    return gulp
        .src('./src/img/**/*')
        .pipe(changed('./docs/img/'))
        .pipe(webp())
        .pipe(gulp.dest('./docs/img/'))
        .pipe(gulp.src('./src/img/**/*'))
        .pipe(changed('./docs/img/'))
        .pipe(imagemin({verbose: true}))
        .pipe(gulp.dest('./docs/img/'))
})

gulp.task('fonts:docs', function(){
    return gulp.src('./src/fonts/**/*')
        .pipe(changed('./docs/fonts/'))
        .pipe(gulp.dest('./docs/fonts/'))
})
gulp.task('files:docs', function(){
    return gulp.src('./src/files/**/*')
        .pipe(changed('./docs/files'))
        .pipe(gulp.dest('./docs/files/'))
})

gulp.task('js:docs', function(){
    return gulp.src('./src/js/*.js')
        .pipe(changed('./docs/js'))
        .pipe(plumber(plumberNotify('js')))
        .pipe(babel())
        .pipe(webpack(require('../webpack.config.js')))
        .pipe(gulp.dest('./docs/js'))
})

const serverOption = {
    livereload: true,
    open: true
}

gulp.task('server:docs', function(){
    return gulp.src('./docs/')
        .pipe(server(serverOption))
})

