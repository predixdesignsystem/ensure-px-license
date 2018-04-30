'use strict';
const through = require('through2');
const PluginError = require('plugin-error');

/******************************************************************************
 * PUBLIC METHODS
 */

/**
 * Gulp task that ensures the license header exists in all files. Adds the
 * header to any files that do not already have it.
 */
function ensureLicense() {
  return through.obj((file, enc, cb) => {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new PluginError('gulp-license', 'Streaming not supported'));
      return;
    }

    const text = file.contents.toString();
    const type = toFileType(file.path);

    if (type === FileType.CSS) {
      file.contents = Buffer.from(addCssLicense(text));
    }

    if (type === FileType.HTML) {
      file.contents = Buffer.from(addHtmlLicense(text));
    }

    if (type === FileType.JAVASCRIPT) {
      file.contents = Buffer.from(addJavaScriptLicense(text));
    }

    cb(null, file);
  });
};

/**
 * Checks if a file already has a valid license.
 *
 * @param  {string}      source  Source text of the file to check
 * @param  {number=500}  max     Maximum number of lines to check, default is 500
 * @return {boolean}
 */
function hasLicense(source, max) {
  max = typeof max === 'number' ? max : 100;
  const lines = source.split('\n');
  for (let i=0; i<lines.length && i<=max; i++) {
    if (lines[i].indexOf(licenseAttribution) > -1) {
      return true;
    }
  }
  return false;
};

/**
 * Adds the license header to a HTML file if it does not already have it.
 *
 * @param  {string} source Source text of the file
 * @return {string}
 */
function addHtmlLicense(source) {
  if (hasLicense(source)) return source;
  return licenseHtml + '\n\n' + source;
};

/**
 * Adds the license header to a CSS or SCSS file if it does not already have it.
 *
 * @param  {string} source Source text of the file
 * @return {string}
 */
function addCssLicense(source) {
  if (hasLicense(source)) return source;
  return licenseCss + '\n\n' + source;
};

/**
 * Adds the license header to a JavaScript file if it does not already have it.
 *
 * @param  {string} source Source text of the file
 * @return {string}
 */
function addJavaScriptLicense(source) {
  if (hasLicense(source)) return source;
  return licenseJavaScript + '\n\n' + source;
};

module.exports = {
  ensureLicense,
  hasLicense,
  addHtmlLicense,
  addCssLicense,
  addJavaScriptLicense
};

/******************************************************************************
 * UTILITIES/HELPERS
 */

const licenseAttribution = `Copyright (c) 2018, General Electric`;

const licenseCss = `
/*
 * ${licenseAttribution}
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
`.trim();

const licenseHtml = `
<!--
${licenseAttribution}

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->
`.trim();

const licenseJavaScript = `
/**
 * @license
 * ${licenseAttribution}
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
`.trim();

const FileType = {
  CSS: 'CSS',
  HTML: 'HTML',
  JAVASCRIPT: 'JAVASCRIPT'
};

function toFileType(path) {
  if (/\.(?:css|scss)$/.test(path)) {
    return FileType.CSS;
  }
  if (/\.html$/.test(path)) {
    return FileType.HTML;
  }
  if (/\.js$/.test(path)) {
    return FileType.JAVASCRIPT;
  }
  return null;
};
