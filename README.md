# ensure-px-license

Adds the Predix Design System license header to files.

## Using with gulp

Install the package in your project:

```
$ npm install --save-dev ensure-px-license
```

Add the following to your gulpfile.js:

```javascript
const { ensureLicense } = require('ensure-px-license');
gulp.task('license', function() {
  return gulp.src(['./**/*.{html,js,css,scss}', '!./node_modules/**/*', '!./bower_components?(-1.x)/**/*'])
    .pipe(ensureLicense())
    .pipe(gulp.dest('.'));
});
```

Run the task on the command line:

```
$ gulp license
```

All of the HTML, CSS, SCSS, and JavaScript files in your project will now have the license header.
