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

## License

Copyright (c) 2018, General Electric

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
