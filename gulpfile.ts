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
const gulp = require('gulp');
const childProcess = require('child_process').spawn;
const postcss = require('gulp-postcss');
const concatCss = require('gulp-concat-css');
const cssnext = require('postcss-cssnext');
const cssnano = require('cssnano');
const gulpWebpack = require('webpack-stream');
const webpack = require('webpack');
//added to run shipping tasks synchronously
const runSequence = require('run-sequence');

gulp.task('grunt', function(){
  childProcess('grunt');
});

gulp.task('webpack', function(){
  return gulp.src('app/js/index.js')
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
  const cp = childProcess('node', ['host', '/Development']);
  cp.stdout.on('data', function(data){
    console.log(data.toString('utf8'));
  });
});

gulp.task('build-css', function(){
  return gulp.src('app/styles/**/*')
    .pipe(concatCss('main.css'))
    .pipe(postcss([ cssnext(), cssnano()]))
    .pipe(gulp.dest('Development/css'));
});

gulp.task('watcher', function(){
  gulp.watch('./**/*.ts', ['webpack']);
  //Keep Development build folder assets in sync
  gulp.watch('app/assets/**/*',['copyassets']);
  gulp.watch('app/index.html', function(){
    gulp.src(['app/index.html'])
      .pipe(gulp.dest('Development'));
  });
  gulp.watch('app/styles/**/*',['build-css']);
  gulp.watch('app/views/**/*', ['grunt', 'webpack']);
});

gulp.task('ship-client', function(){
  gulp.src(['Development/**/*'])
    .pipe(gulp.dest('dalecorns.com/public'));
});
gulp.task('ship-api', function(){
  gulp.src(['api/**/*.js'])
    .pipe(gulp.dest('dalecorns.com/api'));
});
gulp.task('ship-files', function(){
  gulp.src(['server.js', 'host.js', 'dbRunner.js', 'package.json'])
    .pipe(gulp.dest('dalecorns.com'));
});
gulp.task('upload-to-AWS', function(){
  const upload = childProcess('bash', ['shipit.sh', 'dalecorns.com']);
  upload.stdout.on('data', function(data){
    console.log(data.toString('utf8'));
  });
});
gulp.task('ship', function(){
  runSequence(['ship-client', 'ship-api', 'ship-files'], 'upload-to-AWS');
});
gulp.task('default',['watcher', 'dev-server']);
