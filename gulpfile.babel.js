import gulp from "gulp";
import _ from "lodash";
import runSequence from "run-sequence";

import loadPlugins from "gulp-load-plugins";
const $ = loadPlugins();

// Build
// -----------------------------------------------------------------------------
gulp.task("build", () => {
  if (process.env.NODE_ENV == null) process.env.NODE_ENV = "production";

  gulp.src("src/**/*.js")
    .pipe($.babel())
    .pipe(gulp.dest("lib"));
});

// Lint
// -----------------------------------------------------------------------------
gulp.task("lint", () =>
  gulp.src("src/**/*.js")
    .pipe($.eslint())
    .pipe($.eslint.format())
);
