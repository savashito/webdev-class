import gulp from 'gulp';
import less from 'gulp-less';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
import del from 'del';

import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import gulpPath from 'gulp-path';


const paths = {
  images: {
    src: 'src/assets/img/**/*.*',
    dest: 'www/assets/img/'
  },
  styles: {
    src: 'src/styles/less/**/*.less',
    dest: 'www/assets/css/'
  },
  scripts: {
    src: 'src/scripts/js/**/*.js',
    dest: 'www/assets/js/'
  },
  pages: {
    src: 'src/pages/**/*.*',
    dest: 'www/pages/'
  },
  shared: {
    src: 'src/shared/**/*.*',
    dest: 'www/shared/'
  }
};


/*
 * Gulp Path
 */
var app = new gulpPath.Path('src', 'www');
var stylePaths = app.generateAllPaths('stylePaths', 'css', null, 'sass');

/*
 * For small tasks you can export arrow functions
 */
export const clean = () => del([ 'assets' ]);

/*
 * You can also declare named functions and export them as tasks
 */
 export function images() {
   return gulp.src(paths.images.src)
     .pipe(gulp.dest(paths.images.dest));
 }

export function styles() {
  return gulp.src(paths.styles.src)
    .pipe(less())
    .pipe(cleanCSS())
    // pass in options to the stream
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest));
}

export function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest));
}

export function pages() {
  return gulp.src(paths.pages.src)
    .pipe(gulp.dest(paths.pages.dest));
}

export function shared() {
  return gulp.src(paths.shared.src)
    .pipe(gulp.dest(paths.shared.dest));
}

 /*
  * You could even use `export as` to rename exported tasks
  */
function watchFiles() {
  gulp.watch(paths.images.src, images);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.pages.src, pages);
  gulp.watch(paths.shared.src, shared);
}
export { watchFiles as watch };

/*
 * You can still use `gulp.task`
 * for example to set task names that would otherwise be invalid
 */
const build = gulp.series(clean, gulp.parallel(images, styles, scripts, pages, shared));
gulp.task('build', build);

/*
 * Export a default task
 */
export default build;
