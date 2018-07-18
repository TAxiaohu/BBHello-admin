/**
 * Created by liusong on 15/11/16.
 */
'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

//var gulpNgConfig = require('gulp-ng-config');
//var fs = require('fs');
var $ = require('gulp-load-plugins')();
var jsonfile = require('jsonfile');

gulp.task('env:config:serve', function () {
  var env = process.env.APP_ENV || 'local';
  console.log(env);
  process.env.APP_ENV = env;

  //return gulp.run('env:config');
});

gulp.task('env:config', function () {
  var env = process.env.APP_ENV || 'needReplace';

  return gulp.src(
    path.join(conf.paths.src, '/app/config.json')
  )
    .pipe($.ngConfig('app.config', {
      environment: env
    }))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/')));
});

gulp.task('env:replace', function () {
  var envConfig = jsonfile.readFileSync(path.join(conf.paths.src, '/app/config.json'));
  var needReplace = envConfig.needReplace;
  var env = process.env.APP_ENV || 'local';

  var stream = gulp.src(
    path.join(conf.paths.dist, '/scripts/*.js')
  );
  for (var key in needReplace.config) {
    stream = stream.pipe(
      $.replace(
        needReplace.config[key],
        envConfig[env]['config'][key])
    );
    console.log(key, needReplace.config[key]);
    console.log(key, envConfig[env]['config'][key]);
  }

  return stream.pipe(gulp.dest(path.join(conf.paths.dist, '/scripts')));

});
