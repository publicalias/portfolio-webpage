"use strict";

//node modules

const gulp = require("gulp");
const cleanCSS = require("gulp-clean-css");
const sass = require("gulp-sass");
const merge = require("merge-stream");
const named = require("vinyl-named-with-path");
const wpVersion = require("webpack");
const webpack = require("webpack-stream");

//media

const media = () => {

  const assets = gulp.src("assets/**/media/**").pipe(gulp.dest("build"));
  const master = gulp.src("master/media/**").pipe(gulp.dest("build/master/media"));

  return merge(assets, master);

};

//script

const wpOptions = {
  mode: "production",
  module: {
    rules: [{
      test: /(\.js|\.jsx)$/u,
      use: {
        loader: "babel-loader",
        options: { presets: ["@babel/preset-react"] }
      }
    }]
  },
  resolve: {
    modules: ["master/scripts", "node_modules"],
    extensions: [".js", ".jsx"]
  }
};

const script = () => gulp.src("assets/**/script.*")
  .pipe(named())
  .pipe(webpack(wpOptions, wpVersion))
  .pipe(gulp.dest("build"));

//styles

const styles = () => gulp.src("assets/**/styles.scss")
  .pipe(sass({ includePaths: ["master/styles"] }))
  .pipe(cleanCSS({ rebase: false }))
  .pipe(gulp.dest("build"));

//view

const view = () => gulp.src("assets/**/view.html").pipe(gulp.dest("build"));

//build

const build = gulp.parallel(media, script, styles, view);

//watch

const watch = () => gulp.watch(["assets/**", "master/**"], build);

module.exports = {
  build,
  watch
};
