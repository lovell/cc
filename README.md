# cc

Code style linter for C++ source files used in Node.js native addons.

Follows the [Google C++ Style Guide](https://google.github.io/styleguide/cppguide.html).

As `standard`, `semistandard` and `xo` are to your JavaScript source files,
`cc` is to your C++ source files.

## Install

```sh
npm install cc --save-dev
```

## Usage

Add `cc` to the test script of your project's `package.json` file.

The following example uses `xo` for linting JavaScript, `cc` for linting C++ and `ava` for unit tests.

```json
{
  "name": "awesome-native-package",
  "scripts": {
    "test": "xo && cc && ava"
  },
  "devDependencies": {
    "ava": "^0.18.0",
    "cc": "^1.0.0",
    "xo": "^0.17.0"
  }
}
```

## Defaults

```json
"cc": {
  "linelength": "80",
  "files": [
    "**/*.cc",
    "**/*.h"
  ],
  "ignore": [
    "node_modules/**",
    "vendor/**"
  ],
  "filter": []
}
```

Files listed in `.gitignore` or contained within any "dot" directories (e.g. `.git`) are also ignored.

## Example

Allow a line length of 120 characters and ignore all include checks:

```json
{
  "name": "awesome-native-package",
  "scripts": {
    "test": "cc"
  },
  "devDependencies": {
    "cc": "^1.0.0"
  },
  "cc": {
    "linelength": "120",
    "filter": [
      "build/include"
    ]
  }
}
```

## Thanks

* [Milosz Kordecki](https://github.com/mikomize) for use of the `cc` package name.

## Licence

Copyright 2017 Lovell Fuller.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0.html)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
