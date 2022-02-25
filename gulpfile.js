const gulp = require('gulp'),
   browserSync = require('browser-sync'),
   sass = require('gulp-sass')(require('sass')),
   autoprefixer = require('gulp-autoprefixer'),
   cleanCSS = require('gulp-clean-css'),
   pug = require('gulp-pug'),
   plumber = require('gulp-plumber');

function browserSyncFunc() {
   browserSync.init({
      server: {
         baseDir: 'build'
      }
   })
}

function pugFunc() {
   return gulp.src('src/pug/*.pug')
      .pipe(plumber())
      .pipe(pug({
         pretty: true
      }))

      .pipe(plumber.stop())
      .pipe(gulp.dest('build'))
      .on('end', browserSync.reload)
}

function images() {
   return gulp.src('src/assets/imgs/**/*')
      .pipe(gulp.dest('build/assets/imgs/'))
      .pipe(browserSync.stream())

}

function scss() {
   return gulp.src('src/assets/scss/app.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
         overrideBrowserslist: ['last 2 version'],
         grid: 'autoplace'
      }))
      .pipe(cleanCSS())
      .pipe(gulp.dest('build/assets/css'))
      .pipe(browserSync.stream())
}

function watcher() {
   gulp.watch('src/pug**/*.pug', pugFunc)
   gulp.watch('src/assets/imgs/**/*', images)
   gulp.watch('src/assest/scss/**/*.scss', scss)
}


gulp.task(
   'default',
   gulp.parallel(browserSyncFunc, watcher, scss, images, pugFunc)
);