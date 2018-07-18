var gulp = require("gulp");
var coffee = require("gulp-coffee");
const path = require("path");

const destination = "js";

gulp.task("fonts", function() {
  gulp
    .src("./lib/font/data/**/*")
    .pipe(gulp.dest(path.join(destination, "font", "data")));
});

gulp.task("js", function() {
  gulp.src("./lib/**/*.js").pipe(gulp.dest(destination));
});

gulp.task("coffee", function() {
  gulp
    .src("./lib/**/*.coffee")
    .pipe(coffee({ coffee: require("coffee-script") }))
    .pipe(gulp.dest(destination));
});

gulp.task("build", ["fonts", "js", "coffee"]);
