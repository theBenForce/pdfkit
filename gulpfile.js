var gulp = require("gulp");
var coffee = require("gulp-coffee");
const path = require("path");
const rename = require("gulp-rename");

const destination = "dist";

gulp.task("fonts", function() {
  gulp
    .src("./lib/font/data/**/*")
    .pipe(gulp.dest(path.join(destination, "font", "data")));
});

gulp.task("static", function() {
  gulp
    .src(["./lib/**/*.js", "package.json", "package-lock.json"])
    .pipe(gulp.dest(destination));
});

gulp.task("coffee", function() {
  gulp
    .src("./lib/**/*.coffee")
    .pipe(coffee({ coffee: require("coffee-script") }))
    .pipe(gulp.dest(destination));
});

gulp.task("index", () => {
  gulp
    .src("./index.dist.js")
    .pipe(rename("index.js"))
    .pipe(gulp.dest(destination));
});

gulp.task("build", ["fonts", "static", "coffee"]);
