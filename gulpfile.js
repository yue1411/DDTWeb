// *************************************
//
//   Gulpfile
//
// *************************************
//
// Available tasks:
//   copy: bootstrap-css
//   copy: node-js-src
//   clean
//   - clean:images
//   - clean:jekyll
//   - clean:scripts
//   - clean:styles
//   build
//   - build:images
//     - build:normal-images
//       - copy:normal-temp-images-pre
//       - build:optimize-normal-images
//       - copy:normal-temp-images-post
//       - clean:normal-temp-images
//     - build:responsive-images
//   - build:index-algolia
//   - build:jekyll
//   - build:scripts
//     - build:babel-uglify
//     - build:concat
//   - build:styles:main
//   build:jekyll:watch
//   build:scripts:watch
//   build:travis
//   - test:html-proofer
//   install
//   serve
//
// *************************************

// -------------------------------------
//   Modules
// -------------------------------------
//
// autoprefixer      : Prefix CSS
// browserSync       : Development Server
// del               : Deletes things
// gulp              : The streaming build system
// pump              : Recommended to handles errors for Uglify
// gulp-babel        : Use next generation JavaScript, today, with Babel
// gulp-clean-css    : Minifies CSS
// gulp-concat       : Concatenate files
// gulp-fancy-log    : Logs things (replaced gulp-util)
// gulp-imagemin     : Minify PNG, JPEG, GIF and SVG images
// gulp-newer        : Only copy newer files
// gulp-postcss      : CSS transforms
// gulp-plumber      : Prevents pipe breaking caused by errors from gulp plugins
// gulp-rename       : Rename files
// gulp-responsive   : Generates responsive images
// gulp-run          : Run shell commands
// gulp-sass         : Compile Sass
// gulp-sourcemaps   : Generate sourcemaps
// gulp-uglify       : Minify JavaScript with UglifyJS
// gulp-util         : Utility functions
// run-sequence      : Run a series of dependent Gulp tasks in order
//
// -------------------------------------
const autoprefixer = require("autoprefixer");
const browserSync = require("browser-sync").create();
const babel = require("gulp-babel");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const del = require("del");
const log = require("fancy-log");
const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const pump = require("pump");
const rename = require("gulp-rename");
const responsive = require("gulp-responsive-modern");
const run = require("gulp-run");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");

const paths = require("./_assets/gulp_config/paths");

const onError = function(error) {
  log.error(error);
};

// -------------------------------------
//   Task: Copy : Bootstrap SCSS
// -------------------------------------
gulp.task("copy:bootstrap-scss", () => {
  return gulp
    .src(paths.nodeSrcDir + "bootstrap/scss/**/*")
    .pipe(newer(paths.scssFiles + "/bootstrap"))
    .pipe(gulp.dest(paths.scssFiles + "/bootstrap"));
});

// -------------------------------------
//   Task: Copy Node JS Source
// -------------------------------------
gulp.task("copy:node-js-src", () => {
  const src_files = [
    paths.nodeSrcDir + "/instantsearch.js/dist/instantsearch.min.js",
    paths.nodeSrcDir + "/jquery/dist/jquery.slim.min.js",
    paths.nodeSrcDir + "/popper.js/dist/umd/popper.min.js",
    paths.nodeSrcDir + "/bootstrap/dist/js/bootstrap.min.js",
    paths.nodeSrcDir + "/clipboard/dist/clipboard.min.js"
  ];
  return gulp
    .src(src_files)
    .pipe(newer(paths.jsFiles + "/vendor/node"))
    .pipe(gulp.dest(paths.jsFiles + "/vendor/node"));
});

// -------------------------------------
//   Task: Clean
// -------------------------------------
const cleanJekyll = () => del(["_site"]);
const cleanImages = () => del([paths.jekyllImageFiles + "/*", paths.siteImageFiles + "/*"]);
const cleanScripts = () => del([paths.jekyllJsFiles + "/*", paths.siteJsFiles + "/*"]);
const cleanStyles = () => del([paths.jekyllCssFiles + "/*", paths.siteCssFiles + "/*"]);

gulp.task("clean", gulp.parallel(cleanJekyll, cleanImages, cleanScripts, cleanStyles));

// -------------------------------------
//   Task: Build Normal Images
// -------------------------------------
const copyNormalImagesPre = () => {
  return gulp
    .src(paths.normalImageFilesGlob)
    .pipe(gulp.dest(paths.tempImageFiles));
};

const optimizeNormalImages = () => {
  return gulp
    .src(paths.tempImageFilesGlob)
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75 }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({ plugins: [{ removeViewBox: true }] })
    ]))
    .pipe(gulp.dest(paths.tempImageFiles));
};

const copyNormalImagesPost = () => {
  return gulp
    .src(paths.tempImageFilesGlob)
    .pipe(gulp.dest(paths.jekyllImageFiles + "/normal"))
    .pipe(gulp.dest(paths.siteImageFiles + "/normal"));
};

const cleanNormalTempImages = () => del(paths.tempImageFiles);

gulp.task("build:normal-images", gulp.series(
  copyNormalImagesPre,
  optimizeNormalImages,
  copyNormalImagesPost,
  cleanNormalTempImages
));

