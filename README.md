# Module/CJS/Browser

Build source to type: module, cjs, browser

## Motivation

Since Node.js version 16 came the ability to use "type module" and use the modern import syntax in applications.

This feature has limitations:

1. We must set the import file extensions as .js

2. Old commonjs style applications don't support type module

This repo provides example to use pure typescript and solve these problems.

During build process .js extensions will be added automatically

The module will build to 3 options:

- cjs format (to use it in old applications)
- type module for modern apps
- browser type to compile the code in single file to use it in the browser

## Usage

The command

```shell
npm run build
```

create structure:

dist/
  browser/
  cjs/
  module/
  types/

*package.json* has type module (it's by default) and set up exports:

```json
{
  "type": "module",
  "main": "./dist/module/index.js",
  "types": "./dist/types/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/module/index.js",
      "require": "./dist/cjs/index.cjs"
    },
    "./browser": "./dist/browser/index.js"
  },
}
```

### Type Module

If we use this module in the modern app with "type module" in the package json it will be:

```js
import { helloWorld } from 'my-module';
```

### CommonJS

If we use this module in the old app with commonjs syntax it will be:

```js
const { helloWorld } = require('my-module');
```

### Browser

for browser usage we will use webpack to compile source code. The import will use browser version:

```js
import { helloWorld } from 'my-module/browser';
```

### .mjs/.cjs

You can also use ".mjs" and ".cjs" extensions with below settings.

- .mjs - files are always ES modules
- .cjs - files are always CommonJS modules

If you want to use common js file in "type module", the file must have cjs ext and the code will be:

```js
// @filename: dir.cjs

module.exports = __dirname;

// @filename: index.js

import dir from './dir.cjs';

console.log(dir);
```

## TSC Declaration

If you need to use different types declarations for each of modules you can use field "typesVersions" in your package.json:

```json
{
  "typesVersions": {
    "*": {
      "import": [
        "./dist/types/**/*"
      ],
      "require": [
        "./dist/types/**/*"
      ]
    },
    "./browser": [
      "./dist/browser-types/**/*"
    ]
  }
}
```

also you can use different types for your package versions:

```json
{
  "name": "package-name",
  "version": "1.0",
  "types": "./index.d.ts",
  "typesVersions": {
    ">=3.2": {
      "*": [
        "ts3.2/*"
      ]
    },
    ">=3.1": {
      "*": [
        "ts3.1/*"
      ]
    }
  }
}
```
