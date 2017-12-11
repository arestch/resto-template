"use strict";

var gulp = require("gulp"),
    sass = require("gulp-sass"),
    plumber = require("gulp-plumber"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    server = require("browser-sync").create(),
    rename = require("gulp-rename"),
    minify = require("gulp-minify"),
    cleanCSS = require('gulp-clean-css'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    concat = require('gulp-concat');

gulp.task("style", () => {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 2 versions"
      ]})
    ]))
    .pipe(gulp.dest("css"))
    .pipe(cleanCSS())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("css"))
    .pipe(server.stream());
});
   
gulp.task('compress', () => {
  return gulp.src([
    'scripts/common.js',
    ])
  .pipe(concat('common.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('js'));
});


gulp.task('js', ['compress'], () =>
    gulp.src('js/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('scripts'))
);


gulp.task('browser-sync', () => {
        browserSync({
                server: {
                        baseDir: "www"
                },
                ghostMode: {
                        scroll: true
                }
        });
});


gulp.task('serve', ['style', 'compress'], () => {
  server.init({
    server: ".",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("js/*.js", ["js"]);
  gulp.watch("*.html").on("change", server.reload);
});