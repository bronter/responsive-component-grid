import gulp from "gulp";
import _ from "lodash";
import runSequence from "run-sequence";
import merge from "merge-stream";
import babelPreset from "babel-preset-launchbadge-browser";

import loadPlugins from "gulp-load-plugins";
import webpack from "gulp-webpack";
const $ = loadPlugins();

// Build
// -----------------------------------------------------------------------------
gulp.task("build", () => {
  if (process.env.NODE_ENV == null) process.env.NODE_ENV = "production";

  const styleStream = gulp.src("styles/**/*.css");
  const jsStream = gulp.src("src/**/*.js");
  const mergedStream = merge(styleStream, jsStream);
  mergedStream.pipe(webpack({
    module: {
      loaders: [
        {test: /\.css$/, loader: "style!css"},
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel",
          query: {
            presets: [babelPreset],
          },
        },
      ],
    },
  })).pipe(gulp.dest("lib"));
});

// Lint
// -----------------------------------------------------------------------------
gulp.task("lint", () =>
  gulp.src("src/**/*.js")
    .pipe($.eslint())
    .pipe($.eslint.format())
);
