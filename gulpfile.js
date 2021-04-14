const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const tildeImporter = require('node-sass-tilde-importer');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const del = require('del');
const imagemin = require('gulp-imagemin');
const bs = require('browser-sync').create();

// Cleaning

const clean = () => {
  return del('build');
};

exports.clean = clean;

// Copying

const copyFonts = () => {
  return gulp.src('source/fonts/*.{woff2,woff}')
    .pipe(gulp.dest('build/fonts'));
};

const copyImages = () => {
  return gulp.src('source/img/**/*.{jpg,png,svg}')
    .pipe(gulp.dest('build/img'));
};

exports.copy = gulp.parallel(
  copyFonts,
  copyImages
);

// HTML

const minifyHtml = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
};

exports.minifyHtml = minifyHtml;

// Styles

const compileStyles = () => {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass({
      importer: tildeImporter
    }).on('error', sass.logError))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(cleanCSS())
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(bs.stream());
};

exports.compileStyles = compileStyles;

// Images

const minifyImages = () => {
  return gulp.src('source/img/**/*.{jpg,png,svg}')
    .pipe(imagemin([
      imagemin.mozjpeg({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('build/img'));
}

exports.minifyImages = minifyImages;

// Server

const serve = (done) => {
  bs.init({
    server: './build'
  });

  gulp.watch('source/sass/**/*.scss', gulp.series(compileStyles));
  gulp.watch('source/*.html').on('change', gulp.series(minifyHtml, bs.reload));

  done();
};

exports.serve = serve;

// Build

const build = gulp.series(
  clean,
  gulp.parallel(
    copyFonts,
    minifyHtml,
    compileStyles,
    minifyImages
  )
);

exports.build = build;

// Default

exports.default = gulp.series(
  clean,
  gulp.parallel(
    copyFonts, // в конце пересмотреть требования к сборке
    copyImages, // в конце пересмотреть требования к сборке
    minifyHtml,
    compileStyles
  ),
  serve
);
