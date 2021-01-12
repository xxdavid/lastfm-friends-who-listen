var gulp = require('gulp');
var log = require('fancy-log');
var PluginError = require('plugin-error');
var webpack = require("webpack");

function buildCore(callback) {
    var config = require('./webpack.config.js');

    webpack(config, function (err, stats) {
        if (err) throw new PluginError('webpack', err);
        log('[webpack]', stats.toString({
            version: false,
            hash: false,
            chunks: false
        }));
        callback();
    });
}

gulp.task('build', function (callback) {
    buildCore(function () {
        gulp.src('build/core/content.js')
            .pipe(gulp.dest('build/chrome/'));
        gulp.src('browsers/chrome/**')
            .pipe(gulp.dest('build/chrome/'));
        gulp.src('images/icon.png')
            .pipe(gulp.dest('build/chrome/'));

        callback();
    })
});

gulp.task('watch', ['build'], function () {
    gulp.watch('src/**', ['build']);
});

gulp.task('default', ['watch']);
