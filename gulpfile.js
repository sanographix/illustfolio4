const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const imagemin = require("gulp-imagemin");
const pngquant = require("imagemin-pngquant");
const browserSync = require("browser-sync");
const reload = browserSync.reload;
const ejs = require("gulp-ejs");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");

// Sass
gulp.task("sass", function (done) {
  gulp
    .src("src/sass/**/*.scss")
    .pipe(sass().on("error", sass.logError)) // Keep running gulp even though occurred compile error
    .pipe(
      postcss([
        autoprefixer({
          cascade: false,
        }),
      ])
    )
    .pipe(gulp.dest("build/css"))
    .pipe(reload({ stream: true }));
  done();
});

// Js-concat-uglify
gulp.task("js", function (done) {
  gulp
    .src(["src/js/**"])
    .pipe(
      uglify({
        output: {
          comments: /^!/, // Keep some comments
        },
      })
    )
    .pipe(gulp.dest("build/js"))
    .pipe(reload({ stream: true }));
  done();
});

// Imagemin

gulp.task("imagemin", function (done) {
  gulp
    .src(["src/images/**/*.{png,jpg,gif,svg}"])
    .pipe(
      imagemin({
        optimizationLevel: 7,
        use: [
          pngquant({
            quality: "60-80",
            speed: 1,
          }),
        ],
      })
    )
    .pipe(gulp.dest("build/images"));
  done();
});

// favicon
gulp.task("favicon", function (done) {
  gulp.src("src/images/favicon.ico").pipe(gulp.dest("build/"));
  done();
});

// ejs
var fs = require("fs");
var json = JSON.parse(fs.readFileSync("site.json")); // parse json
gulp.task("ejs", function (done) {
  gulp
    .src(["src/templates/**/*.ejs", "!" + "src/templates/**/_*.ejs"]) // Don't build html which starts from underline
    .pipe(plumber())
    .pipe(ejs(json))
    .pipe(
      rename({
        extname: ".html",
      })
    )
    .pipe(gulp.dest("build"));
  done();
});

// Static server
gulp.task("browser-sync", function (done) {
  browserSync({
    server: {
      baseDir: "build/", // Target directory
      index: "index.html", // index file
    },
  });
  done();
});

// watch files
gulp.task("watch-files", function (done) {
  gulp.watch("src/sass/**/*.scss", gulp.task("sass"));
  gulp.watch("src/js/**", gulp.task("js"));
  gulp.watch("src/images/**", gulp.task("imagemin"));
  gulp.watch("build/**/*.html", gulp.task("bs-reload"));
  gulp.watch("src/templates/**/*.ejs", gulp.task("ejs"));
  gulp.watch("site.json", gulp.task("ejs"));
  done();
});

// Reload all browsers
gulp.task("bs-reload", function (done) {
  browserSync.reload();
  done();
});

// Build
gulp.task(
  "build",
  gulp.series("ejs", gulp.parallel("sass", "js", "imagemin", "favicon"))
);

// Task for `gulp` command
gulp.task(
  "default",
  gulp.series("browser-sync", "watch-files", function (done) {
    done();
    console.log("Default all task done!");
  })
);
