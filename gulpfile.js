"use strict";

//node modules

const gulp = require("gulp");
const cleanCSS = require("gulp-clean-css");
const sass = require("gulp-sass");
const named = require("vinyl-named-with-path");
const wpVersion = require("webpack");
const webpack = require("webpack-stream");

//media

gulp.task("media", () => gulp.src("assets/**/media/**").pipe(gulp.dest("build")));

gulp.task("media:master", () => gulp.src("master/media/**").pipe(gulp.dest("build/master/media")));

//script

const wpOptions = {
  mode: "production",
  module: {
    rules: [{
      test: /(\.js|\.jsx)$/,
      use: {
        loader: "babel-loader",
        options: { presets: ["flow", "react"] }
      }
    }]
  },
  resolve: {
    modules: ["master/scripts"],
    extensions: [".js", ".jsx"]
  }
};

gulp.task("script", () => gulp.src("assets/**/script.*")
  .pipe(named())
  .pipe(webpack(wpOptions, wpVersion))
  .pipe(gulp.dest("build")));

//styles

gulp.task("styles", () => gulp.src("assets/**/styles.scss")
  .pipe(sass({ includePaths: ["master/styles"] }))
  .pipe(cleanCSS({ rebase: false }))
  .pipe(gulp.dest("build")));

//view

gulp.task("view", () => gulp.src("assets/**/view.html").pipe(gulp.dest("build")));

//build

gulp.task("build", ["media", "media:master", "script", "styles", "view"]);

//watch

gulp.task("watch", () => gulp.watch(["assets/**", "master/**"], ["build"]));
