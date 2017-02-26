'use strict';

var libPath = require('path');

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var watchify = require('watchify');

function abs(relative) {
	return libPath.resolve(__dirname, relative);
}

function createBrowserify(debug, opts) {
	opts = Object.assign({
		entries: abs('./src/index.js'),
		debug: debug
	}, opts);
	return browserify(opts);
}

function createBuildStream(debug, b) {
	b = b || createBrowserify(debug);

	let stream = b.bundle()
		.on('error', gutil.log.bind(gutil, 'Browserify Error'))
		.pipe(source('markdown-loader' + (debug ? '' : '.min') + '.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}));
	
	if (!debug) {
		stream = stream.pipe(uglify());
	}
		
	stream = stream
		.on('error', gutil.log)
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(abs('./dist/')));
	
	return stream;
}

gulp.task('dev', function () {
	return createBuildStream(true);
});

gulp.task('prod', function () {
	return createBuildStream(false);
});

gulp.task('watch', function () {
	var b = createBrowserify(true, {
		cache: {},
		packageCache: {}
	});

	b.plugin(watchify, {
		poll: true
	});

	b.on('update', function () {
		return createBuildStream(true, b);
	});
	
	b.on('log', gutil.log);
	
	return createBuildStream(true, b);
});

gulp.task('default', ['dev', 'prod']);