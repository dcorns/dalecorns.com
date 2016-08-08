/**
 * gulpfile.js
 * Created by dcorns on 8/7/16
 * Copyright © 2016 Dale Corns
 * Uses __dirname/Development for development build, __dirname/app for all client files, production index.html kept in __dirname/
 * For development with css4, and webpack
 * Need to add call to grunt for addView functionality
 */
/// <reference path="all.d.ts" />
'use strict';
var gulp = require('gulp');
var childProcess = require('child_process').spawn;
var cssnext = require('gulp-cssnext');
var concatCss = require('gulp-concat-css');
var autoprefixer = require('gulp-autoprefixer');
var gulpWebpack = require('gulp-webpack');
var webpack = require('webpack');
var uglify = require('gulp-uglify');

gulp.task('grunt', function(){
  childProcess('grunt');
});

gulp.task('webpack', function(){
  return gulp.src('app/js/**/*.js')
    .pipe(gulpWebpack({
      output:{
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('Development/js'));
});

gulp.task('copyassets', function(){
  gulp.src(['app/assets/**/*'])
    .pipe(gulp.dest('Development'));
});

gulp.task('dev-server', function(){
  const cp = childProcess('node', ['server', './Development/']);
  cp.stdout.on('data', function(data){
    console.log(data.toString('utf8'));
  });
});

gulp.task('build-css', function(){
  return gulp.src('app/styles/**/*')
    .pipe(concatCss('main.css'))
    .pipe(cssnext({
      compress: true
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('Development/css'));
});

gulp.task('watcher', function(){
  gulp.watch('app/js/**/*', ['webpack']);
  //Keep Development build folder assets in sync
  gulp.watch('app/assets/**/*',['copyassets']);
  gulp.watch('app/index.html', function(){
    gulp.src(['app/index.html'])
      .pipe(gulp.dest(__dirname));
  });
  gulp.watch('app/styles/**/*',['build-css']);
  gulp.watch('app/views/**/*', ['grunt', 'webpack']);
});

gulp.task('ship', function(){
  gulp.src(['Development/**/*'])
    .pipe(gulp.dest('static'));
});

gulp.task('default',['watcher', 'dev-server']);