// -------------------------------------
//   Task: Build Responsive Images
// -------------------------------------
gulp.task("build:responsive-images", () => {
  return gulp
    .src(paths.responsiveImageFilesGlob)
    .pipe(responsive({
      "*.jpg": [
        { width: 1140, rename: { suffix: "-xl-1x" } },
        { width: 1140, rename: { suffix: "-xl-1x", extname: ".webp" } },
        { width: 1140 * 2, rename: { suffix: "-xl-2x" } },
        { width: 1140 * 2, rename: { suffix: "-xl-2x", extname: ".webp" } },
        { width: 768, rename: { suffix: "-md-1x" } },
        { width: 768, rename: { suffix: "-md-1x", extname: ".webp" } },
        { width: 768 * 2, rename: { suffix: "-md-2x" } },
        { width: 768 * 2, rename: { suffix: "-md-2x", extname: ".webp" } },
        { width: 540, height: 405, rename: { suffix: "-sm-1x" } },
        { width: 540, height: 405, rename: { suffix: "-sm-1x", extname: ".webp" } },
        { width: 540 * 2, height: 405 * 2, rename: { suffix: "-sm-2x" } },
        { width: 540 * 2, height: 405 * 2, rename: { suffix: "-sm-2x", extname: ".webp" } }
      ]
    }, {
      crop: "centre",
      quality: 60,
      withMetadata: false,
      withoutEnlargement: true,
      skipOnEnlargement: false,
      errorOnEnlargement: false
    }))
    .pipe(gulp.dest(paths.jekyllImageFiles + "/responsive"))
    .pipe(gulp.dest(paths.siteImageFiles + "/responsive"));
});

gulp.task("build:images", gulp.parallel("build:normal-images", "build:responsive-images"));

// -------------------------------------
//   Task: Build Scripts
// -------------------------------------
gulp.task("build:babel-uglify", (cb) => {
  const options = { output: { comments: true } };
  pump([
    gulp.src(paths.jsFiles + "/pretty/**/*.js"),
    babel({ presets: ["@babel/preset-env"] }),
    uglify(options),
    rename({ extname: ".min.js" }),
    gulp.dest(paths.jsFiles + "/ugly")
  ], cb);
});

gulp.task("build:concat", () => {
  const src_files = [
    paths.jsFiles + "/vendor/node/jquery.slim.min.js",
    paths.jsFiles + "/vendor/node/popper.min.js",
    paths.jsFiles + "/vendor/node/bootstrap.min.js",
    paths.jsFiles + "/vendor/node/instantsearch.min.js",
    paths.jsFiles + "/vendor/clipboard.min.js",
    paths.jsFiles + "/vendor/fontawesome.min.js",
    paths.jsFiles + "/vendor/picturefill.min.js",
    paths.jsFiles + "/ugly/algolia.min.js",
    paths.jsFiles + "/ugly/vendor/fa-brands.min.js",
    paths.jsFiles + "/ugly/vendor/fa-solid.min.js",
    paths.jsFiles + "/ugly/select_source.min.js"
  ];
  return gulp
    .src(src_files)
    .pipe(sourcemaps.init())
    .pipe(concat("main.min.js"))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(paths.jekyllJsFiles))
    .pipe(gulp.dest(paths.siteJsFiles))
    .on("error", log);
});

gulp.task("build:scripts", gulp.series("build:babel-uglify", "build:concat"));

// -------------------------------------
//   Task: Build Styles
// -------------------------------------
gulp.task("build:styles:main", () => {
  return gulp
    .src(paths.scssFiles + "/main.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(paths.jekyllCssFiles))
    .pipe(gulp.dest(paths.siteCssFiles))
    .pipe(browserSync.stream())
    .on("error", log);
});

// -------------------------------------
//   Task: Build Jekyll
// -------------------------------------
gulp.task("build:jekyll", () => {
  var shellCommand = "bundle exec jekyll build --config _config.yml";
  return gulp
    .src("")
    .pipe(run(shellCommand))
    .on("error", log);
});

// -------------------------------------
//   Task: Build Algolia Index
// -------------------------------------
gulp.task("build:index-algolia", () => {
  var algolia = process.env.ALGOLIA_API_KEY;
  var shellCommand = "ALGOLIA_API_KEY=" + algolia + " jekyll algolia";
  return gulp
    .src("")
    .pipe(run(shellCommand))
    .on("error", log);
});

// -------------------------------------
//   Task: Build (main)
// -------------------------------------
gulp.task("build", gulp.series(
  "clean",
  gulp.parallel("build:scripts", "build:images", "build:styles:main"),
  "build:jekyll"
));

// -------------------------------------
//   Task: Build Travis
// -------------------------------------
gulp.task("build:travis", gulp.series(
  "clean",
  gulp.parallel("build:scripts", "build:images", "build:styles:main"),
  "build:jekyll"
));

// -------------------------------------
//   Task: Install
// -------------------------------------
gulp.task("install", gulp.series(
  gulp.parallel("copy:bootstrap-scss", "copy:node-js-src"),
  "serve"
));

// -------------------------------------
//   Task: Serve
// -------------------------------------
gulp.task("serve", gulp.series("build", () => {
  browserSync.init({
    server: paths.siteDir,
    ghostMode: true,
    logFileChanges: true
  });

  gulp.watch(["_config.yml"], gulp.series("build:jekyll", (cb) => { browserSync.reload(); cb(); }));
  gulp.watch("_assets/scss/**/*.scss", gulp.series("build:styles:main"));
  gulp.watch("_assets/js/**/*.js", gulp.series("build:scripts"));
  gulp.watch("_assets/images/normal/**/*", gulp.series("build:normal-images"));
  gulp.watch("_assets/images/responsive/**/*", gulp.series("build:responsive-images"));
  gulp.watch("_posts/**/*.+(md|markdown|MD)", gulp.series("build:jekyll", (cb) => { browserSync.reload(); cb(); }));
  gulp.watch(
    ["**/*.+(html|md|markdown|MD)", "!_site/**/*.*"],
    gulp.series("build:jekyll", (cb) => { browserSync.reload(); cb(); })
  );
}));
