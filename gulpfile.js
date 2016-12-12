var gulp = require('gulp');
var jshint = require('gulp-jshint');
var less = require('gulp-less');

gulp.task('default', ['watch']);

gulp.task('jshint', function() {
	return gulp.src('src/js/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build-css', function() {
	return gulp.src('src/less/**/*.less')
		.pipe(less({
      		paths: [ 'src/less/includes' ]
    	}))
    	.pipe(gulp.dest('public/assets/stylesheets'));
});

gulp.task('watch', function() {
	gulp.watch('src/js/*.js', ['jshint']);
	gulp.watch('src/less/**/*.less', ['build-css']);
});

