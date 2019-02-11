"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber"); // скрывает ошибки во время server
var postcss = require("gulp-postcss");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var autoprefixer = require("autoprefixer");
var htmlmin = require("gulp-htmlmin");
var minify = require("gulp-csso"); // минифицирует  css
var uglify = require("gulp-uglify");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp"); // делает из картинок формат webp
var svgstore = require("gulp-svgstore");
var cheerio = require("gulp-cheerio");
var rename = require("gulp-rename");
var server = require("browser-sync").create();
var del = require("del");

gulp.task("clean", function() {
  return del("build");
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}"
  ])
  .pipe(gulp.dest("build/fonts"));
});

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("script", function() {
  return gulp.src("source/js/**/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("build/js"))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest("build/js"))
});

gulp.task("img", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg,ico}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 80}))
    .pipe(gulp.dest("build/img/webp"));
});

gulp.task("sprite", function() {
  return gulp.src("source/img/sprite/*.svg")
    .pipe(cheerio({
      run: function ($) {
          $('[fill]').removeAttr('fill');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build/"));
});

gulp.task("video", function () {
  return gulp.src("source/video/*.mp4")
    .pipe(gulp.dest("build/video"));
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.scss", gulp.series("css"));
  gulp.watch("source/*.html", gulp.series("html")).on("change", server.reload);
  gulp.watch("source/js/**/*.js", gulp.series("script")).on("change", server.reload);
});

gulp.task("build", gulp.series("clean", "copy", "css", "script", "img", "video", "webp", "sprite", "html"));


